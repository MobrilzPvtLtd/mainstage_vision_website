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
import { Search, Clock, ArrowRight, BookOpen } from "lucide-react";
import { newsArticles, searchNews } from "@/lib/data";

export default function NieuwsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = useMemo(() => ["all", ...Array.from(new Set(newsArticles.map(a => a.category)))], []);

    const filteredArticles = useMemo(() => {
        return searchNews(searchQuery, selectedCategory === "all" ? undefined : selectedCategory);
    }, [searchQuery, selectedCategory]);

    const featuredArticle = filteredArticles.find(a => a.featured) || filteredArticles[0];
    const gridArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id);

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="news-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                                <path d="M0 0L30 30L60 0" stroke="white" strokeWidth="1" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#news-pattern)" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">NIEUWS & UPDATES</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Het laatste <span className="text-[#e91e63]">Muzieknieuws</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Blijf op de hoogte van de nieuwste releases, festival aankondigingen, en exclusieve interviews.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek artikelen..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#e91e63]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-64">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-200 text-gray-900">
                                    <SelectValue placeholder="Categorie" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle Categorieën</SelectItem>
                                    {categories.filter(c => c !== 'all').map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 container mx-auto px-6">
                {filteredArticles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <BookOpen size={64} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen artikelen gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-8">
                            We konden geen nieuws vinden dat voldoet aan je zoekcriteria.
                        </p>
                        <Button
                            onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                            className="bg-[#e91e63] hover:bg-[#c2185b]"
                        >
                            Reset Filters
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Featured Article */}
                        {featuredArticle && (
                            <Link href={`/nieuws/${featuredArticle.id}`} className="group block">
                                <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                                    <Image
                                        src={featuredArticle.image}
                                        alt={featuredArticle.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                                        <Badge className="bg-[#e91e63] text-white border-none mb-4 text-sm font-bold px-3 py-1 uppercase tracking-wide">
                                            {featuredArticle.category}
                                        </Badge>
                                        <h2 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-white group-hover:text-[#e91e63] transition-colors">
                                            {featuredArticle.title}
                                        </h2>
                                        <p className="text-gray-200 text-lg line-clamp-2 mb-6 font-medium">
                                            {featuredArticle.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-400 font-bold uppercase tracking-wider">
                                            <span className="flex items-center gap-2">
                                                <Clock size={16} className="text-[#e91e63]" /> {featuredArticle.date}
                                            </span>
                                            <span className="flex items-center gap-2 text-[#e91e63] group-hover:translate-x-2 transition-transform">
                                                Lees meer <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {gridArticles.map((article) => (
                                <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                                    <div className="relative h-64 overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <Badge className="absolute top-4 left-4 bg-[#15171e] text-white border-none text-[10px] px-2 py-1 uppercase tracking-wide">
                                            {article.category}
                                        </Badge>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs text-gray-400 mb-3 flex items-center gap-2 font-medium uppercase tracking-wide">
                                            <Clock size={14} className="text-[#e91e63]" /> {article.date}
                                        </div>
                                        <Link href={`/nieuws/${article.id}`}>
                                            <h3 className="text-xl font-bold text-[#15171e] mb-3 leading-snug group-hover:text-[#e91e63] transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <Link href={`/nieuws/${article.id}`} className="inline-flex items-center text-xs font-black text-[#e91e63] uppercase tracking-wider group-hover:underline mt-auto">
                                            LEES ARTIKEL <ArrowRight size={14} className="ml-1" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
