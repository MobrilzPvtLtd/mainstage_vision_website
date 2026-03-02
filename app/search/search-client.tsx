"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchResult } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, ChevronRight } from "lucide-react";

interface Props {
    initialResults: SearchResult[];
    query: string;
}

export default function SearchClient({ initialResults, query }: Props) {
    return (
        <main className="bg-[#f5f5fa] min-h-screen pb-24">
            <section className="bg-[#15171e] text-white py-16">
                <div className="container mx-auto px-6">
                    <Badge className="bg-[#e91e63] mb-4">ZOEKRESULTATEN</Badge>
                    <h1 className="text-4xl md:text-5xl font-black mb-2">
                        Resultaten voor "<span className="text-[#e91e63]">{query}</span>"
                    </h1>
                    <p className="text-gray-400 font-medium">
                        {initialResults.length} resultaten gevonden
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-6 py-12">
                {initialResults.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {initialResults.map((result, idx) => (
                            <Link
                                key={`${result.type}-${result.id}-${idx}`}
                                href={result.url}
                                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                            >
                                <div className="relative h-48 overflow-hidden bg-gray-100">
                                    {result.image ? (
                                        <Image
                                            src={result.image}
                                            alt={result.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                                            <Search size={48} />
                                        </div>
                                    )}
                                    <Badge className="absolute top-4 left-4 bg-[#15171e] text-white border-none uppercase text-[10px] tracking-widest">
                                        {result.type}
                                    </Badge>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    {result.date && (
                                        <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase mb-2">
                                            <Calendar size={12} className="text-[#e91e63]" />
                                            {new Date(result.date).toLocaleDateString()}
                                        </div>
                                    )}
                                    <h3 className="text-xl font-bold text-[#15171e] mb-2 group-hover:text-[#e91e63] transition-colors leading-tight">
                                        {result.title}
                                    </h3>
                                    {result.subtitle && (
                                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                                            {result.subtitle}
                                        </p>
                                    )}
                                    <span className="mt-auto text-[#e91e63] font-bold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                        BEKIJK {result.type} <ChevronRight size={12} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-6">
                            <Search size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#15171e] mb-2">Geen resultaten gevonden</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            Probeer een andere zoekterm of blader door onze categorieën.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Button variant="outline" asChild><Link href="/nieuws">NIEUWS</Link></Button>
                            <Button variant="outline" asChild><Link href="/events">AGENDA</Link></Button>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
