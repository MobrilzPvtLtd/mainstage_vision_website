"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

export function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/nieuws", label: "Nieuws" },
        { href: "/albums", label: "Foto's" },
        { href: "/videos", label: "Video's" },
        { href: "/events", label: "Events" },
        { href: "/recensies", label: "Recensies" },
        { href: "/artiesten", label: "Artiesten" },
    ];

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
        <header className="sticky top-0 z-50 bg-[#0a0a0a] text-white shadow-2xl border-b border-white/5 backdrop-blur-md bg-opacity-95">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black uppercase italic tracking-tighter group flex items-center gap-0.5">
                        <span className="text-white group-hover:text-[#e91e63] transition-colors">MainStage</span>
                        <span className="text-[#e91e63] group-hover:text-white transition-colors">Vision</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 h-full">
                        {navLinks.map((link) => {
                            const active = isActive(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`relative h-full flex items-center text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${active
                                        ? "text-[#e91e63]"
                                        : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                    <span className={`absolute bottom-0 left-0 h-[3px] bg-[#e91e63] transition-all duration-500 rounded-t-full shadow-[0_0_10px_rgba(233,30,99,0.5)] ${active ? "w-full" : "w-0 group-hover:w-full"
                                        }`}></span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search & Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#e91e63] transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="ZOEKEN..."
                                className="bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:ring-1 focus:ring-[#e91e63]/50 focus:bg-white/10 w-40 lg:w-64 transition-all placeholder:text-gray-600"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        window.location.href = `/search?q=${encodeURIComponent(e.currentTarget.value)}`;
                                    }
                                }}
                            />
                        </div>
                    </div>

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
