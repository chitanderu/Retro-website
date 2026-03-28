import SectionHeading from "@/components/ui/SectionHeading";
import BadgeTag from "@/components/ui/BadgeTag";
import TapeStrip from "@/components/decorations/TapeStrip";
import Stamp from "@/components/decorations/Stamp";

export default function About() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading icon="☆">About Me</SectionHeading>

      {/* Bio Card */}
      <div className="card relative border-2 border-dashed border-secondary/40 bg-base-200 p-6">
        <TapeStrip position="top-left" rotation={-10} color="secondary" />
        <Stamp variant={2} rotation={12} className="right-4 top-4" />

        <h3 className="font-[family-name:var(--font-pixel-mplus)] text-lg text-base-content">
          Hello! ✿
        </h3>
        <p className="mt-3 text-base-content/70">
          I&apos;m a web developer who loves creating cute and nostalgic things on the
          internet. This site is my personal space to share my thoughts and
          projects.
        </p>
        <p className="mt-2 text-base-content/70">
          I&apos;m passionate about web design, especially the aesthetics of early
          2000s personal websites and Japanese web culture.
        </p>
      </div>

      {/* Interests */}
      <div>
        <h3 className="mb-3 font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
          ✦ Interests
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Web Development",
            "UI Design",
            "Pixel Art",
            "Anime",
            "Music",
            "Photography",
            "Gaming",
            "Typography",
          ].map((interest) => (
            <BadgeTag key={interest} color="primary">
              {interest}
            </BadgeTag>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div className="card border-2 border-dotted border-accent/40 bg-base-200 p-5">
        <h3 className="mb-3 font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
          ♡ Favorites
        </h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Anime
            </span>
            <p className="text-base-content/70">Hyouka, Lain, FLCL</p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Music
            </span>
            <p className="text-base-content/70">Shoegaze, City Pop, Vocaloid</p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Tools
            </span>
            <p className="text-base-content/70">VS Code, Figma, Blender</p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Languages
            </span>
            <p className="text-base-content/70">TypeScript, Rust, Python</p>
          </div>
        </div>
      </div>

      {/* Site Info */}
      <div className="card border border-dashed border-neutral/20 bg-base-200/50 p-4">
        <h3 className="mb-2 font-[family-name:var(--font-pixel-mplus)] text-sm text-base-content/60">
          ⌂ Site Info
        </h3>
        <div className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
          <p>Built with: Next.js + Tailwind CSS + DaisyUI</p>
          <p>Font: DotGothic16 + Noto Sans JP</p>
          <p>Aesthetic: Y2K Kawaii + 個人サイト</p>
        </div>
      </div>
    </div>
  );
}
