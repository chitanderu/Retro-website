import SectionHeading from "@/components/ui/SectionHeading";
import BadgeTag from "@/components/ui/BadgeTag";
import TapeStrip from "@/components/decorations/TapeStrip";
import Stamp from "@/components/decorations/Stamp";

export default function About() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading icon="☆">About</SectionHeading>

      {/* Intro Card */}
      <div className="card relative border-2 border-dashed border-secondary/40 bg-base-200 p-6">
        <TapeStrip position="top-left" rotation={-10} color="secondary" />
        <Stamp variant={2} rotation={12} className="right-4 top-4" />

        <h3 className="font-[family-name:var(--font-pixel-mplus)] text-lg text-base-content">
          氷菓 ― Hyouka ✿
        </h3>
        <p className="mt-3 text-base-content/70">
          《氷菓》是由米澤穗信創作的推理小說「古典部系列」改編的動畫作品，
          由京都動畫於 2012 年製作播出。故事圍繞神山高中古典部的四名成員，
          描述他們在日常生活中遭遇的各種謎題。
        </p>
        <p className="mt-2 text-base-content/70">
          主角折木奉太郎信奉「節能主義」，卻因姐姐的一封信加入了古典部，
          並遇見了好奇心旺盛的千反田愛瑠。「わたし、気になります！」
          ― 由此展開了一段灰色而非薔薇色的青春故事。
        </p>
      </div>

      {/* Characters */}
      <div>
        <h3 className="mb-3 font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
          ✦ Characters
        </h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { name: "折木奉太郎", role: "節能主義的推理天才", color: "primary" as const },
            { name: "千反田愛瑠", role: "好奇心旺盛的大小姐", color: "secondary" as const },
            { name: "福部里志", role: "自稱資料庫的萬事通", color: "accent" as const },
            { name: "伊原摩耶花", role: "直率認真的漫研少女", color: "primary" as const },
          ].map((char) => (
            <div
              key={char.name}
              className="card border border-dashed border-primary/30 bg-base-200 p-4"
            >
              <p className="font-[family-name:var(--font-pixel-mplus)] text-sm text-base-content">
                {char.name}
              </p>
              <p className="mt-1 text-xs text-base-content/50">{char.role}</p>
              <div className="mt-2">
                <BadgeTag color={char.color}>古典部</BadgeTag>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <h3 className="mb-3 font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
          ✦ Keywords
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "日常推理",
            "青春",
            "古典部",
            "京都動畫",
            "米澤穗信",
            "神山高中",
            "節能主義",
            "薔薇色",
          ].map((tag) => (
            <BadgeTag key={tag} color="primary">
              {tag}
            </BadgeTag>
          ))}
        </div>
      </div>

      {/* Anime Info */}
      <div className="card border-2 border-dotted border-accent/40 bg-base-200 p-5">
        <h3 className="mb-3 font-[family-name:var(--font-pixel-mplus)] text-base text-base-content">
          ♡ Anime Info
        </h3>
        <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Studio
            </span>
            <p className="text-base-content/70">京都アニメーション</p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Director
            </span>
            <p className="text-base-content/70">武本康弘</p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Episodes
            </span>
            <p className="text-base-content/70">TV 22話 + OVA 1話</p>
          </div>
          <div>
            <span className="font-[family-name:var(--font-pixel-mplus)] text-xs text-base-content/40">
              Aired
            </span>
            <p className="text-base-content/70">2012年4月 ― 9月</p>
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
