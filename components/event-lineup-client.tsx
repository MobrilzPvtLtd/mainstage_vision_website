"use client";

import { useState } from "react";
import Image from "next/image";
import { getImageUrl, Artist } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Mic2, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface EventLineupClientProps {
    artists: Artist[];
}

export function EventLineupClient({ artists }: EventLineupClientProps) {
    const [expanded, setExpanded] = useState(false);
    const displayArtists = expanded ? artists : artists.slice(0, 6);

    if (artists.length === 0) return null;

    return (
        <section className="space-y-6">
            <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <Mic2 className="text-[#e91e63]" /> Line-up
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayArtists.map((artist) => (
                    <Link
                        key={artist.id}
                        href={`/artiesten/${artist.id}`}
                        className="group flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl hover:bg-white/10 hover:border-[#e91e63]/50 transition-all duration-300"
                    >
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-[#e91e63]/50 transition-colors">
                            <Image
                                src={getImageUrl(artist.photoUrl)}
                                alt={artist.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div className="flex-grow">
                            <h4 className="font-bold text-white group-hover:text-[#e91e63] transition-colors line-clamp-1">
                                {artist.name}
                            </h4>
                            <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                                {artist.genre}
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#e91e63] group-hover:text-white transition-all">
                            <Mic2 size={14} />
                        </div>
                    </Link>
                ))}
            </div>

            {artists.length > 6 && (
                <div className="flex justify-center mt-8">
                    <Button
                        onClick={() => setExpanded(!expanded)}
                        variant="outline"
                        className="bg-white/5 border-white/10 hover:bg-white/10 text-white font-bold px-8 py-6 rounded-xl transition-all hover:border-[#e91e63]"
                    >
                        {expanded ? (
                            <><ChevronUp className="mr-2" /> Minder tonen</>
                        ) : (
                            <><ChevronDown className="mr-2" /> Bekijk volledige lineup ({artists.length} artiesten)</>
                        )}
                    </Button>
                </div>
            )}
        </section>
    );
}
