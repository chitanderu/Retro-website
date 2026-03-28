import Link from "next/link";
import { getBlogPosts } from "@/lib/mdx";
import SectionHeading from "@/components/ui/SectionHeading";
import BadgeTag from "@/components/ui/BadgeTag";
import SparkleEffect from "@/components/decorations/SparkleEffect";
import Stamp from "@/components/decorations/Stamp";

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Section */}
      <div className="card relative border-2 border-dashed border-secondary/40 bg-base-200 p-6">
        <SparkleEffect count={4} />
        <Stamp variant={1} rotation={8} className="right-3 top-3" />
        <h1 className="font-[family-name:var(--font-pixel-mplus)] text-3xl text-base-content">
          ☆ Welcome to My Site ☆
        </h1>
        <p className="mt-3 text-base-content/70">
          ようこそ！ Welcome to my little corner of the internet.
          This is a Y2K-inspired personal website where I share my thoughts,
          projects, and favorite things. Feel free to look around! ✿
        </p>
      </div>

      {/* Recent Posts */}
      <div>
        <SectionHeading icon="✎">Recent Posts</SectionHeading>
        <div className="mt-4 flex flex-col gap-3">
          {recentPosts.length > 0 ? (
            recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <div className="card border border-dashed border-primary/30 bg-base-200 p-4 transition-colors hover:border-primary/60 hover:bg-base-200/80">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-base-content/50">
                        {post.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/30">
                      {post.date}
                    </span>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {post.tags.map((tag) => (
                      <BadgeTag key={tag} color="accent">
                        {tag}
                      </BadgeTag>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-base-content/40">No posts yet...</p>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div>
        <SectionHeading icon="♡">Explore</SectionHeading>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { href: "/blog", label: "Blog ✎", desc: "Read my posts" },
            { href: "/gallery", label: "Gallery ✦", desc: "See my work" },
            { href: "/friends", label: "Friends ♡", desc: "Cool sites" },
            { href: "/about", label: "About ☆", desc: "Know me" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="card border border-dotted border-secondary/30 bg-base-200 p-3 text-center transition-all hover:border-secondary/60 hover:shadow-sm">
                <p className="font-[family-name:var(--font-pixel-mplus)] text-sm text-base-content">
                  {link.label}
                </p>
                <p className="text-xs text-base-content/40">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
