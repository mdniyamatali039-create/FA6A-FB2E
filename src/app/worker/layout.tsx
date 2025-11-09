"use client";

import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { useApp } from "@/hooks/use-app";
import LanguageSwitcher from "@/components/language-switcher";
import { mockWorkers } from "@/lib/data";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, setRole } = useApp();
  const worker = mockWorkers[0]; // Use a mock worker for display

  setRole('worker');

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav role="worker" />
        </SidebarContent>
        <SidebarFooter className="flex-col !items-start gap-4">
            <div className="flex items-center gap-3 w-full">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={worker.avatarUrl} alt={worker.name} />
                    <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                    <span className="font-medium text-sm truncate">{worker.name}</span>
                    <span className="text-xs text-muted-foreground truncate">{worker.mobileNumber}</span>
                </div>
            </div>
            <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">{t('logout')} <LogOut className="ml-auto h-4 w-4" /></Link>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1 text-lg font-semibold">{t('worker_dashboard_title')}</div>
           <LanguageSwitcher />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
