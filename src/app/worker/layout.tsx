
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useApp } from "@/hooks/use-app";
import LanguageSwitcher from "@/components/language-switcher";
import { mockWorkers } from "@/lib/data";
import BottomNav from "@/components/bottom-nav";

export default function WorkerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, setRole } = useApp();
  const worker = mockWorkers[0]; // Use a mock worker for display

  useEffect(() => {
    setRole('worker');
  }, [setRole]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link href="/worker/profile">
            <Avatar>
              <AvatarImage src={worker.avatarUrl} alt={worker.name} />
              <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <h1 className="text-lg font-semibold">{worker.name}</h1>
            <p className="text-xs text-muted-foreground">Verified</p>
          </div>
        </div>
        <LanguageSwitcher />
      </header>
      <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      <BottomNav />
    </div>
  );
}
