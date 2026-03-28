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
        <div className="mx-auto grid w-full max-w-6xl flex-1 gap-6 px-4 py-6 lg:grid-cols-[1fr_280px]">
          <main className="min-w-0">{children}</main>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />

        {/* Floating Decorations */}
        <DecorativeOverlay />
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className="drawer-side z-50">
        <label
          htmlFor="sidebar-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="min-h-full w-72 bg-base-100 p-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
