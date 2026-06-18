import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import StructuredData from "@/components/StructuredData";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: `https://imagecropkit.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 space-y-12">
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span className="mx-2 text-muted-foreground/40">/</span>
          {post.frontmatter.title}
        </p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {post.frontmatter.author && <span>{post.frontmatter.author}</span>}
          {post.frontmatter.author && post.frontmatter.date && <span>·</span>}
          {post.frontmatter.date && <time dateTime={post.frontmatter.date}>{post.frontmatter.date}</time>}
        </div>
        <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
      </article>

      <StructuredData
        pageTitle={post.frontmatter.title}
        pageUrl={`https://imagecropkit.com/blog/${slug}`}
        includeWebApp={false}
        article={{
          headline: post.frontmatter.title,
          datePublished: post.frontmatter.date,
          author: post.frontmatter.author || "ImageCropKit",
          description: post.frontmatter.description,
        }}
      />
    </div>
  );
}
