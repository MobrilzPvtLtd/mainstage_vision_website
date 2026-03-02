import { getVideo, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Clock, Share2, ThumbsUp, Calendar, ArrowLeft, Play } from "lucide-react";

export default async function VideoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const video = await getVideo(id);

    if (!video) {
        notFound();
    }

    return (
        <main className="bg-[#15171e] min-h-screen text-white pb-16">
            <div className="container mx-auto px-6 py-8">
                <Link href="/videos" className="inline-flex items-center text-gray-400 hover:text-[#e91e63] mb-6 font-bold text-sm tracking-wide transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> TERUG NAAR OVERZICHT
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Video Player & Info */}
                    <div className="lg:col-span-8">
                        <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl mb-6 ring-1 ring-white/10">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeVideoId}?autoplay=1&modestbranding=1&rel=0`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>

                        <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight">{video.title}</h1>

                        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400 border-b border-gray-800 pb-6 mb-6">
                            <div className="flex items-center gap-6">
                                <span className="flex items-center gap-2 font-bold text-white">
                                    <Eye size={18} className="text-[#e91e63]" /> {video.views || 0} weergaven
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock size={18} /> {new Date(video.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="sm" className="bg-white/5 hover:bg-white/10 text-white gap-2">
                                    <ThumbsUp size={16} /> Like
                                </Button>
                                <Button variant="ghost" size="sm" className="bg-white/5 hover:bg-white/10 text-white gap-2">
                                    <Share2 size={16} /> Delen
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-[#e91e63] rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                                M
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-white">MainStage Vision</h3>
                                <p className="text-gray-400 text-sm mb-4">Officiële video partner</p>
                                <p className="text-gray-300 leading-relaxed max-w-2xl">
                                    {video.description || "Geen beschrijving beschikbaar voor deze video."}
                                </p>
                                <div className="mt-4 flex gap-2">
                                    {video.eventName && <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:text-white">#{video.eventName.replace(/\s+/g, '')}</Badge>}
                                    {video.artistName && <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:text-white">#{video.artistName.replace(/\s+/g, '')}</Badge>}
                                    <Badge variant="secondary" className="bg-gray-800 text-gray-300 hover:text-white">#MainStage</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Up Next */}
                    <div className="lg:col-span-4">
                        <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
                            <Play className="text-[#e91e63]" /> Meer Video's
                        </h3>
                        {/* This list could be fetched from API related videos, but for now we don't have that easily unless we fetch all. 
                   Ideally "related videos" endpoint or fetch list again. 
                   I'll conditionally render if I can fetch, or just a placeholder message.
                   Since I can't easily fetch unrelated without prop drilling or new fetch, I'll fetch recent videos here. 
               */}
                        <RelatedVideosWrapper currentId={video.id} />
                    </div>
                </div>
            </div>
        </main>
    );
}

// Small component to fetch related videos (Server Component pattern in same file or separate)
async function RelatedVideosWrapper({ currentId }: { currentId: number }) {
    // Cyclic dependency if I import getVideos here? No.
    // However, clean approach is separate or safe.
    // I'll assume getVideos is safe.
    const { getVideos } = await import("@/lib/api");
    const videos = await getVideos({ limit: 6 });
    const related = videos.filter(v => v.id !== currentId);

    return (
        <div className="space-y-4">
            {related.map(vid => (
                <Link href={`/videos/${vid.id}`} key={vid.id} className="flex gap-3 group hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={getImageUrl(vid.thumbnailUrl, "event")} alt={vid.title} fill className="object-cover" />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-[10px] px-1 rounded font-bold">
                            {vid.duration ? `${Math.floor(vid.duration / 60)}:${(vid.duration % 60).toString().padStart(2, '0')}` : "VIDEO"}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm line-clamp-2 leading-snug group-hover:text-[#e91e63] transition-colors">{vid.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{vid.artistName || "MainStage"}</p>
                        <p className="text-[10px] text-gray-600 mt-0.5">{vid.views || 0} weergaven</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
