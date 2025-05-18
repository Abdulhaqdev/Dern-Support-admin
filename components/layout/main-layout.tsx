"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar className=" hidden md:flex" />
      <div className="flex w-full flex-col">
        <Header />
        <main className={cn("flex-1 overflow-y-auto p-4 md:p-6")}>{children}</main>
      </div>
    </div>
  );
}