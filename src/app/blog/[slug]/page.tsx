import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getBlogPost, getBlogPosts } from "@/lib/mdx";
import BadgeTag from "@/components/ui/BadgeTag";
import TapeStrip from "@/components/decorations/TapeStrip";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      {/* Back Link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1 font-pixel text-sm text-base-content/50 transition-colors hover:text-base-content"
      >
        ← Back to Blog
      </Link>

      {/* Article */}
      <article className="card relative border-2 border-dashed border-secondary/40 bg-base-200 p-6">
        <TapeStrip position="top-right" rotation={12} color="primary" />

        {/* Header */}
        <header className="mb-6">
          <h1 className="font-pixel text-2xl text-base-content">
            {post.title}
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="font-pixel text-xs text-base-content/40">
              {post.date}
            </span>
            <div className="flex gap-1">
              {post.tags.map((tag) => (
                <BadgeTag key={tag} color="accent">
                  {tag}
                </BadgeTag>
              ))}
            </div>
          </div>
        </header>

        {/* MDX Content */}
        <div className="prose prose-sm max-w-none text-base-content/80 prose-headings:font-pixel prose-headings:text-base-content prose-a:text-primary prose-strong:text-base-content">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}
