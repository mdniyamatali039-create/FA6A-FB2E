
"use client";

import Link from "next/link";
import { User, Settings, LogOut, ChevronRight, Users, Briefcase, MapPin, BarChart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    href: "/worker/profile",
    label: "My Profile",
    icon: <User className="h-5 w-5" />,
  },
  {
    href: "/worker/my-jobs",
    label: "My Jobs",
    icon: <MapPin className="h-5 w-5" />,
  },
  {
    href: "/worker/find-jobs",
    label: "Find Job",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    href: "/worker/earnings",
    label: "My Earnings",
    icon: <BarChart className="h-5 w-5" />,
  },
  {
    href: "/worker/chat",
    label: "Support",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    href: "/worker/settings",
    label: "Settings",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    href: "/",
    label: "Logout",
    icon: <LogOut className="h-5 w-5" />,
  },
];

export default function MenuPage() {
  return (
    <div className="space-y-4 pb-24">
      <h1 className="text-2xl font-bold px-4">Menu</h1>
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className="w-full justify-between h-14"
            asChild
          >
            <Link href={item.href}>
              <div className="flex items-center gap-4">
                {item.icon}
                <span className="text-base">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
