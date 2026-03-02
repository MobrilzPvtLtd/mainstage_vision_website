import { getAlbum, getAlbums, getVideos, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, ArrowLeft, Play } from "lucide-react";
import { AlbumGalleryClient } from "@/components/album-gallery-client";
import Image from "next/image";

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const album = await getAlbum(id);

    if (!album) {
        notFound();
    }

    // Fetch related content
    const [relatedAlbums, relatedVideos] = await Promise.all([
        getAlbums({ eventId: album.eventId, limit: 4 }),
        getVideos({ eventId: album.eventId, limit: 4 }),
    ]);
    const otherAlbums = relatedAlbums.filter(a => a.id !== album.id).slice(0, 3);

    return (
        <main className="bg-[#0d0e14] min-h-screen text-white pb-20">
            {/* Hero Section */}
            <section className="relative py-16 border-b border-white/10 overflow-hidden">
                {album.coverImage && (
                    <div className="absolute inset-0 opacity-15 pointer-events-none">
                        <Image src={getImageUrl(album.coverImage, "album")} alt="Background" fill className="object-cover blur-2xl scale-110" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0e14]/60 via-[#0d0e14]/80 to-[#0d0e14]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/albums" className="inline-flex items-center text-gray-400 hover:text-[#e91e63] mb-8 font-bold text-sm tracking-wide transition-colors gap-2">
                        <ArrowLeft size={16} /> TERUG NAAR OVERZICHT
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-[#e91e63] text-white border-none font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                {album.eventName || "GALLERIJ"}
                            </Badge>
                            <span className="text-gray-400 text-sm font-bold flex items-center gap-2">
                                <Calendar size={14} />
                                {new Date(album.createdAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight uppercase italic tracking-tight">{album.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 font-bold text-sm">
                            <span className="flex items-center gap-2">
                                <Camera size={18} className="text-[#e91e63]" />
                                {album.photoCount || album.photos?.length || 0} FOTO&apos;S
                            </span>
                            {album.photographerName && (
                                <span className="flex items-center gap-2 text-gray-500">
                                    © {album.photographerName}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Photos Grid with Lightbox */}
            <section className="container mx-auto px-6 py-12">
                {album.photos && album.photos.length > 0 ? (
                    <AlbumGalleryClient
                        photos={album.photos}
                        albumTitle={album.title}
                        photographerName={album.photographerName}
                    />
                ) : (
                    <div className="text-center py-24 bg-white/5 rounded-3xl border border-white/10">
                        <Camera size={64} className="mx-auto text-gray-600 mb-6" />
                        <h3 className="text-xl font-bold text-gray-300 mb-2">Nog geen foto&apos;s beschikbaar</h3>
                        <p className="text-gray-500">De foto&apos;s voor dit album worden binnenkort toegevoegd.</p>
                    </div>
                )}
            </section>

            {/* Related Content */}
            {(otherAlbums.length > 0 || relatedVideos.length > 0) && (
                <section className="container mx-auto px-6 py-4 space-y-16">
                    {/* Related Videos */}
                    {relatedVideos.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-8 bg-[#e91e63] rounded-full"></div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Gerelateerde Video&apos;s</h2>
                                <p className="text-gray-500 text-sm font-bold ml-2">Bekijk video&apos;s van dit event</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {relatedVideos.slice(0, 4).map(video => (
                                    <Link href={`/videos/${video.id}`} key={video.id} className="group relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
                                        <Image src={getImageUrl(video.thumbnailUrl, "event")} alt={video.title} fill className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-[#e91e63]/80 backdrop-blur-md flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                                                <Play fill="white" size={20} />
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                            <h4 className="text-white text-sm font-bold line-clamp-1">{video.title}</h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Albums */}
                    {otherAlbums.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-8 bg-[#e91e63] rounded-full"></div>
                                <h2 className="text-2xl font-black uppercase italic tracking-tight">Gerelateerde Albums</h2>
                                <p className="text-gray-500 text-sm font-bold ml-2">Ontdek meer foto albums van dit event</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {otherAlbums.map(a => (
                                    <Link href={`/albums/${a.id}`} key={a.id} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                                        <Image src={getImageUrl(a.coverImage, "album")} alt={a.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <h4 className="font-bold text-white group-hover:text-[#e91e63] transition-colors line-clamp-1">{a.title}</h4>
                                            <p className="text-xs text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                                                <Camera size={10} /> {a.photoCount} FOTO&apos;S
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}
        </main>
    );
}
