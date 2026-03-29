import Link from "next/link";
import Image from "next/image";
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
        <h1 className="font-pixel text-3xl text-base-content">
          ☆ 氷菓 ― Hyouka ☆
        </h1>
        <p className="mt-3 text-base-content/70">
          わたし、気になります！ Welcome to a fan site dedicated to the anime
          Hyouka (氷菓). Explore the world of Kamiyama High School&apos;s
          Classic Literature Club and their everyday mysteries. ✿
        </p>
      </div>

      {/* Hero Image */}
      <div>
        <SectionHeading icon="✦">Show</SectionHeading>
        <div className="mt-4 overflow-hidden rounded-box border-2 border-dashed border-primary/30 bg-base-200 transition-all hover:border-primary/60 hover:shadow-sm">
          <Image
            src="https://img.yuuki.diy/hero.jpg"
            alt="氷菓 Hyouka"
            width={1200}
            height={600}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
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
                      <h3 className="font-pixel text-base text-base-content">
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-base-content/50">
                        {post.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-pixel text-xs text-base-content/30">
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
            { href: "/blog", label: "Blog ✎", desc: "Articles & analysis" },
            { href: "/gallery", label: "Gallery ✦", desc: "Scenes & artwork" },
            { href: "/about", label: "About ☆", desc: "About this site" },
          ].map((link) => (
            <Link key={link.href} href={link.href}>
              <div className="card border border-dotted border-secondary/30 bg-base-200 p-3 text-center transition-all hover:border-secondary/60 hover:shadow-sm">
                <p className="font-pixel text-sm text-base-content">
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
