import { friends } from "@/lib/friends";
import SectionHeading from "@/components/ui/SectionHeading";
import TapeStrip from "@/components/decorations/TapeStrip";
import PaperClip from "@/components/decorations/PaperClip";

export default function Friends() {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeading icon="♡">Friends</SectionHeading>

      <p className="text-sm text-base-content/60">
        Cool people and websites I like! Want to exchange links? Feel free to
        reach out ✿
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {friends.map((friend, i) => (
          <a
            key={friend.name}
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="card relative border-2 border-dashed border-primary/30 bg-base-200 p-4 transition-all group-hover:border-primary/60 group-hover:shadow-sm">
              {i % 2 === 0 ? (
                <TapeStrip position="top-right" rotation={10} color="accent" />
              ) : (
                <PaperClip side="top" />
              )}

              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dotted border-secondary/40 bg-base-300 font-pixel text-sm">
                  {friend.name[0]}
                </div>
                <div>
                  <p className="font-pixel text-sm text-base-content group-hover:text-primary-content">
                    {friend.name}
                  </p>
                  <p className="text-xs text-base-content/50">
                    {friend.description}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Link Exchange Banner */}
      <div className="card border-2 border-dotted border-secondary/30 bg-base-200/50 p-4 text-center">
        <p className="font-pixel text-sm text-base-content/50">
          ✦ Want to be friends? ✦
        </p>
        <p className="mt-1 text-xs text-base-content/40">
          Add my button to your site and let me know!
        </p>
        <div className="mt-2 flex justify-center">
          <div className="flex h-[31px] w-[88px] items-center justify-center rounded border border-dashed border-secondary/40 bg-base-300 font-pixel text-[7px] text-base-content/50">
            MY BUTTON
          </div>
        </div>
      </div>
    </div>
  );
}
