"use client";

import { useEffect } from "react";
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
import { LogOut, User, Cog } from "lucide-react";
import { DashboardNav } from "@/components/dashboard-nav";
import { useApp } from "@/hooks/use-app";
import LanguageSwitcher from "@/components/language-switcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, setRole } = useApp();

  useEffect(() => {
    setRole('customer');
  }, [setRole]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <DashboardNav role="customer" />
        </SidebarContent>
        <SidebarFooter className="flex-col !items-start gap-4">
            <div className="flex items-center gap-3 w-full">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://picsum.photos/seed/c-avatar/100/100" alt="Customer" />
                    <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <div className="flex flex-col truncate">
                    <span className="font-medium text-sm truncate">Customer Name</span>
                    <span className="text-xs text-muted-foreground truncate">customer@example.com</span>
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
          <div className="flex-1 text-lg font-semibold">{t('customer_dashboard_title')}</div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://picsum.photos/seed/c-avatar/100/100" alt="Customer" />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Customer Name</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      customer@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/customer/profile">
                    <Cog className="mr-2 h-4 w-4" />
                    <span>{t('profile')}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('logout')}</span>
                   </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
