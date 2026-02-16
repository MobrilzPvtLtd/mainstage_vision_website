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
import { Search, Music, Users, Calendar, Camera, ChevronRight } from "lucide-react";
import { Artist, getImageUrl } from "@/lib/api";

interface ArtistsClientProps {
    initialArtists: Artist[];
}

export default function ArtistsClient({ initialArtists }: ArtistsClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("all");
    const [selectedLetter, setSelectedLetter] = useState("all");

    // Get unique genres for filter
    const genres = useMemo(() => {
        const allGenres = initialArtists.map((a) => a.genre).filter(Boolean);
        return ["all", ...Array.from(new Set(allGenres))];
    }, [initialArtists]);

    // Filter Logic
    const filteredArtists = useMemo(() => {
        return initialArtists.filter((artist) => {
            const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGenre = selectedGenre === "all" || artist.genre === selectedGenre;
            const matchesLetter = selectedLetter === "all" || artist.name.toUpperCase().startsWith(selectedLetter);
            return matchesSearch && matchesGenre && matchesLetter;
        });
    }, [initialArtists, searchQuery, selectedGenre, selectedLetter]);

    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="artist-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#artist-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">ARTIESTEN & DJ'S</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Vind jouw favoriete <span className="text-[#e91e63]">artiest</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Een compleet overzicht van alle artiesten, DJ's en bands in onze database.
                        Bekijk hun bio, aankomende events en laatste foto's.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek op naam..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#e91e63]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 text-gray-900">
                                    <SelectValue placeholder="Kies een genre" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle Genres</SelectItem>
                                    {genres.filter(g => g !== 'all').map(genre => (
                                        <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* A-Z Filter Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm overflow-x-auto">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between md:justify-center items-center py-4 min-w-max">
                        <button
                            onClick={() => setSelectedLetter("all")}
                            className={`px-3 py-1 text-sm font-bold rounded-md transition-colors mr-2 ${selectedLetter === "all"
                                ? "bg-[#15171e] text-white"
                                : "text-gray-500 hover:text-[#e91e63] hover:bg-gray-100"
                                }`}
                        >
                            ALLE
                        </button>
                        {alphabet.map((letter) => (
                            <button
                                key={letter}
                                onClick={() => setSelectedLetter(letter)}
                                className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-full transition-colors ${selectedLetter === letter
                                    ? "bg-[#e91e63] text-white"
                                    : "text-gray-500 hover:text-[#e91e63] hover:bg-gray-100"
                                    }`}
                            >
                                {letter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Artists Grid */}
            <section className="py-16 container mx-auto px-6">
                {filteredArtists.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <Users size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen artiesten gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            We konden geen artiesten vinden die voldoen aan je zoekcriteria. Probeer een andere zoekterm of filter.
                        </p>
                        <Button
                            onClick={() => { setSearchQuery(""); setSelectedGenre("all"); setSelectedLetter("all"); }}
                            className="bg-[#e91e63] hover:bg-[#c2185b]"
                        >
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredArtists.map((artist) => (
                            <Link href={`/artiesten/${artist.id}`} key={artist.id} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
                                    {/* Image Container */}
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={getImageUrl(artist.photoUrl)}
                                            alt={artist.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                                        {artist.verified && (
                                            <div className="absolute top-4 right-4 bg-blue-500 text-white p-1 rounded-full shadow-lg" title="Verified Artist">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.491 4.491 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}

                                        <div className="absolute bottom-0 left-0 w-full p-6">
                                            <h3 className="text-2xl font-bold text-white group-hover:text-[#e91e63] transition-colors mb-1">
                                                {artist.name}
                                            </h3>
                                            <Badge className="bg-[#e91e63] text-white border-none text-xs font-normal">
                                                {artist.genre}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="p-6 grid grid-cols-2 gap-4 border-t border-gray-100 bg-white">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-[#e91e63]/5 transition-colors">
                                            <Calendar className="mx-auto mb-1 text-gray-400 group-hover:text-[#e91e63]" size={18} />
                                            <span className="block text-lg font-bold text-[#15171e]">{artist.eventCount || 0}</span>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Events</span>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg group-hover:bg-[#e91e63]/5 transition-colors">
                                            <Camera className="mx-auto mb-1 text-gray-400 group-hover:text-[#e91e63]" size={18} />
                                            <span className="block text-lg font-bold text-[#15171e]">{artist.photoCount || 0}</span>
                                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Foto's</span>
                                        </div>
                                    </div>

                                    {/* Footer Stats - Followers */}
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Users size={14} /> {(artist.followers ? (artist.followers / 1000000).toFixed(1) + "M" : "--")} volgers
                                        </span>
                                        <span className="text-[#e91e63] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                            PROFIEL <ChevronRight size={14} />
                                        </span>
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
