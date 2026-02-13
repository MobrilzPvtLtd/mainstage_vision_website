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
import { Search, Play, Clock, Video } from "lucide-react";
import { videos } from "@/lib/data";

export default function VideosPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEvent, setSelectedEvent] = useState("all");

    const events = useMemo(() => ["all", ...Array.from(new Set(videos.map(v => v.event)))], []);

    const filteredVideos = useMemo(() => {
        let results = videos;
        if (searchQuery) {
            results = results.filter(v =>
                v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.event.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        if (selectedEvent !== "all") {
            results = results.filter(v => v.event === selectedEvent);
        }
        return results;
    }, [searchQuery, selectedEvent]);

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="video-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                <polygon points="10,10 50,30 10,50" stroke="white" strokeWidth="1" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#video-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">MEDIA CENTER</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        <span className="text-[#e91e63]">Video's</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Bekijk aftermovies, live sets en interviews van jouw favoriete events en artiesten.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek video's..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#e91e63]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 text-gray-900">
                                    <SelectValue placeholder="Event" />
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

            {/* Videos Grid */}
            <section className="py-16 container mx-auto px-6">
                {filteredVideos.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <Video size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen video's gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            Probeer een andere zoekopdracht.
                        </p>
                        <Button
                            onClick={() => { setSearchQuery(""); setSelectedEvent("all"); }}
                            className="bg-[#e91e63] hover:bg-[#c2185b]"
                        >
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredVideos.map((video) => (
                            <Link href={`/videos/${video.id}`} key={video.id} className="group block h-full">
                                <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
                                    {/* Thumbnail Container */}
                                    <div className="relative h-56 w-full">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
                                                <Play fill="white" className="text-white ml-1" size={32} />
                                            </div>
                                        </div>

                                        {/* Duration Badge */}
                                        <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                                            {video.duration}
                                        </div>

                                        <Badge className="absolute top-4 left-4 bg-[#e91e63] border-none text-[10px] uppercase tracking-wide">
                                            {video.category}
                                        </Badge>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs text-gray-400 mb-2 flex items-center gap-2 font-bold uppercase tracking-wide">
                                            <Clock size={12} className="text-[#e91e63]" /> {video.date}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#15171e] mb-2 leading-snug group-hover:text-[#e91e63] transition-colors line-clamp-2">
                                            {video.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
                                            {video.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                            <span className="w-1.5 h-1.5 bg-[#e91e63] rounded-full"></span>
                                            {video.views.toLocaleString()} weergaven
                                        </div>
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
