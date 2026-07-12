import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block"><Sidebar collapsed={false} onToggle={() => {}} /></div>
      <div className="flex-1">
        <Topbar />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
