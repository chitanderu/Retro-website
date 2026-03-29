import BadgeTag from "@/components/ui/BadgeTag";

export default function StatusBar() {
  return (
    <div className="card border-2 border-dashed border-primary/40 bg-base-200 p-3">
      <p className="mb-2 font-pixel text-xs text-base-content/40">
        ✦ Status
      </p>
      <div className="flex flex-wrap gap-1.5">
        <BadgeTag color="primary">♪ Listening</BadgeTag>
        <BadgeTag color="accent">Mood: ☀️</BadgeTag>
        <BadgeTag color="secondary">Coding</BadgeTag>
      </div>
    </div>
  );
}
