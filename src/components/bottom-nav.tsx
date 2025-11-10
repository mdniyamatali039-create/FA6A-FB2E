
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MessageSquare, Menu as MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useApp } from '@/hooks/use-app';

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useApp();

    const navItems = [
        { href: "/worker/dashboard", label: t('dashboard'), icon: <Home /> },
        { href: "/worker/team", label: 'My Team', icon: <Users /> },
        { href: "/worker/chat", label: 'Chat', icon: <MessageSquare /> },
        { href: "/worker/menu", label: "Menu", icon: <MenuIcon /> },
    ];
    
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-20 border-t bg-background shadow-t-md md:hidden">
            <div className="grid h-16 grid-cols-4 items-center justify-center">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 text-muted-foreground transition-colors",
                                isActive ? "text-primary font-semibold" : "hover:text-primary"
                            )}
                        >
                            {item.icon}
                            <span className="text-xs">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    )
}
