import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {
  return (
    <div className="flex bg-black min-h-screen font-sans text-white antialiased">
      <Sidebar />

      <main className="flex-1 flex flex-col min-w-0 bg-[#050505] overflow-x-hidden">
        <Navbar />

        <div className="p-6 md:p-8 lg:p-10 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}