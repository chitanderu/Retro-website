"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", icon: "⌂" },
  { href: "/blog", label: "Blog", icon: "✎" },
  { href: "/gallery", label: "Gallery", icon: "✦" },
  { href: "/about", label: "About", icon: "☆" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar sticky top-0 z-40 border-b-2 border-dashed border-secondary/50 bg-base-100/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
        {/* Site Title */}
        <Link
          href="/"
          className="font-pixel text-xl text-base-content transition-transform hover:scale-105"
        >
          ✧ 氷菓 ✧
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`btn btn-ghost btn-sm font-pixel text-sm ${
                pathname === link.href
                  ? "bg-primary/30 text-primary-content"
                  : "text-base-content/70 hover:bg-primary/10"
              }`}
            >
              <span className="mr-1">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <label
          htmlFor="sidebar-drawer"
          className="btn btn-ghost btn-sm md:hidden"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-dotted border-secondary/30 bg-base-200/50 py-0.5">
        <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap font-pixel text-xs text-base-content/40">
          ☆ 氷菓 ― Hyouka Fan Site ☆ わたし、気になります！ ☆ 古典部へようこそ ☆ 薔薇色の人生を ☆
        </div>
      </div>
    </nav>
  );
}
