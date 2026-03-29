import Link from "next/link";
import { getBlogPosts } from "@/lib/mdx";
import SectionHeading from "@/components/ui/SectionHeading";
import BadgeTag from "@/components/ui/BadgeTag";

export default function Blog() {
  const posts = getBlogPosts();

  return (
    <div className="flex flex-col gap-8">
      <SectionHeading icon="✎">Blog</SectionHeading>

      <div className="flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="card border-2 border-dashed border-primary/30 bg-base-200 p-5 transition-all hover:border-primary/60 hover:shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-pixel text-lg text-base-content">
                      {post.title}
                    </h2>
                    <p className="mt-1 text-sm text-base-content/60">
                      {post.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-pixel text-xs text-base-content/30">
                    {post.date}
                  </span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  {post.tags.map((tag) => (
                    <BadgeTag key={tag} color="accent">
                      {tag}
                    </BadgeTag>
                  ))}
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p className="text-sm text-base-content/40">
            No posts yet... Check back soon! ✿
          </p>
        )}
      </div>
    </div>
  );
}
