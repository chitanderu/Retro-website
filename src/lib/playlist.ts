import type { PlaylistTrack } from "@/types";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const playlist: PlaylistTrack[] = [
  {
    title: "優しさの理由",
    artist: "ちょうちょ",
    src: `${base}/audio/hyouka1.mp3`,
  },
  {
    title: "未完成ストライド",
    artist: "こだまさおり",
    src: `${base}/audio/hyouka.mp3`,
  },
];
