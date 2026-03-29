import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import DecorativeOverlay from "./DecorativeOverlay";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex min-h-screen flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
          <main className="min-w-0">{children}</main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating Decorations */}
        <DecorativeOverlay />
      </div>

      {/* Sidebar — drawer handles both mobile (overlay) and desktop (persistent) */}
      <div className="drawer-side z-50">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="min-h-full w-72 border-r border-dashed border-secondary/20 bg-base-100 p-4 pt-20">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
