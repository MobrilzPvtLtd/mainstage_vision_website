"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Calendar,
    MapPin,
    Ticket,
    Clock,
    Search,
    Filter,
    ChevronRight
} from "lucide-react";
import { Event, Article, getImageUrl } from "@/lib/api";
import { FormattedDate } from "@/components/formatted-date";

interface EventsClientProps {
    initialEvents: Event[];
    sidebarNews: Article[];
}

export default function EventsClient({ initialEvents, sidebarNews }: EventsClientProps) {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedProvince, setSelectedProvince] = useState("all");
    const [selectedCountry, setSelectedCountry] = useState("all");
    const [heroIndex, setHeroIndex] = useState(0);

    const featuredEvents = useMemo(() => initialEvents.slice(0, 5), [initialEvents]);

    // Get unique filter values from current data
    const uniqueTypes = useMemo(() => {
        const types = initialEvents.map(e => e.eventType).filter((t): t is string => !!t);
        return ["all", ...Array.from(new Set(types))];
    }, [initialEvents]);

    const uniqueProvinces = useMemo(() => {
        const provinces = initialEvents.map(e => e.province).filter((p): p is string => !!p);
        return ["all", ...Array.from(new Set(provinces))];
    }, [initialEvents]);

    const uniqueCountries = useMemo(() => {
        const countries = initialEvents.map(e => e.country).filter((c): c is string => !!c);
        return ["all", ...Array.from(new Set(countries))];
    }, [initialEvents]);

    // Filter Logic
    const filteredEvents = useMemo(() => {
        let results = initialEvents;

        // Tab Filter
        if (activeTab === "upcoming") {
            results = results.filter(e => new Date(e.startDate) >= new Date());
        } else {
            results = results.filter(e => new Date(e.startDate) < new Date());
        }

        if (searchQuery) {
            results = results.filter(event =>
                event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (event.venueName && event.venueName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (event.city && event.city.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedType !== "all") {
            results = results.filter(event => event.eventType === selectedType);
        }

        if (selectedProvince !== "all") {
            results = results.filter(event => event.province === selectedProvince);
        }

        if (selectedCountry !== "all") {
            results = results.filter(event => event.country === selectedCountry);
        }

        if (selectedMonth !== "all") {
            results = results.filter(event => {
                const eventMonth = new Date(event.startDate).getMonth().toString();
                return eventMonth === selectedMonth;
            });
        }

        return results;
    }, [initialEvents, searchQuery, selectedType, selectedProvince, selectedCountry, activeTab]);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section / Slider */}
            {featuredEvents.length > 0 && (
                <section className="relative h-[400px] md:h-[500px] w-full bg-[#15171e] overflow-hidden">
                    {featuredEvents.map((event, idx) => (
                        <div
                            key={event.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        >
                            <Image
                                src={getImageUrl(event.logoUrl || event.logo)}
                                alt={event.name}
                                fill
                                className="object-cover opacity-40 blur-[2px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                <Badge className="bg-[#e91e63] text-white border-none mb-4 uppercase font-bold px-3 py-1">
                                    {event.eventType}
                                </Badge>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-2 drop-shadow-lg">
                                    {event.name}
                                </h2>
                                <p className="text-gray-300 text-lg md:text-xl font-bold uppercase tracking-widest mb-6">
                                    <FormattedDate date={event.startDate} /> • {event.venueName}, {event.city}
                                </p>
                                <Button className="bg-[#e91e63] hover:bg-[#c2185b] text-white font-black px-8 py-6 rounded-lg text-lg transform hover:scale-105 transition-all">
                                    INFO & TICKETS
                                </Button>
                            </div>
                        </div>
                    ))}

                    {/* Slider Nav */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                        {featuredEvents.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setHeroIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all ${idx === heroIndex ? "bg-[#e91e63] w-8" : "bg-white/30"}`}
                            />
                        ))}
                    </div>
                </section>
            )}

            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Tabs & Filters */}
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setActiveTab("upcoming")}
                                    className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all border-2 ${activeTab === "upcoming"
                                        ? "bg-[#e91e63] text-white border-[#e91e63] shadow-lg shadow-[#e91e63]/30"
                                        : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                                        }`}
                                >
                                    AANKOMEND
                                </button>
                                <button
                                    onClick={() => setActiveTab("past")}
                                    className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all border-2 ${activeTab === "past"
                                        ? "bg-[#e91e63] text-white border-[#e91e63] shadow-lg shadow-[#e91e63]/30"
                                        : "bg-white text-gray-500 border-gray-100 hover:border-gray-300"
                                        }`}
                                >
                                    AFGELOPEN
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="md:col-span-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <Input
                                        placeholder="Zoek event, artiest of locatie..."
                                        className="pl-9 h-12 bg-gray-50 border-none rounded-xl"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Select value={selectedType} onValueChange={setSelectedType}>
                                    <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl shadow-none focus:ring-1 focus:ring-gray-200">
                                        <SelectValue placeholder="Alle types" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Alle types</SelectItem>
                                        {uniqueTypes.filter(t => t !== 'all').map(type => (
                                            <SelectItem key={type} value={type}>{type}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                    <SelectTrigger className="h-12 bg-gray-50 border-none rounded-xl shadow-none">
                                        <SelectValue placeholder="Alle maanden" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Alle maanden</SelectItem>
                                        {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"].map((m, i) => (
                                            <SelectItem key={m} value={i.toString()}>{m}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Events List */}
                        <div className="space-y-4">
                            {filteredEvents.length === 0 ? (
                                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                                    <Calendar size={64} className="mx-auto text-gray-200 mb-6" />
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen events gevonden</h3>
                                    <p className="text-gray-500">Probeer je filters aan te passen.</p>
                                </div>
                            ) : (
                                filteredEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col md:flex-row relative"
                                    >
                                        {/* Date Block */}
                                        <div className="bg-[#15171e] text-white p-6 flex flex-row md:flex-col items-center justify-center md:w-32 flex-shrink-0 gap-2 md:gap-0 border-r border-gray-800">
                                            <span className="text-4xl md:text-5xl font-black text-white">
                                                {new Date(event.startDate).getDate()}
                                            </span>
                                            <span className="text-lg md:text-xl font-bold uppercase text-[#e91e63] md:mb-1">
                                                {new Date(event.startDate).toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '').toUpperCase()}
                                            </span>
                                            <span className="text-sm md:text-base font-medium opacity-40">
                                                {new Date(event.startDate).getFullYear()}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="p-6 md:p-8 flex-grow flex flex-col justify-center">
                                            <div className="flex flex-col gap-1 mb-4">
                                                <Badge className="bg-[#e91e63]/10 text-[#e91e63] border-none text-[10px] uppercase font-black tracking-widest px-2 py-0.5 w-fit">
                                                    {event.eventType}
                                                </Badge>
                                                <h3 className="text-2xl font-black text-[#15171e] group-hover:text-[#e91e63] transition-colors leading-tight">
                                                    {event.name}
                                                </h3>
                                                <p className="text-gray-500 font-bold text-sm">
                                                    {event.venueName} — {event.city}
                                                </p>
                                            </div>

                                            {/* Lineup */}
                                            {event.lineupArtists && event.lineupArtists.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-gray-50">
                                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">LINEUP:</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {event.lineupArtists.map(artist => (
                                                            <Link
                                                                key={artist.id}
                                                                href={`/artiesten/${artist.id}`}
                                                                className="px-3 py-1.5 bg-gray-50 hover:bg-[#e91e63] hover:text-white rounded-lg text-xs font-bold text-gray-600 transition-colors shadow-sm"
                                                            >
                                                                {artist.name}
                                                            </Link>
                                                        ))}
                                                        {event.lineupArtists.length > 5 && (
                                                            <span className="text-[10px] font-bold text-[#e91e63] flex items-center cursor-pointer hover:underline">
                                                                ▼ Bekijk volledige lineup ({event.lineupArtists.length})
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Logo on the right */}
                                        <div className="hidden lg:flex items-center justify-center p-8 border-l border-gray-50 w-48">
                                            <div className="relative w-24 h-24">
                                                <Image
                                                    src={getImageUrl(event.logoUrl || event.logo)}
                                                    alt="Logo"
                                                    fill
                                                    className="object-contain grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-lg text-[#15171e] uppercase tracking-wide flex items-center gap-2">
                                    <span className="w-1.5 h-6 bg-[#e91e63] rounded-full"></span>
                                    Laatste Nieuws
                                </h3>
                                <Link href="/nieuws" className="text-xs font-bold text-[#e91e63] hover:underline flex items-center gap-1">
                                    MEER <ChevronRight size={14} />
                                </Link>
                            </div>

                            <div className="space-y-6">
                                {sidebarNews.map((item) => (
                                    <Link href={`/nieuws/${item.id}`} key={item.id} className="flex gap-4 group">
                                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                            <Image
                                                src={getImageUrl(item.featuredImage)}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="text-[10px] font-black text-gray-400 uppercase mb-1">
                                                <span className="text-[#e91e63]">{item.category}</span> • <FormattedDate date={item.publishedAt} />
                                            </div>
                                            <h4 className="font-bold text-[#15171e] text-sm leading-tight group-hover:text-[#e91e63] transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Social Widget or Ad placeholder can go here */}
                        <div className="bg-[#15171e] rounded-2xl p-8 text-center text-white">
                            <h4 className="text-xl font-black mb-4">Adverteren?</h4>
                            <p className="text-gray-400 text-sm mb-6">Zet jouw festival of artiest in de spotlight bij MainStage Vision.</p>
                            <Button className="bg-white text-[#15171e] hover:bg-[#e91e63] hover:text-white font-black w-full rounded-xl">
                                CONTACT ONS
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
