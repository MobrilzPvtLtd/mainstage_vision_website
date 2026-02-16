"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronRight, Calendar } from "lucide-react";
import { Article, getImageUrl } from "@/lib/api";
import { FormattedDate } from "@/components/formatted-date";

interface NewsClientProps {
    initialArticles: Article[];
    categories: { id: number; name: string; slug: string }[];
}

export default function NewsClient({ initialArticles, categories }: NewsClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredArticles = useMemo(() => {
        return initialArticles.filter((article) => {
            const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = selectedCategory === "all" || article.category.toLowerCase() === selectedCategory.toLowerCase();
            return matchesSearch && matchesCategory;
        });
    }, [initialArticles, searchQuery, selectedCategory]);

    const featuredArticle = filteredArticles[0];
    const otherArticles = filteredArticles.slice(1);

    return (
        <main className="bg-[#f5f5fa] min-h-screen text-[#15171e]">
            {/* Header Section */}
            <section className="bg-[#15171e] text-white py-12 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] mb-4">NIEUWS & UPDATES</Badge>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                        Het laatste <span className="text-[#e91e63]">Muziek</span> Nieuws
                    </h1>

                    {/* Search & Filter Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-xl max-w-4xl flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-grow w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <Input
                                type="text"
                                placeholder="Zoek in nieuws..."
                                className="pl-10 h-12 bg-gray-50 border-gray-200 text-gray-900 focus:ring-[#e91e63]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="w-full md:w-auto flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <button
                                onClick={() => setSelectedCategory("all")}
                                className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === "all" ? "bg-[#15171e] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                            >
                                Alles
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.name)}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${selectedCategory === cat.name ? "bg-[#e91e63] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                {filteredArticles.length > 0 ? (
                    <>
                        {/* Featured Article */}
                        {featuredArticle && !searchQuery && selectedCategory === "all" && (
                            <Link href={`/nieuws/${featuredArticle.id}`} className="group relative block h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-16">
                                <Image
                                    src={getImageUrl(featuredArticle.featuredImage, "news")}
                                    alt={featuredArticle.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                                    <Badge className="bg-[#e91e63] text-white border-none mb-4">{featuredArticle.category}</Badge>
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-[#e91e63] transition-colors">{featuredArticle.title}</h2>
                                    <p className="text-gray-200 text-lg line-clamp-2 md:line-clamp-3 mb-6">{featuredArticle.excerpt}</p>
                                    <span className="text-white font-bold flex items-center gap-2 uppercase tracking-wide text-sm">Lees Artikel <ChevronRight size={16} /></span>
                                </div>
                            </Link>
                        )}

                        {/* News Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {(searchQuery || selectedCategory !== "all" ? filteredArticles : otherArticles).map((article) => (
                                <Link href={`/nieuws/${article.id}`} key={article.id} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={getImageUrl(article.featuredImage, "news")}
                                            alt={article.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-white/90 text-[#15171e] hover:bg-white border-none shadow-sm backdrop-blur-sm">
                                                {article.category}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wide mb-3">
                                            <Calendar size={12} className="text-[#e91e63]" />
                                            <FormattedDate date={article.publishedAt} />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#15171e] mb-3 leading-tight group-hover:text-[#e91e63] transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                                            {article.excerpt}
                                        </p>
                                        <span className="text-[#e91e63] font-bold text-xs uppercase tracking-wider mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                                            LEES MEER <ChevronRight size={12} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-900">Geen nieuws gevonden</h3>
                        <p className="text-gray-500">Probeer een andere zoekopdracht of categorie.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
