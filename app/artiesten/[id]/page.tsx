import { getArtist, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, Users, Music, Star, ArrowLeft, Info, MapPin } from "lucide-react";
import { FormattedDate } from "@/components/formatted-date";

export default async function ArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const artist = await getArtist(id);

    if (!artist) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[50vh] min-h-[400px] w-full bg-[#15171e] text-white overflow-hidden">
                <Image
                    src={getImageUrl(artist.photoUrl)}
                    alt={artist.name}
                    fill
                    className="object-cover opacity-60 blur-sm scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-black/40 to-transparent"></div>

                <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-12">
                    <Link href="/artiesten" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors font-medium">
                        <ArrowLeft size={20} className="mr-2" /> Terug naar Artiesten
                    </Link>

                    <div className="flex flex-col md:flex-row items-end gap-8">
                        {/* Profile Image */}
                        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#e91e63] shadow-2xl flex-shrink-0 z-10 translate-y-12 md:translate-y-20 bg-gray-800">
                            <Image
                                src={getImageUrl(artist.photoUrl)}
                                alt={artist.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-grow pb-4 md:pb-0 z-0">
                            <div className="flex items-center gap-4 mb-2">
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight shadow-xl drop-shadow-lg">
                                    {artist.name}
                                </h1>
                                {artist.verified && (
                                    <Badge className="bg-blue-500 text-white border-none px-2 py-1" title="Verified Artist">✓</Badge>
                                )}
                            </div>
                            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-lg font-medium">
                                <span className="bg-[#e91e63] px-3 py-1 rounded-full text-white text-sm font-bold uppercase tracking-wide">
                                    {artist.genre}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Users size={18} className="text-[#e91e63]" /> {artist.followers ? (artist.followers / 1000000).toFixed(1) + "M" : "--"} volgers
                                </span>
                                <span className="flex items-center gap-2">
                                    <MapPin size={18} className="text-[#e91e63]" /> {artist.country || "Earth"}
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto pb-4 md:pb-0">
                            <Button className="bg-white text-[#15171e] hover:bg-gray-100 font-bold px-6 py-3 rounded-full shadow-lg transition-transform hover:scale-105">
                                <Star className="mr-2 text-[#e91e63]" fill="#e91e63" /> Volgen
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 pt-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Bio */}
                        <div>
                            <h2 className="text-2xl font-bold text-[#15171e] mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                <Info className="text-[#e91e63]" /> Biografie
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed font-medium">
                                {artist.bio || artist.description || "Geen beschrijving beschikbaar."}
                            </p>
                        </div>

                        {/* Latest Photos (Albums) */}
                        {artist.albums && artist.albums.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-[#15171e] mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                                    <Camera className="text-[#e91e63]" /> Foto's
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {artist.albums.map(album => (
                                        <Link href={`/albums/${album.id}`} key={album.id} className="group relative h-48 rounded-xl overflow-hidden shadow-md">
                                            <Image src={getImageUrl(album.featuredPhoto?.url || album.coverImage)} alt={album.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <h4 className="font-bold">{album.title}</h4>
                                                <p className="text-xs text-gray-300">{album.photoCount} foto's</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Stats Card */}
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-[#15171e] mb-6">Statistieken</h3>
                            <div className="grid grid-cols-2 gap-6 text-center">
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <Calendar className="mx-auto text-[#e91e63] mb-2" />
                                    <span className="block text-2xl font-black text-[#15171e]">{artist.eventCount || 0}</span>
                                    <span className="text-xs text-gray-500 uppercase font-bold">Events</span>
                                </div>
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <Camera className="mx-auto text-[#e91e63] mb-2" />
                                    <span className="block text-2xl font-black text-[#15171e]">{artist.photoCount || 0}</span>
                                    <span className="text-xs text-gray-500 uppercase font-bold">Foto's</span>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Events */}
                        {artist.events && artist.events.length > 0 && (
                            <div className="bg-[#15171e] p-6 rounded-2xl shadow-xl text-white">
                                <h3 className="font-bold mb-6 flex items-center gap-2">
                                    <Calendar className="text-[#e91e63]" /> Aankomende Events
                                </h3>
                                <div className="space-y-4">
                                    {artist.events.map(event => (
                                        <Link href={`/events/${event.id}`} key={event.id} className="flex gap-4 items-center bg-[#1e212b] p-3 rounded-xl hover:bg-[#252836] transition-colors border border-gray-800">
                                            <div className="bg-[#e91e63] w-12 h-12 rounded-lg flex flex-col items-center justify-center flex-shrink-0 leading-none">
                                                <span className="text-[10px] font-bold opacity-90 mb-0.5">
                                                    <FormattedDate date={event.startDate} options={{ month: "short" }} />
                                                </span>
                                                <span className="text-lg font-black">{new Date(event.startDate).getDate()}</span>
                                            </div>
                                            <div className="overflow-hidden">
                                                <h4 className="font-bold text-sm truncate group-hover:text-[#e91e63] transition-colors">{event.name}</h4>
                                                <p className="text-xs text-gray-400 truncate">{event.venueName}, {event.city}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </main>
    );
}
