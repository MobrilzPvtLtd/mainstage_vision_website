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
import { Search, Camera, FolderOpen } from "lucide-react";
import { photoAlbums, searchAlbums } from "@/lib/data";

export default function AlbumsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("all");

    const events = useMemo(() => ["all", ...Array.from(new Set(photoAlbums.map(a => a.event)))], []);

    const filteredAlbums = useMemo(() => {
        return searchAlbums(searchQuery, selectedEvent === "all" ? undefined : selectedEvent);
    }, [searchQuery, selectedEvent]);

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="album-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                <rect x="10" y="10" width="40" height="40" stroke="white" strokeWidth="1" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#album-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">GALLERIJ</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Foto <span className="text-[#e91e63]">Albums</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Herbeleef de magie. Bekijk de beste foto's van festivals, concerten en club nights.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek albums of artiesten..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#e91e63]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 text-gray-900">
                                    <SelectValue placeholder="Filter op Event" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle Events</SelectItem>
                                    {events.filter(e => e !== 'all').map(event => (
                                        <SelectItem key={event} value={event}>{event}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Albums Grid */}
            <section className="py-16 container mx-auto px-6">
                {filteredAlbums.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <FolderOpen size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen albums gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            Er zijn geen foto albums gevonden die voldoen aan je zoekcriteria.
                        </p>
                        <Button
                            onClick={() => { setSearchQuery(""); setSelectedEvent("all"); }}
                            className="bg-[#e91e63] hover:bg-[#c2185b]"
                        >
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredAlbums.map((album) => (
                            <Link href={`/albums/${album.id}`} key={album.id} className="group block">
                                <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100 border border-gray-200 group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
                                    <Image
                                        src={album.coverImage}
                                        alt={album.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                                    {/* Photo Count Badge */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/10 shadow-lg">
                                        <Camera size={14} className="text-[#e91e63]" /> {album.photoCount}
                                    </div>

                                    {/* Date Badge */}
                                    <div className="absolute top-4 left-4 bg-[#e91e63] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wide">
                                        {album.date.split("-")[0]}
                                    </div>

                                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                                        <h3 className="font-bold text-xl leading-tight group-hover:text-[#e91e63] transition-colors mb-1 shadow-black drop-shadow-md">
                                            {album.title}
                                        </h3>
                                        <p className="text-sm text-gray-300 font-medium tracking-wide uppercase flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-[#e91e63] rounded-full"></span> {album.event}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
