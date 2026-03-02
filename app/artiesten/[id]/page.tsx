import { getArtist, getImageUrl, getVideos, getAlbums } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Camera, Music, Star, ArrowLeft, Info, MapPin, Play } from "lucide-react";
import { FormattedDate } from "@/components/formatted-date";

export default async function ArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artist = await getArtist(id);

    if (!artist) {
        notFound();
    }

    // Fetch related content in parallel
    const [allVideos, artistAlbums] = await Promise.all([
        getVideos({ limit: 20 }),
        getAlbums({ limit: 20 }),
    ]);

    // Filter videos that mention the artist
    const relatedVideos = allVideos.filter(v =>
        v.artistName?.toLowerCase().includes(artist.name.toLowerCase()) ||
        v.title.toLowerCase().includes(artist.name.toLowerCase())
    ).slice(0, 4);

    // Use albums from artist object if available, otherwise filter from all albums
    const relatedAlbums = (artist.albums && artist.albums.length > 0)
        ? artist.albums
        : artistAlbums.filter(a =>
            a.artistName?.toLowerCase().includes(artist.name.toLowerCase()) ||
            a.title.toLowerCase().includes(artist.name.toLowerCase())
        ).slice(0, 6);

    // Fallback avatar: colored initials
    const initials = artist.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const hasPhoto = !!artist.photoUrl;

    return (
        <main className="bg-[#0d0e14] min-h-screen text-white pb-20">
            {/* Hero Section with blurred background */}
            <section className="relative h-[55vh] min-h-[450px] w-full overflow-hidden">
                {hasPhoto ? (
                    <Image
                        src={getImageUrl(artist.photoUrl, "artist")}
                        alt={artist.name}
                        fill
                        className="object-cover opacity-40 blur-sm scale-110"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a12] via-[#1a1b28] to-[#0d0e14]"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-[#0d0e14]/60 to-black/40"></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>

                <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-0">
                    <Link href="/artiesten" className="absolute top-8 left-6 inline-flex items-center text-gray-400 hover:text-[#e91e63] transition-colors font-bold text-sm gap-2">
                        <ArrowLeft size={18} /> Terug naar Artiesten
                    </Link>

                    <div className="flex flex-col md:flex-row items-end gap-8">
                        {/* Profile Image / Avatar */}
                        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-[#e91e63] shadow-[0_0_40px_rgba(233,30,99,0.3)] flex-shrink-0 z-10 translate-y-16 bg-[#1a1b28]">
                            {hasPhoto ? (
                                <Image
                                    src={getImageUrl(artist.photoUrl, "artist")}
                                    alt={artist.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#e91e63]/20 to-[#e91e63]/5">
                                    <span className="text-4xl md:text-5xl font-black text-[#e91e63]">{initials}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-grow pb-6 space-y-3">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight uppercase italic tracking-tight">
                                    {artist.name}
                                </h1>
                                {artist.verified && (
                                    <Badge className="bg-blue-500 text-white border-none px-2 py-1 rounded-full text-xs font-black" title="Verified Artist">✓ VERIFIED</Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-gray-300 font-bold text-sm">
                                <span className="bg-[#e91e63] px-4 py-1.5 rounded-full text-white text-xs font-black uppercase tracking-widest">
                                    {artist.genre || "ARTIEST"}
                                </span>
                                {artist.country && (
                                    <span className="flex items-center gap-2 text-gray-400">
                                        <MapPin size={16} className="text-[#e91e63]" /> {artist.country}
                                    </span>
                                )}
                                {artist.followers && (
                                    <span className="flex items-center gap-2 text-gray-400">
                                        <Star size={16} className="text-[#e91e63]" />
                                        {artist.followers >= 1000000
                                            ? (artist.followers / 1000000).toFixed(1) + "M"
                                            : artist.followers >= 1000
                                                ? (artist.followers / 1000).toFixed(0) + "K"
                                                : artist.followers} volgers
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="bg-[#131420] border-y border-white/10 mt-16">
                <div className="container mx-auto px-6 py-6">
                    <div className="grid grid-cols-3 gap-0 divide-x divide-white/10">
                        <div className="text-center py-2">
                            <span className="block text-3xl md:text-4xl font-black text-white">{artist.eventCount || 0}</span>
                            <span className="text-xs text-gray-500 font-black uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                                <Calendar size={12} className="text-[#e91e63]" /> Events
                            </span>
                        </div>
                        <div className="text-center py-2">
                            <span className="block text-3xl md:text-4xl font-black text-white">{artist.photoCount || relatedAlbums.length}</span>
                            <span className="text-xs text-gray-500 font-black uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                                <Camera size={12} className="text-[#e91e63]" /> Albums
                            </span>
                        </div>
                        <div className="text-center py-2">
                            <span className="block text-3xl md:text-4xl font-black text-white">{relatedVideos.length}</span>
                            <span className="text-xs text-gray-500 font-black uppercase tracking-widest flex items-center justify-center gap-1 mt-1">
                                <Play size={12} className="text-[#e91e63]" /> Video&apos;s
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content: Bio, Albums, Videos */}
                    <div className="lg:col-span-8 space-y-16">
                        {/* Bio */}
                        {(artist.bio || artist.description) && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1 h-8 bg-[#e91e63] rounded-full"></div>
                                    <h2 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                                        <Info size={22} className="text-[#e91e63]" /> Biografie
                                    </h2>
                                </div>
                                <p className="text-lg text-gray-300 leading-relaxed font-medium bg-white/5 rounded-2xl p-8 border border-white/10">
                                    {artist.bio || artist.description}
                                </p>
                            </div>
                        )}

                        {/* Photo Albums */}
                        {relatedAlbums.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1 h-8 bg-[#e91e63] rounded-full"></div>
                                    <h2 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                                        <Camera size={22} className="text-[#e91e63]" /> Foto&apos;s
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {relatedAlbums.map(album => (
                                        <Link href={`/albums/${album.id}`} key={album.id} className="group relative h-52 rounded-2xl overflow-hidden border border-white/10 hover:border-[#e91e63]/30 transition-all shadow-xl">
                                            <Image
                                                src={getImageUrl(album.coverImage || album.featuredPhoto?.url, "album")}
                                                alt={album.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h4 className="font-black text-white group-hover:text-[#e91e63] transition-colors uppercase italic text-sm">{album.title}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 flex items-center gap-1">
                                                    <Camera size={10} /> {album.photoCount} FOTO&apos;S
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Videos */}
                        {relatedVideos.length > 0 && (
                            <div>
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-1 h-8 bg-[#e91e63] rounded-full"></div>
                                    <h2 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                                        <Play size={22} className="text-[#e91e63]" /> Video&apos;s
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {relatedVideos.map(video => (
                                        <Link href={`/videos/${video.id}`} key={video.id} className="group relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 hover:border-[#e91e63]/30 transition-all shadow-xl">
                                            <Image
                                                src={getImageUrl(video.thumbnailUrl, "event")}
                                                alt={video.title}
                                                fill
                                                className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-14 h-14 rounded-full bg-[#e91e63]/80 backdrop-blur-sm flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl shadow-[#e91e63]/20">
                                                    <Play fill="white" size={22} />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                                <h4 className="font-black text-white text-sm line-clamp-1">{video.title}</h4>
                                                {video.eventName && <p className="text-[#e91e63] text-[10px] font-bold uppercase tracking-widest mt-0.5">{video.eventName}</p>}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">

                        {/* Genre Info */}
                        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                            <h3 className="font-black text-white mb-4 flex items-center gap-2 uppercase text-sm tracking-widest">
                                <Music size={18} className="text-[#e91e63]" /> Info
                            </h3>
                            <div className="space-y-3">
                                {artist.genre && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">Genre</span>
                                        <span className="text-white text-sm font-bold">{artist.genre}</span>
                                    </div>
                                )}
                                {artist.country && (
                                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">Land</span>
                                        <span className="text-white text-sm font-bold">{artist.country}</span>
                                    </div>
                                )}
                                {artist.verified && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">Status</span>
                                        <Badge className="bg-blue-500/20 text-blue-400 border-none text-xs font-black">✓ GEVERIFIEERD</Badge>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        {artist.events && artist.events.length > 0 && (
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                <h3 className="font-black text-white mb-6 flex items-center gap-2 uppercase text-sm tracking-widest">
                                    <Calendar size={18} className="text-[#e91e63]" /> Aankomende Events
                                </h3>
                                <div className="space-y-4">
                                    {artist.events.filter(e => !e.isPast).map(event => (
                                        <Link href={`/events/${event.id}`} key={event.id} className="flex gap-4 items-center bg-[#1a1b28] p-3 rounded-xl hover:bg-[#1f2035] transition-colors border border-white/5 group">
                                            <div className="bg-[#e91e63] w-12 h-12 rounded-xl flex flex-col items-center justify-center flex-shrink-0 leading-none shadow-lg shadow-[#e91e63]/20">
                                                <span className="text-[9px] font-black opacity-90 uppercase">
                                                    <FormattedDate date={event.startDate} options={{ month: "short" }} />
                                                </span>
                                                <span className="text-lg font-black">{new Date(event.startDate).getDate()}</span>
                                            </div>
                                            <div className="overflow-hidden">
                                                <h4 className="font-bold text-sm text-white group-hover:text-[#e91e63] truncate transition-colors">{event.name}</h4>
                                                <p className="text-xs text-gray-500 truncate mt-0.5">{event.venueName}, {event.city}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </section>
        </main>
    );
}
