import Sidebar from "@/components/Sidebar";
import DashboardTopBar from "@/components/DashboardTopBar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex transition-colors duration-200 overflow-hidden">
      
      {/* Sidebar Layout Container */}
      <aside className="w-64 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 flex flex-col overflow-y-auto shrink-0 select-none">
        <Sidebar />
      </aside>

      {/* Main Content Layout Frame Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <DashboardTopBar />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>

    </div>
  );
}
