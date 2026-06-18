import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Blog - Image Crop Guides & Social Media Sizes",
  description:
    "Guides on image cropping, social media image sizes, product photo requirements, and privacy-first photo editing tips.",
  alternates: { canonical: "https://imagecropkit.com/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 space-y-16">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl tracking-tight">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Guides on image cropping, social media sizes, and privacy-first photo editing.
        </p>
      </div>

      <StructuredData pageTitle="Blog" pageUrl="https://imagecropkit.com/blog" includeWebApp={false} />

      {posts.length === 0 ? (
        <p className="text-center text-muted-foreground">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 rounded-lg border border-border hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all"
            >
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                <time dateTime={post.date}>{post.date}</time>
                {post.tags.length > 0 && (
                  <>
                    <span className="text-border">·</span>
                    <span>{post.tags[0]}</span>
                  </>
                )}
              </div>
              <h2 className="text-xl mb-2">{post.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{post.description}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
