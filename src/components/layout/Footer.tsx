import VisitorCounter from "@/components/widgets/VisitorCounter";

export default function Footer() {
  return (
    <footer className="border-t-2 border-dashed border-secondary/30 bg-base-200/50 py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4">
        {/* Visitor Counter */}
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs text-base-content/40">
            visitor no.
          </span>
          <VisitorCounter />
        </div>

        {/* 88x31 Buttons Area */}
        <div className="flex gap-2">
          <div className="flex h-[31px] w-[88px] items-center justify-center rounded border border-dashed border-neutral/30 bg-base-300/50 font-pixel text-[7px] text-base-content/30">
            NEXT.JS
          </div>
          <div className="flex h-[31px] w-[88px] items-center justify-center rounded border border-dashed border-neutral/30 bg-base-300/50 font-pixel text-[7px] text-base-content/30">
            TAILWIND
          </div>
          <div className="flex h-[31px] w-[88px] items-center justify-center rounded border border-dashed border-neutral/30 bg-base-300/50 font-pixel text-[7px] text-base-content/30">
            MADE W/ ♡
          </div>
        </div>

        <p className="font-pixel text-xs text-base-content/30">
          &copy; 2025 ✧ 氷菓 Fan Site ― made with Yuuki♡
        </p>
      </div>
    </footer>
  );
}
