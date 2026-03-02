"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import { Search, Star, Music, Calendar, ChevronRight } from "lucide-react";
import { Review, Event, getImageUrl } from "@/lib/api";
import { FormattedDate } from "@/components/formatted-date";

interface ReviewsClientProps {
    initialReviews: Review[];
    events: Event[];
}

export default function ReviewsClient({ initialReviews, events }: ReviewsClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedEventId, setSelectedEventId] = useState("all");
    const [selectedRating, setSelectedRating] = useState("all");

    const filteredReviews = useMemo(() => {
        return initialReviews.filter((review) => {
            const matchesSearch = review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                review.summary.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesEvent = selectedEventId === "all" || review.eventId?.toString() === selectedEventId;
            const matchesRating = selectedRating === "all" || review.rating?.toString() === selectedRating;
            return matchesSearch && matchesEvent && matchesRating;
        });
    }, [initialReviews, searchQuery, selectedEventId, selectedRating]);

    // Star Rating Component
    const RatingStars = ({ rating }: { rating: number }) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={14}
                        className={star <= rating ? "fill-[#e91e63] text-[#e91e63]" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Hero Section */}
            <section className="bg-[#15171e] text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="rec-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M0 30h60M30 0v60" stroke="white" strokeWidth="0.5" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#rec-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-6 px-4 py-1.5 rounded-full text-xs font-bold tracking-[2px] uppercase">RECENSIES</Badge>
                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-none">
                        Evenement <span className="text-[#e91e63]">reviews</span> door onze redactie
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Lees onze onafhankelijke recensies van de meest spraakmakende concerten, festivals en events.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-2xl shadow-2xl max-w-5xl mx-auto flex flex-col lg:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek op titel of inhoud..."
                                className="pl-12 h-14 bg-gray-50 border-none text-gray-900 focus:ring-2 focus:ring-[#e91e63]/20 rounded-xl"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                            <div className="w-full lg:w-64">
                                <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-none text-gray-900 rounded-xl">
                                        <SelectValue placeholder="Filter op event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Alle Events</SelectItem>
                                        {events.map((event) => (
                                            <SelectItem key={event.id} value={event.id.toString()}>{event.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-full lg:w-48">
                                <Select value={selectedRating} onValueChange={setSelectedRating}>
                                    <SelectTrigger className="h-14 bg-gray-50 border-none text-gray-900 rounded-xl">
                                        <SelectValue placeholder="Rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Alle Ratings</SelectItem>
                                        {[5, 4, 3, 2, 1].map((r) => (
                                            <SelectItem key={r} value={r.toString()}>{r} Sterren</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Info */}
            <div className="container mx-auto px-6 pt-12">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[3px]">
                    {filteredReviews.length} {filteredReviews.length === 1 ? 'RESULTAAT' : 'RESULTATEN'} GEVONDEN
                </p>
            </div>

            {/* Reviews Grid */}
            <section className="py-12 container mx-auto px-6">
                {filteredReviews.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
                        <Music size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen recensies gevonden</h3>
                        <p className="text-gray-500">Probeer een andere zoekterm of pas je filters aan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredReviews.map((review) => (
                            <Link href={`/recensies/${review.id}`} key={review.id} className="group">
                                <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-gray-100">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={getImageUrl(review.featuredImage, "news")}
                                            alt={review.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1.5 border border-gray-100">
                                            <RatingStars rating={review.rating} />
                                        </div>
                                    </div>
                                    
                                    <div className="p-8 flex-grow flex flex-col">
                                        <div className="flex items-center gap-2 mb-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <Calendar size={12} className="text-[#e91e63]" />
                                            <FormattedDate date={review.publishDate} />
                                        </div>

                                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#e91e63] transition-colors leading-tight mb-4">
                                            {review.title}
                                        </h3>

                                        <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed font-medium">
                                            {review.summary}
                                        </p>

                                        <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                                            <span className="text-[#e91e63] text-xs font-black tracking-widest uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                                Lees Meer <ChevronRight size={14} />
                                            </span>
                                            {review.eventId && (
                                                <Badge className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 border-none rounded">
                                                    EVENT RECENSIE
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
