import { getAlbum, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Calendar, ArrowLeft, Download } from "lucide-react";

export default async function AlbumDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const album = await getAlbum(id);

    if (!album) {
        notFound();
    }

    return (
        <main className="bg-[#15171e] min-h-screen text-white pb-20">
            {/* Hero Section */}
            <section className="relative py-12 border-b border-gray-800">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <Image src={getImageUrl(album.coverImage)} alt="Background" fill className="object-cover blur-xl" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link href="/albums" className="inline-flex items-center text-gray-400 hover:text-[#e91e63] mb-8 font-bold text-sm tracking-wide transition-colors">
                        <ArrowLeft size={16} className="mr-2" /> TERUG NAAR OVERZICHT
                    </Link>

                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Badge className="bg-[#e91e63] text-white border-none">{album.eventName || "Event"}</Badge>
                            <span className="text-gray-400 text-sm font-bold flex items-center gap-2">
                                <Calendar size={14} /> {new Date(album.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{album.title}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 font-medium">
                            <span className="flex items-center gap-2">
                                <Camera size={18} className="text-[#e91e63]" /> {album.photoCount} FOTO'S
                            </span>
                            {album.photographerName && (
                                <span className="flex items-center gap-2">
                                    © {album.photographerName}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Photos Grid */}
            <section className="container mx-auto px-6 py-12">
                {album.photos && album.photos.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {album.photos.map((photo) => (
                            <div key={photo.id} className="relative group break-inside-avoid rounded-xl overflow-hidden bg-gray-900 cursor-pointer">
                                <Image
                                    src={getImageUrl(photo.url)}
                                    alt={`Photo by ${photo.photographerName || album.photographerName}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    <Button variant="secondary" size="icon" className="rounded-full bg-white text-black hover:bg-gray-200">
                                        <Download size={20} />
                                    </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-xs text-gray-300">© {photo.photographerName || album.photographerName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#1e212b] rounded-2xl border border-gray-800">
                        <Camera size={48} className="mx-auto text-gray-600 mb-4" />
                        <p className="text-gray-400">Er zijn (nog) geen gedetailleerde foto's beschikbaar in dit album.</p>
                    </div>
                )}
            </section>
        </main>
    );
}
