"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Ticket, 
  Calendar, 
  FileText, 
  BarChart2, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

type SidebarProps = {
  className?: string;
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      title: "Bosh sahifa",
      href: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Buyurtmalar",
      href: "/buyurtmalar",
      icon: Ticket,
    },
    {
      title: "Uchrashuvlar",
      href: "/uchrashuvlar",
      icon: Calendar,
    },
    {
      title: "Narx takliflari",
      href: "/narx-takliflari",
      icon: FileText,
    },
    {
      title: "Sozlamalar",
      href: "/sozlamalar",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile Trigger */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-all duration-100 md:hidden",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-card transition-all duration-300 md:relative md:z-0",
          collapsed ? "w-[70px]" : "w-[240px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
            {!collapsed && (
              <span className="text-xl font-semibold">Dern-Support</span>
            )}
            {collapsed && (
              <span className="text-xl font-semibold">DS</span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  collapsed && "justify-center"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
}