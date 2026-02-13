"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/nieuws", label: "Nieuws" },
        { href: "/albums", label: "Foto's" },
        { href: "/videos", label: "Video's" },
        { href: "/events", label: "Events" },
        { href: "/artiesten", label: "Artiesten" },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#15171e] text-white shadow-lg border-b border-gray-800">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold tracking-tight group flex items-center gap-1">
                        <span className="text-white group-hover:text-gray-200 transition-colors">MainStage</span>
                        <span className="text-[#e91e63]">Vision</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 h-full">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative h-full flex items-center text-sm font-bold uppercase tracking-wide transition-colors duration-300 ${active
                                            ? "text-[#e91e63]"
                                            : "text-gray-300 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                    <span className={`absolute bottom-0 left-0 h-[3px] bg-[#e91e63] transition-all duration-300 rounded-t-full ${active ? "w-full" : "w-0 group-hover:w-full"
                                        }`}></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden absolute top-[80px] left-0 right-0 bg-[#15171e] border-t border-gray-800 shadow-2xl animate-in slide-in-from-top-2">
                        <nav className="flex flex-col p-6 space-y-2">
                            {navLinks.map((link) => {
                                const active = isActive(link.href);
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block py-3 px-4 rounded-lg font-bold uppercase tracking-wide transition-colors ${active
                                                ? "bg-[#e91e63]/10 text-[#e91e63]"
                                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                                            }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
