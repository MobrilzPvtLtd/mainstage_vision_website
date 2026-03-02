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
import { Play, Search } from "lucide-react";
import { Video, getImageUrl } from "@/lib/api";
import { FormattedDate } from "@/components/formatted-date";

interface VideosClientProps {
    initialVideos: Video[];
}

export default function VideosClient({ initialVideos }: VideosClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("all");

    const uniqueEvents = useMemo(() => {
        const events = initialVideos.map(v => v.eventName).filter((name): name is string => !!name);
        return ["all", ...Array.from(new Set(events))];
    }, [initialVideos]);

    const filteredVideos = useMemo(() => {
        return initialVideos.filter((video) => {
            const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (video.eventName && video.eventName.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesEvent = selectedEvent === "all" || video.eventName === selectedEvent;
            return matchesSearch && matchesEvent;
        });
    }, [initialVideos, searchQuery, selectedEvent]);

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="videos-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <polygon points="0,0 20,20 0,40" stroke="white" strokeWidth="1" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#videos-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">VIDEO GALLERY</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Bekijk de <span className="text-[#e91e63]">Highlights</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Aftermovies, interviews en live sets van de beste artiesten.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek video's of artiesten..."
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

            {/* Videos Grid */}
            <section className="py-16 container mx-auto px-6">
                {filteredVideos.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <Play size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen video's gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            We konden geen video's vinden die voldoen aan je zoekcriteria.
                        </p>
                        <Button onClick={() => { setSearchQuery(""); setSelectedEvent("all"); }} className="bg-[#e91e63]">Reset Filters</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((video) => (
                            <Link href={`/videos/${video.id}`} key={video.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                                    <div className="relative h-56 overflow-hidden bg-black">
                                        <Image
                                            src={getImageUrl(video.thumbnailUrl, "event")}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                        />
                                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                            <div className="w-16 h-16 bg-[#e91e63] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                <Play fill="white" className="text-white ml-1" size={24} />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                                            {video.duration ? `${Math.floor(video.duration / 60)}:${(video.duration % 60).toString().padStart(2, '0')}` : "VIDEO"}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge className="bg-[#e91e63]/10 text-[#e91e63] border-none text-[10px] uppercase tracking-wide px-2 py-0.5">
                                                {video.eventName || "Event"}
                                            </Badge>
                                            <span className="text-xs text-gray-400 font-bold ml-auto">
                                                <FormattedDate date={video.createdAt} />
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-[#15171e] leading-snug group-hover:text-[#e91e63] transition-colors mb-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-2">
                                            {video.description || "Bekijk deze exclusieve video op MainStage Vision."}
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
