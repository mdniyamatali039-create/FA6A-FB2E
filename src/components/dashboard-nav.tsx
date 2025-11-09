
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useApp } from "@/hooks/use-app";
import { Home, PlusCircle, Search, User, Briefcase, Wallet, Cog, FileText } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: (pathname: string) => boolean;
};

export function DashboardNav({ role }: { role: 'customer' | 'worker' }) {
  const pathname = usePathname();
  const { t } = useApp();

  const customerNav: NavItem[] = [
    { href: "/customer/dashboard", label: t('dashboard'), icon: <Home /> },
    { href: "/customer/my-posts", label: 'My Posts', icon: <FileText /> },
    { href: "/customer/post-job", label: t('customer_dashboard_post_job'), icon: <PlusCircle /> },
    { href: "/customer/find-workers", label: t('customer_dashboard_find_workers'), icon: <Search /> },
    { href: "/customer/wallet", label: 'Wallet', icon: <Wallet /> },
    { href: "/customer/profile", label: t('profile'), icon: <Cog /> },
  ];

  const workerNav: NavItem[] = [
    { href: "/worker/dashboard", label: t('dashboard'), icon: <Home /> },
    { href: "/worker/find-jobs", label: t('worker_dashboard_find_jobs'), icon: <Briefcase /> },
    { href: "/worker/profile", label: t('worker_dashboard_my_profile'), icon: <User /> },
  ];

  const navItems = role === "customer" ? customerNav : workerNav;

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            asChild
            isActive={item.isActive ? item.isActive(pathname) : pathname === item.href}
            tooltip={{children: item.label}}
          >
            <Link href={item.href}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
