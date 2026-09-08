"""Audit public sitemap pages without executing client scripts or collecting user data."""
import concurrent.futures
import datetime
import json
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import time
import urllib.parse
import xml.etree.ElementTree as ET

BASE = "https://imagecropkit.com"


def fetch(url):
    result = subprocess.run(
        ["curl", "-sS", "-L", "--max-redirs", "3", "--max-time", "30",
         "-D", "-", url], capture_output=True, text=True, check=True,
    )
    remaining = result.stdout.replace("\r\n", "\n")
    headers = ""
    while remaining.startswith("HTTP/"):
        headers, remaining = remaining.split("\n\n", 1)
    return int(headers.splitlines()[0].split()[1]), headers, remaining


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.titles, self.h1, self.canonicals = [], [], []
        self.descriptions, self.robots, self.links = [], [], []
        self.ld, self.capture, self.parts = [], None, []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "link" and "canonical" in a.get("rel", "").split():
            self.canonicals.append(a.get("href", ""))
        if tag == "meta":
            name = a.get("name", "").lower()
            if name == "description":
                self.descriptions.append(a.get("content", ""))
            if name in ("robots", "googlebot"):
                self.robots.append(a.get("content", ""))
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag in ("title", "h1") or (tag == "script" and a.get("type") == "application/ld+json"):
            self.capture, self.parts = tag, []

    def handle_data(self, data):
        if self.capture:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag == self.capture:
            value = " ".join("".join(self.parts).split())
            {"title": self.titles, "h1": self.h1, "script": self.ld}[tag].append(value)
            self.capture = None


def audit(url):
    time.sleep(1)
    try:
        status, headers, html = fetch(url)
        page = Page()
        page.feed(html)
        issues = []
        if status != 200:
            issues.append("non_200")
        normalize = lambda value: value.rstrip("/")
        if len(page.canonicals) != 1 or normalize(page.canonicals[0]) != normalize(url):
            issues.append("canonical_mismatch")
        if len(page.titles) != 1 or not page.titles[0]:
            issues.append("title_missing_or_multiple")
        if len(page.h1) != 1:
            issues.append("h1_missing_or_multiple")
        if len(page.descriptions) != 1 or not page.descriptions[0]:
            issues.append("description_missing_or_multiple")
        xrobots = [line for line in headers.splitlines() if line.lower().startswith("x-robots-tag:")]
        if any("noindex" in value.lower() or "none" == value.lower().strip() for value in page.robots + xrobots):
            issues.append("noindex")
        for value in page.ld:
            try:
                json.loads(value)
            except ValueError:
                issues.append("invalid_json_ld")
        internal = sorted({urllib.parse.urljoin(url, link).split("#")[0].split("?")[0]
                           for link in page.links
                           if urllib.parse.urlparse(urllib.parse.urljoin(url, link)).netloc == "imagecropkit.com"})
        return dict(url=url, status=status, titles=page.titles, descriptions=page.descriptions,
                    h1=page.h1, canonicals=page.canonicals, robots=page.robots,
                    x_robots_tag=xrobots, json_ld_count=len(page.ld), internal_links=internal, issues=issues)
    except Exception as error:
        return dict(url=url, issues=["fetch_or_parse_error"], error=str(error))


if __name__ == "__main__":
    status, _, robots = fetch(BASE + "/robots.txt")
    # Fail closed if the observed permissive policy changes; review before crawling.
    if status != 200 or "Disallow:" in robots or "Allow: /" not in robots:
        raise SystemExit("Review robots.txt before crawling")
    status, _, xml = fetch(BASE + "/sitemap.xml")
    if status != 200:
        raise SystemExit("Sitemap unavailable")
    urls = [node.text for node in ET.fromstring(xml).findall("{*}url/{*}loc")]
    if not urls or len(urls) > 500 or any(urllib.parse.urlparse(url).netloc != "imagecropkit.com" for url in urls):
        raise SystemExit("Unexpected sitemap scope")
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool:
        pages = list(pool.map(audit, urls))
    duplicates = {}
    for field in ("titles", "descriptions"):
        groups = {}
        for page in pages:
            for value in page.get(field, []):
                groups.setdefault(value, []).append(page["url"])
        duplicates[field] = {key: value for key, value in groups.items() if len(value) > 1}
    linked = {link.rstrip("/") for page in pages for link in page.get("internal_links", [])}
    result = dict(checked_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),
                  scope="Server HTML of sitemap URLs; not rendered UI, GSC indexation, schema eligibility or field performance",
                  robots_txt=robots, page_count=len(pages), pages=pages, duplicates=duplicates,
                  no_inbound_link_from_audited_pages=[url for url in urls if url.rstrip("/") not in linked])
    local_date = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=8))).date()
    output = Path(f"reports/seo/{local_date}-sitemap-audit.json")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(result, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps(dict(page_count=len(pages), issues=[p for p in pages if p["issues"]],
                         duplicates=duplicates, no_inbound=result["no_inbound_link_from_audited_pages"]), ensure_ascii=False))
