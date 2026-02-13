"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MapPin,
    Clock,
    Eye,
    ThumbsUp,
    Share2,
    Tv,
    ArrowLeft
} from "lucide-react";
import { videos } from "@/lib/data";
import { notFound } from "next/navigation";

export default function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const video = videos.find((v) => v.id === parseInt(id));

    // Get related videos
    const relatedVideos = videos.filter((v) => v.id !== video?.id).slice(0, 3);

    if (!video) {
        notFound();
    }

    return (
        <main className="bg-[#15171e] min-h-screen pb-20 text-white">
            {/* Container */}
            <section className="container mx-auto px-6 py-12">
                {/* Back Link */}
                <Link href="/videos" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors font-medium">
                    <ArrowLeft size={20} className="mr-2" /> Terug naar Video's
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Video Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Video Player */}
                        <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                            <iframe
                                src={`${video.embedUrl}?autoplay=1&mute=1`}
                                title={video.title}
                                className="absolute inset-0 w-full h-full border-none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        {/* Video Stats & Title */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4 text-[#e91e63] shadow-md drop-shadow-sm">
                                {video.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-800 pb-6 mb-6">
                                <div className="flex items-center gap-6 text-gray-400 text-sm font-medium">
                                    <span className="flex items-center gap-2">
                                        <Eye size={18} className="text-[#e91e63]" /> {video.views.toLocaleString()} weergaven
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock size={18} className="text-[#e91e63]" /> {video.date}
                                    </span>
                                    <Badge className="bg-[#e91e63]/20 text-[#e91e63] hover:bg-[#e91e63]/30 border-none px-2 py-1 uppercase tracking-wide">
                                        {video.category}
                                    </Badge>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                                        <ThumbsUp className="mr-2 h-4 w-4" /> 12K
                                    </Button>
                                    <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/10">
                                        <Share2 className="mr-2 h-4 w-4" /> Delen
                                    </Button>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="bg-[#1e212b] p-6 rounded-xl border border-gray-800/50">
                                <h3 className="font-bold text-lg mb-4 text-white">Beschrijving</h3>
                                <p className="text-gray-400 leading-relaxed max-w-4xl">
                                    {video.description}
                                </p>
                                <p className="text-gray-400 leading-relaxed mt-4">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Related Videos */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                            <Tv className="text-[#e91e63]" /> Meer Video's
                        </h3>

                        <div className="flex flex-col gap-6">
                            {relatedVideos.map((rel) => (
                                <Link href={`/videos/${rel.id}`} key={rel.id} className="group flex gap-4 h-24 bg-[#1e212b] rounded-lg overflow-hidden border border-gray-800 hover:border-[#e91e63]/50 transition-colors">
                                    <div className="relative w-40 min-w-[160px] h-full">
                                        <Image
                                            src={rel.thumbnail}
                                            alt={rel.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                                        />
                                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                                            {rel.duration}
                                        </span>
                                    </div>
                                    <div className="p-3 pr-4 flex flex-col justify-center w-full">
                                        <h4 className="font-bold text-sm text-white line-clamp-2 leading-snug group-hover:text-[#e91e63] transition-colors mb-1">
                                            {rel.title}
                                        </h4>
                                        <div className="mt-auto flex items-center justify-between w-full">
                                            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide">
                                                {rel.event}
                                            </span>
                                            <span className="text-[10px] text-gray-600 block">
                                                {rel.views.toLocaleString()} views
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-8 p-6 bg-gradient-to-br from-[#e91e63] to-[#c2185b] rounded-xl text-center">
                            <h4 className="font-bold text-white text-lg mb-2">Mis geen enkele video!</h4>
                            <p className="text-white/80 text-sm mb-4">Abonneer je op ons kanaal voor de laatste updates.</p>
                            <Button className="w-full bg-[#15171e] text-white hover:bg-black font-bold shadow-lg">
                                Abonneer Nu
                            </Button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
