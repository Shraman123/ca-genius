import Link from "next/link";
import { LayoutDashboard, Users, FileText, MessageSquare, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen hidden md:flex flex-col gap-4 p-4 glass border-r z-10 sticky top-0">
      <div className="flex items-center gap-3 px-4 py-4 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold blur-[0.5px]">
          CA
        </div>
        <h1 className="text-xl font-extrabold tracking-tight">CA-Genius</h1>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" href="/" active />
        <SidebarItem icon={<Users size={20} />} label="Clients" href="/clients" />
        <SidebarItem icon={<FileText size={20} />} label="Documents" href="/documents" />
        <SidebarItem icon={<MessageSquare size={20} />} label="AI Advisor" href="/advisor" />
      </nav>

      <div className="mt-auto pt-4 border-t border-[var(--glass-border)]">
        <SidebarItem icon={<Settings size={20} />} label="Settings" href="/settings" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, href, active }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 
      ${active ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'hover:bg-secondary text-muted-foreground hover:text-foreground'}`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
