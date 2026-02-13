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
import { events, searchEvents } from "@/lib/data";

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedMonth, setSelectedMonth] = useState("all");
    const [selectedProvince, setSelectedProvince] = useState("all");
    const [selectedCountry, setSelectedCountry] = useState("all");

    // Get unique filter values
    const uniqueTypes = useMemo(() => ["all", ...Array.from(new Set(events.map(e => e.type)))], []);
    const uniqueProvinces = useMemo(() => ["all", ...Array.from(new Set(events.map(e => e.province)))], []);
    const uniqueCountries = useMemo(() => ["all", ...Array.from(new Set(events.map(e => e.country)))], []);

    // Filter Logic
    const filteredEvents = useMemo(() => {
        return searchEvents({
            query: searchQuery,
            type: selectedType,
            month: selectedMonth,
            province: selectedProvince,
            country: selectedCountry,
            upcoming: activeTab === "upcoming"
        });
    }, [searchQuery, selectedType, selectedMonth, selectedProvince, selectedCountry, activeTab]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "SOLD_OUT": return "bg-red-500 hover:bg-red-600";
            case "ALMOST_SOLD_OUT": return "bg-orange-500 hover:bg-orange-600";
            case "PRE_SALE": return "bg-blue-500 hover:bg-blue-600";
            default: return "bg-green-500 hover:bg-green-600";
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "SOLD_OUT": return "UITVERKOCHT";
            case "ALMOST_SOLD_OUT": return "BIJNA UITVERKOCHT";
            case "PRE_SALE": return "PRE-SALE";
            default: return "TICKETS BESCHIKBAAR";
        }
    };

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="events-pattern" width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="60" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#events-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Calendar className="text-[#e91e63]" size={32} />
                                <span className="text-[#e91e63] font-bold tracking-widest uppercase text-sm">AGENDA</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                                Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e91e63] to-purple-600">Events</span>
                            </h1>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white/10 p-1 rounded-lg flex backdrop-blur-sm">
                            <button
                                onClick={() => setActiveTab("upcoming")}
                                className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "upcoming"
                                        ? "bg-[#e91e63] text-white shadow-lg"
                                        : "text-gray-300 hover:bg-white/10"
                                    }`}
                            >
                                AANKOMEND
                            </button>
                            <button
                                onClick={() => setActiveTab("past")}
                                className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${activeTab === "past"
                                        ? "bg-[#e91e63] text-white shadow-lg"
                                        : "text-gray-300 hover:bg-white/10"
                                    }`}
                            >
                                AFGELOPEN
                            </button>
                        </div>
                    </div>

                    {/* Filters Bar */}
                    <div className="bg-white p-6 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <Input
                                placeholder="Zoek event, stad of locatie..."
                                className="pl-10 bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#e91e63]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                                <SelectValue placeholder="Type Event" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Types</SelectItem>
                                {uniqueTypes.filter(t => t !== 'all').map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                                <SelectValue placeholder="Provincie" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Provincies</SelectItem>
                                {uniqueProvinces.filter(p => p !== 'all').map(prov => (
                                    <SelectItem key={prov} value={prov}>{prov}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900">
                                <SelectValue placeholder="Land" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Landen</SelectItem>
                                {uniqueCountries.filter(c => c !== 'all').map(country => (
                                    <SelectItem key={country} value={country}>{country}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Events List */}
            <section className="py-16 px-6 container mx-auto">
                <div className="flex flex-col gap-8">
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
                                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col md:flex-row"
                            >
                                {/* Date Block (Mobile: Top, Desktop: Left) */}
                                <div className="bg-[#15171e] text-white p-6 flex flex-row md:flex-col items-center justify-center md:w-32 flex-shrink-0 gap-2 md:gap-0 border-r border-gray-800">
                                    <span className="text-lg md:text-xl font-bold uppercase md:mb-1 opacity-80">
                                        {new Date(event.date).toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '')}
                                    </span>
                                    <span className="text-4xl md:text-5xl font-black text-[#e91e63]">
                                        {new Date(event.date).getDate()}
                                    </span>
                                    <span className="text-sm md:text-base font-medium opacity-60 md:mt-1">
                                        {new Date(event.date).getFullYear()}
                                    </span>
                                </div>

                                {/* Event Image */}
                                <div className="relative w-full md:w-72 h-48 md:h-auto flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={event.image}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <Badge className="absolute top-4 left-4 bg-[#e91e63] text-white border-none text-[10px] px-2 py-1 uppercase tracking-wide">
                                        {event.genre}
                                    </Badge>
                                </div>

                                {/* Event Details */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <h3 className="text-2xl md:text-3xl font-extrabold text-[#15171e] group-hover:text-[#e91e63] transition-colors leading-tight">
                                                {event.title}
                                            </h3>
                                            <Badge className={`${getStatusColor(event.ticketStatus)} text-white border-none px-3 py-1`}>
                                                {getStatusLabel(event.ticketStatus)}
                                            </Badge>
                                        </div>

                                        <p className="text-gray-600 mb-6 line-clamp-2">
                                            {event.description}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-500 mb-6">
                                            <div className="flex items-center gap-2">
                                                <Clock size={16} className="text-[#e91e63]" /> {event.time}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin size={16} className="text-[#e91e63]" />
                                                <span className="truncate" title={`${event.location}, ${event.venue}`}>{event.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Ticket size={16} className="text-[#e91e63]" /> {event.ticketPrice}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        <Button className="bg-[#15171e] hover:bg-[#e91e63] text-white flex-grow sm:flex-grow-0 rounded-lg font-bold">
                                            <Ticket className="mr-2" size={16} /> TICKETS
                                        </Button>
                                        <Button variant="outline" className="border-gray-200 hover:border-[#e91e63] hover:text-[#e91e63] text-[#15171e] rounded-lg font-bold" asChild>
                                            <Link href={`/events/${event.id}`}>
                                                MEER INFO
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
