"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Added missing import
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Camera, Search, Filter } from "lucide-react";
import { Album, getImageUrl } from "@/lib/api";
import { FormattedDate } from "@/components/formatted-date";

interface AlbumsClientProps {
    initialAlbums: Album[];
}

export default function AlbumsClient({ initialAlbums }: AlbumsClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("all");

    const uniqueEvents = useMemo(() => {
        const events = initialAlbums.map(a => a.eventName).filter((name): name is string => !!name);
        return ["all", ...Array.from(new Set(events))];
    }, [initialAlbums]);

    const filteredAlbums = useMemo(() => {
        return initialAlbums.filter((album) => {
            const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (album.eventName && album.eventName.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesEvent = selectedEvent === "all" || album.eventName === selectedEvent;
            return matchesSearch && matchesEvent;
        });
    }, [initialAlbums, searchQuery, selectedEvent]);

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="albums-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <rect width="20" height="20" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#albums-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">GALLERY</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Herbeleef de <span className="text-[#e91e63]">Sfeer</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        De beste foto's van de grootste festivals en concerten, vastgelegd door onze topfotografen.
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
                                    <SelectValue placeholder="Kies een event" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle Events</SelectItem>
                                    {uniqueEvents.filter(e => e !== 'all').map((eventName) => (
                                        <SelectItem key={eventName} value={eventName}>{eventName}</SelectItem>
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
                        <Camera size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen albums gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            We konden geen albums vinden die voldoen aan je zoekcriteria.
                        </p>
                        <Button onClick={() => { setSearchQuery(""); setSelectedEvent("all"); }} className="bg-[#e91e63]">Reset Filters</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredAlbums.map((album) => (
                            <Link href={`/albums/${album.id}`} key={album.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={getImageUrl(album.coverImage, "album")}
                                            alt={album.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
                                            <Camera size={12} /> {album.photoCount}
                                        </div>
                                        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                                            <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-[#e91e63] transition-colors">{album.title}</h3>
                                            <p className="text-xs text-gray-300 uppercase font-bold tracking-wide">{album.eventName}</p>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-between items-center text-xs text-gray-500 border-t border-gray-100 bg-gray-50">
                                        <FormattedDate date={album.createdAt} />
                                        <span className="font-bold text-[#e91e63] group-hover:translate-x-1 transition-transform">BEKIJK FOTO'S &rarr;</span>
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
