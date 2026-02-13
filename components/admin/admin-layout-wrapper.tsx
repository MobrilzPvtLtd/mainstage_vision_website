"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Database,
    FileJson,
    AlertCircle,
    Calendar,
    Image,
    Video,
    Newspaper,
    PlayCircle,
    Settings,
    Users,
} from "lucide-react";

interface AdminLayoutWrapperProps {
    children: React.ReactNode;
}

export function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: Database },
        { href: "/admin/events", label: "Events", icon: Calendar },
        { href: "/admin/media", label: "Media Library", icon: Image },
        { href: "/admin/news", label: "News", icon: Newspaper },
        { href: "/admin/ads", label: "Ad Management", icon: PlayCircle },
        { href: "/admin/users", label: "Users", icon: Users },
        { href: "/admin/settings", label: "Settings", icon: Settings },
        { href: "/admin/json-ingestion", label: "JSON Ingestion", icon: FileJson },
        { href: "/admin/audit-logs", label: "Audit Logs", icon: AlertCircle },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Bar */}
            <header className="bg-white border-b sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-6">
                        <Link href="/admin" className="text-xl font-bold">
                            <span className="text-gray-900">MainStage</span>
                            <span className="text-[#e91e63]">Vision</span>
                        </Link>
                        <input
                            type="search"
                            placeholder="Search..."
                            className="px-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-[#e91e63]"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                            🔔
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <div className="w-8 h-8 bg-[#e91e63] rounded-full flex items-center justify-center text-white font-semibold">
                                A
                            </div>
                            <span className="font-medium">Admin</span>
                            <span>▼</span>
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r min-h-screen">
                    <nav className="p-4 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive
                                            ? "bg-[#e91e63] text-white"
                                            : "hover:bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    <Icon size={20} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}
