"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { newsArticles, getMostPopularNews } from "@/lib/data";
import { notFound } from "next/navigation";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const article = newsArticles.find((a) => a.id === parseInt(id));
    const popularNews = getMostPopularNews(3);

    if (!article) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] w-full bg-gray-900">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div className="absolute inset-x-0 bottom-0 container mx-auto px-6 pb-12">
                    <Link href="/nieuws" className="inline-flex items-center text-gray-300 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Terug naar Nieuws
                    </Link>

                    <Badge className="bg-[#e91e63] border-none text-white mb-4 text-sm font-bold uppercase tracking-wide">
                        {article.category}
                    </Badge>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-5xl">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-medium">
                        <span className="flex items-center gap-2">
                            <Calendar size={18} className="text-[#e91e63]" /> {article.date}
                        </span>
                        <span className="flex items-center gap-2">
                            <Clock size={18} className="text-[#e91e63]" /> 3 min leestijd
                        </span>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                            {article.views} weergaven
                        </span>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            <p className="lead text-xl md:text-2xl font-semibold text-gray-900 mb-8 border-l-4 border-[#e91e63] pl-6 italic">
                                {article.excerpt}
                            </p>

                            <div dangerouslySetInnerHTML={{ __html: article.content }} />

                            <p className="mt-6">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>

                            <h3 className="text-2xl font-bold text-[#15171e] mt-10 mb-4">Wat betekent dit voor de toekomst?</h3>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                            </p>
                        </div>

                        {/* Share Buttons */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Share2 size={18} className="text-[#e91e63]" /> Deel dit artikel
                            </h4>
                            <div className="flex gap-4">
                                <Button className="bg-[#1877f2] hover:bg-[#166fe5] text-white">
                                    <Facebook size={18} className="mr-2" /> Facebook
                                </Button>
                                <Button className="bg-[#1da1f2] hover:bg-[#1a91da] text-white">
                                    <Twitter size={18} className="mr-2" /> Twitter
                                </Button>
                                <Button className="bg-[#0077b5] hover:bg-[#006399] text-white">
                                    <Linkedin size={18} className="mr-2" /> LinkedIn
                                </Button>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* Author Card - Placeholder */}
                        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Over de auteur</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                                    {/* Avatar placeholder */}
                                </div>
                                <div>
                                    <p className="font-bold text-sm">MainStage Redactie</p>
                                    <p className="text-xs text-gray-500">Muziek experts</p>
                                </div>
                            </div>
                        </div>

                        {/* Popular News */}
                        <div>
                            <h3 className="text-xl font-bold text-[#15171e] mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-6 bg-[#e91e63] block"></span> Populaire Artikelen
                            </h3>
                            <div className="space-y-6">
                                {popularNews.map((news) => (
                                    <Link href={`/nieuws/${news.id}`} key={news.id} className="flex gap-4 group">
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={news.image}
                                                alt={news.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-none text-[10px] px-2 py-0.5 mb-2">
                                                {news.category}
                                            </Badge>
                                            <h4 className="font-bold text-sm text-[#15171e] group-hover:text-[#e91e63] transition-colors line-clamp-2 leading-snug">
                                                {news.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
}
