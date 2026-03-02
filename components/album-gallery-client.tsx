"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Download, ZoomIn } from "lucide-react";
import { getImageUrl } from "@/lib/api";

interface Photo {
    id: number;
    url: string;
    thumbnailUrl: string;
    filename?: string;
    isFeatured?: boolean;
    photographerName?: string;
}

interface AlbumGalleryClientProps {
    photos: Photo[];
    albumTitle: string;
    photographerName?: string;
}

export function AlbumGalleryClient({ photos, albumTitle, photographerName }: AlbumGalleryClientProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = useCallback((index: number) => {
        setLightboxIndex(index);
        document.body.style.overflow = "hidden";
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIndex(null);
        document.body.style.overflow = "";
    }, []);

    const prevPhoto = useCallback(() => {
        setLightboxIndex(prev => prev !== null ? (prev - 1 + photos.length) % photos.length : null);
    }, [photos.length]);

    const nextPhoto = useCallback(() => {
        setLightboxIndex(prev => prev !== null ? (prev + 1) % photos.length : null);
    }, [photos.length]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") prevPhoto();
        if (e.key === "ArrowRight") nextPhoto();
    }, [closeLightbox, prevPhoto, nextPhoto]);

    return (
        <>
            {/* Photo Count Header */}
            <div className="flex items-center justify-between mb-8">
                <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">
                    {photos.length} foto&apos;s in dit album
                </p>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-wide">
                    Klik op een foto voor volledig scherm
                </p>
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className="relative group break-inside-avoid rounded-xl overflow-hidden bg-[#1a1b24] cursor-pointer border border-white/5 hover:border-[#e91e63]/30 transition-all duration-300"
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={getImageUrl(photo.url)}
                            alt={`Foto ${index + 1} - ${albumTitle}`}
                            width={600}
                            height={400}
                            className="w-full h-auto object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <ZoomIn size={18} className="text-white" />
                            </div>
                        </div>
                        {(photo.photographerName || photographerName) && (
                            <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-[10px] text-gray-300 font-bold">© {photo.photographerName || photographerName}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    onClick={(e) => e.target === e.currentTarget && closeLightbox()}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    {/* Photo Counter */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm font-bold px-4 py-2 rounded-full">
                        {lightboxIndex + 1} / {photos.length}
                    </div>

                    {/* Download Button */}
                    <a
                        href={getImageUrl(photos[lightboxIndex].url)}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-4 right-20 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <Download size={20} />
                    </a>

                    {/* Prev Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                        className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-[#e91e63] rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    {/* Main Photo */}
                    <div className="relative max-w-5xl max-h-[85vh] w-full h-full mx-16 flex items-center justify-center">
                        <Image
                            src={getImageUrl(photos[lightboxIndex].url)}
                            alt={`Foto ${lightboxIndex + 1} - ${albumTitle}`}
                            width={1200}
                            height={800}
                            className="object-contain max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                            priority
                        />
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                        className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-[#e91e63] rounded-full flex items-center justify-center text-white transition-colors"
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Photographer Credit */}
                    {(photos[lightboxIndex].photographerName || photographerName) && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-gray-300 text-xs font-bold px-4 py-2 rounded-full">
                            © {photos[lightboxIndex].photographerName || photographerName}
                        </div>
                    )}

                    {/* Thumbnail Strip */}
                    <div className="absolute bottom-16 left-0 right-0 px-8 overflow-x-auto">
                        <div className="flex gap-2 justify-center min-w-max mx-auto">
                            {photos.map((p, i) => (
                                <button
                                    key={p.id}
                                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                                    className={`relative w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === lightboxIndex ? 'border-[#e91e63] opacity-100' : 'border-transparent opacity-40 hover:opacity-70'}`}
                                >
                                    <Image src={getImageUrl(p.thumbnailUrl || p.url)} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
