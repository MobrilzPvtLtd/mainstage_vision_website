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
    ChevronRight,
    Camera,
    Newspaper
} from "lucide-react";
import { Event, Article, Album, getImageUrl } from "@/lib/api";
import { FormattedDate } from "@/components/formatted-date";

interface EventsClientProps {
    initialEvents: Event[];
    sidebarNews: Article[];
    recentAlbums: Album[];
}

export default function EventsClient({ initialEvents, sidebarNews, recentAlbums }: EventsClientProps) {
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

    // Normalize "now" to start of day for cleaner date comparison
    const now = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    // Filter Logic
    const filteredEvents = useMemo(() => {
        let results = initialEvents;

        // Tab Filter — compare startDate at day boundary
        if (activeTab === "upcoming") {
            results = results.filter(e => new Date(e.startDate) >= now);
            results = results.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        } else {
            results = results.filter(e => new Date(e.startDate) < now);
            results = results.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
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
    }, [initialEvents, searchQuery, selectedType, selectedProvince, selectedCountry, activeTab, selectedMonth, now]);


    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section / Slider */}
            {featuredEvents.length > 0 && (
                <section className="relative h-[450px] md:h-[550px] w-full bg-[#15171e] overflow-hidden">
                    {/* Background Grid Pattern */}
                    <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {featuredEvents.map((event, idx) => (
                        <div
                            key={event.id}
                            className={`absolute inset-0 transition-opacity duration-1000 ${idx === heroIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        >
                            <Image
                                src={getImageUrl(event.logoUrl || event.logo, "event")}
                                alt={event.name}
                                fill
                                className="object-cover opacity-40 blur-[1px]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-transparent"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 mt-12">
                                <Badge className="bg-[#e91e63] text-white border-none mb-4 uppercase font-bold px-4 py-1.5 rounded-full text-xs tracking-widest animate-fade-in shadow-[0_0_20px_rgba(233,30,99,0.3)]">
                                    {event.eventType}
                                </Badge>
                                <h1 className="text-4xl md:text-7xl font-black text-white mb-4 drop-shadow-2xl max-w-4xl tracking-tight leading-none uppercase">
                                    {event.name.split(' - ')[0]}
                                    <span className="block text-[#e91e63]">{event.name.split(' - ')[1]}</span>
                                </h1>
                                <p className="text-gray-300 text-lg md:text-2xl font-bold uppercase tracking-[0.3em] mb-10 opacity-80">
                                    <FormattedDate date={event.startDate} /> <span className="text-[#e91e63] mx-2">•</span> {event.venueName}, {event.city}
                                </p>
                                <Button asChild className="bg-[#e91e63] hover:bg-white hover:text-[#e91e63] text-white font-black px-12 py-8 rounded-2xl text-xl transform hover:scale-105 transition-all duration-300 shadow-2xl">
                                    <Link href={`/events/${event.id}`}>ONTDEK DIT EVENT</Link>
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

                            <div className="bg-white p-2 md:p-3 rounded-full shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-2">
                                <div className="w-full md:w-auto flex-grow relative px-4">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input
                                        placeholder="Zoek event..."
                                        className="pl-10 h-12 bg-transparent border-none rounded-full shadow-none focus-visible:ring-0 text-gray-900 font-medium"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap gap-2">
                                    <Select value={selectedType} onValueChange={setSelectedType}>
                                        <SelectTrigger className="h-12 bg-gray-50 border-none rounded-full px-6 shadow-none focus:ring-0 min-w-[130px] font-bold text-xs uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-colors">
                                            <SelectValue placeholder="EVENT TYPE" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">ALLE TYPES</SelectItem>
                                            {uniqueTypes.filter(t => t !== 'all').map(type => (
                                                <SelectItem key={type} value={type}>{type.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                        <SelectTrigger className="h-12 bg-gray-50 border-none rounded-full px-6 shadow-none focus:ring-0 min-w-[130px] font-bold text-xs uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-colors">
                                            <SelectValue placeholder="MAAND" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">ALLE MAANDEN</SelectItem>
                                            {["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"].map((m, i) => (
                                                <SelectItem key={m} value={i.toString()}>{m.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                                        <SelectTrigger className="h-12 bg-gray-50 border-none rounded-full px-6 shadow-none focus:ring-0 min-w-[130px] font-bold text-xs uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-colors">
                                            <SelectValue placeholder="PROVINCIE" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">ALLE PROVINCIES</SelectItem>
                                            {uniqueProvinces.filter(p => p !== 'all').map(prov => (
                                                <SelectItem key={prov} value={prov}>{prov.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                                        <SelectTrigger className="h-12 bg-gray-50 border-none rounded-full px-6 shadow-none focus:ring-0 min-w-[130px] font-bold text-xs uppercase tracking-wider text-gray-500 hover:bg-gray-100 transition-colors mr-2">
                                            <SelectValue placeholder="LAND" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">ALLE LANDEN</SelectItem>
                                            {uniqueCountries.filter(c => c !== 'all').map(country => (
                                                <SelectItem key={country} value={country}>{country.toUpperCase()}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
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
                                    <Link
                                        key={event.id}
                                        href={`/events/${event.id}`}
                                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex relative"
                                    >
                                        {/* Date Block */}
                                        <div className="bg-[#15171e] text-white p-6 flex flex-col items-center justify-center w-24 md:w-32 flex-shrink-0 border-r border-gray-800 transition-colors group-hover:bg-[#e91e63]">
                                            <span className="text-4xl md:text-5xl font-black text-white leading-none">
                                                {new Date(event.startDate).getDate()}
                                            </span>
                                            <span className="text-sm md:text-base font-black uppercase text-[#e91e63] group-hover:text-white transition-colors mt-1">
                                                {new Date(event.startDate).toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '').toUpperCase()}
                                            </span>
                                            <span className="text-[10px] md:text-xs font-bold opacity-40 group-hover:opacity-70">
                                                {new Date(event.startDate).getFullYear()}
                                            </span>
                                        </div>

                                        {/* Details */}
                                        <div className="p-5 md:p-8 flex-grow flex flex-col justify-center overflow-hidden">
                                            <div className="flex flex-col gap-1">
                                                <Badge className="bg-[#e91e63]/10 text-[#e91e63] border-none text-[9px] uppercase font-black tracking-widest px-2 py-0.5 w-fit mb-1">
                                                    {event.eventType}
                                                </Badge>
                                                <h3 className="text-xl md:text-2xl font-black text-[#15171e] group-hover:text-[#e91e63] transition-colors leading-tight truncate">
                                                    {event.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-gray-500 font-bold text-xs mt-1">
                                                    <MapPin size={14} className="text-gray-400" />
                                                    <span className="truncate">{event.venueName} — {event.city}</span>
                                                </div>
                                                {/* Lineup Artists */}
                                                {event.lineupArtists && event.lineupArtists.length > 0 && (
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {event.lineupArtists.slice(0, 4).map((artist, i) => (
                                                            <span key={i} className="text-[9px] font-black uppercase tracking-wide text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                                                {artist.name}
                                                            </span>
                                                        ))}
                                                        {event.lineupArtists.length > 4 && (
                                                            <span className="text-[9px] font-black uppercase tracking-wide text-[#e91e63] bg-[#e91e63]/10 px-2 py-0.5 rounded-full">
                                                                +{event.lineupArtists.length - 4}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Thumbnail on the right */}
                                        <div className="relative w-24 md:w-40 flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={getImageUrl(event.logoUrl || event.logo, "event")}
                                                alt={event.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                    </Link>

                                ))
                            )}
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Sidebar News */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-black text-xl text-[#15171e] uppercase tracking-tight flex items-center gap-2">
                                    <Newspaper className="text-[#e91e63]" size={24} />
                                    Nieuws
                                </h3>
                                <Link href="/nieuws" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-[#e91e63] hover:bg-[#e91e63] hover:text-white transition-all shadow-sm">
                                    <ChevronRight size={18} />
                                </Link>
                            </div>

                            <div className="space-y-8">
                                {sidebarNews.slice(0, 3).map((item) => (
                                    <Link href={`/nieuws/${item.id}`} key={item.id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                                            <Image
                                                src={getImageUrl(item.featuredImage, "news")}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="font-black text-[#15171e] text-sm leading-tight group-hover:text-[#e91e63] transition-colors line-clamp-2 mb-1">
                                                {item.title}
                                            </h4>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <FormattedDate date={item.publishedAt} />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Albums */}
                        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-black text-xl text-[#15171e] uppercase tracking-tight flex items-center gap-2">
                                    <Camera className="text-[#e91e63]" size={24} />
                                    Albums
                                </h3>
                                <Link href="/albums" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-[#e91e63] hover:bg-[#e91e63] hover:text-white transition-all shadow-sm">
                                    <ChevronRight size={18} />
                                </Link>
                            </div>

                            <div className="space-y-8">
                                {recentAlbums.map((album) => (
                                    <Link href={`/albums/${album.id}`} key={album.id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                                            <Image
                                                src={getImageUrl(album.coverImage, "album")}
                                                alt={album.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="font-black text-[#15171e] text-sm leading-tight group-hover:text-[#e91e63] transition-colors line-clamp-2 mb-1">
                                                {album.title}
                                            </h4>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                {album.photoCount} FOTO'S
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#15171e] rounded-[2rem] p-8 text-center text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e91e63]/10 blur-3xl"></div>
                            <h4 className="text-xl font-black mb-3">Partner worden?</h4>
                            <p className="text-gray-400 text-xs font-bold leading-relaxed mb-6 px-4 uppercase tracking-wider">
                                BRENG JOUW EVENT NAAR HET GROTE PUBLIEK MET MAINSTAGE VISION.
                            </p>
                            <Button asChild className="bg-[#e91e63] hover:bg-white hover:text-[#e91e63] text-white font-black w-full rounded-xl py-6 transition-all shadow-lg shadow-[#e91e63]/20">
                                <Link href="/contact">NEEM CONTACT OP</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
