"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { HeadlinerAnnouncement, getImageUrl } from "@/lib/api";

interface Props {
    announcements: HeadlinerAnnouncement[];
}

export function HeadlinerAnnouncements({ announcements }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);

    if (!announcements.length) return null;

    const current = announcements[activeIndex];

    const next = () => setActiveIndex((i) => (i + 1) % announcements.length);
    const prev = () => setActiveIndex((i) => (i - 1 + announcements.length) % announcements.length);

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-2 mb-8">
                    <Flame className="text-[#e91e63] animate-pulse" fill="#e91e63" />
                    <h2 className="text-2xl font-black text-[#15171e] uppercase tracking-dense">Headliner ✨ <span className="text-[#e91e63]">Onthullingen</span></h2>
                </div>

                <div className="relative group overflow-hidden rounded-3xl shadow-2xl bg-[#15171e]">
                    <div className="flex flex-col lg:flex-row min-h-[400px]">
                        <div className="lg:w-1/2 relative h-[300px] lg:h-auto">
                            <Image
                                src={getImageUrl(current.artistPhoto, "artist")}
                                alt={current.artistName}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#15171e] hidden lg:block"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-transparent lg:hidden"></div>
                        </div>

                        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center relative z-10">
                            <Badge className="bg-[#e91e63] w-fit mb-4">{current.eventName}</Badge>
                            <h3 className="text-3xl lg:text-5xl font-black text-white mb-6 leading-tight">
                                {current.title}
                            </h3>
                            <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
                                {current.description}
                            </p>
                            <Link
                                href={`/events/${current.eventId}`}
                                className="inline-flex items-center text-sm font-black text-[#e91e63] uppercase tracking-widest hover:translate-x-2 transition-transform"
                            >
                                Bekijk Event Details <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>

                    {announcements.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                onClick={next}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                            >
                                <ChevronRight />
                            </button>

                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {announcements.map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 rounded-full transition-all ${i === activeIndex ? "w-8 bg-[#e91e63]" : "w-2 bg-white/30"}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
