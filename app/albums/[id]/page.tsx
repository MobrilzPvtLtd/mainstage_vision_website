"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Camera, User, ArrowLeft, Share2, Download, Grid } from "lucide-react";
import { photoAlbums } from "@/lib/data";
import { notFound } from "next/navigation";

export default function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const album = photoAlbums.find((a) => a.id === parseInt(id));

    if (!album) {
        notFound();
    }

    // Generate placeholder photo grid
    const photos = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        src: album.coverImage, // Reuse cover for demo
        alt: `${album.title} photo ${i + 1}`
    }));

    return (
        <main className="bg-[#15171e] min-h-screen pb-20 text-white">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] w-full bg-black overflow-hidden">
                <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className="object-cover opacity-50 blur-sm scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-transparent"></div>

                <div className="absolute inset-x-0 bottom-0 container mx-auto px-6 pb-12">
                    <Link href="/albums" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Terug naar Albums
                    </Link>

                    <div className="flex flex-col md:flex-row items-end justify-between gap-8">
                        <div>
                            <Badge className="bg-[#e91e63] border-none text-white mb-4 text-sm font-bold uppercase tracking-wide px-3 py-1">
                                {album.event}
                            </Badge>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 shadow-xl drop-shadow-lg">
                                {album.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm md:text-base font-medium">
                                <span className="flex items-center gap-2">
                                    <Calendar size={18} className="text-[#e91e63]" /> {album.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={18} className="text-[#e91e63]" /> {album.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Camera size={18} className="text-[#e91e63]" /> {album.photoCount} foto's
                                </span>
                                <span className="flex items-center gap-2">
                                    <User size={18} className="text-[#e91e63]" /> {album.photographer}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Button className="bg-white text-[#15171e] hover:bg-gray-200 font-bold">
                                <Share2 className="mr-2" size={18} /> Delen
                            </Button>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:border-white">
                                <Download className="mr-2" size={18} /> Download Alles
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Photo Grid */}
            <section className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                        <div key={photo.id} className="group relative aspect-square bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:z-10 transform transition-all duration-300 hover:scale-105 shadow-md hover:shadow-2xl">
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button variant="ghost" className="text-white hover:text-[#e91e63] hover:bg-white/10 rounded-full p-2">
                                    <Download size={24} />
                                </Button>
                                <Button variant="ghost" className="text-white hover:text-[#e91e63] hover:bg-white/10 rounded-full p-2 ml-2">
                                    <Share2 size={24} />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button size="lg" className="bg-[#1e212b] hover:bg-[#e91e63] text-white px-8 rounded-full font-bold">
                        <Grid className="mr-2" /> Meer Foto's Laden
                    </Button>
                </div>
            </section>
        </main>
    );
}
