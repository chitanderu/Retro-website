import ProfileCard from "@/components/widgets/ProfileCard";
import MusicPlayer from "@/components/widgets/MusicPlayer";
import StatusBar from "@/components/widgets/StatusBar";
import Clock from "@/components/widgets/Clock";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4">
      <ProfileCard />
      <MusicPlayer />
      <StatusBar />
      <Clock />
    </aside>
  );
}
