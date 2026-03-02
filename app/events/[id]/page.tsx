import { getEvent, getImageUrl, getNews, getVideos, getEvents, getAlbums } from "@/lib/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Ticket, Globe, Play, ChevronRight, ArrowLeft, Info, Camera } from "lucide-react";
import { FormattedDate } from "@/components/formatted-date";
import { EventLineupClient } from "@/components/event-lineup-client";
import { SocialShare } from "@/components/social-share";

export default async function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = await getEvent(id);

    if (!event) {
        notFound();
    }

    // Fetch related content
    const relatedNews = await getNews({ eventId: event.id, limit: 3 });
    const relatedVideos = await getVideos({ eventId: event.id, limit: 2 });
    const relatedAlbums = await getAlbums({ eventId: event.id, limit: 4 });
    const relatedEvents = await getEvents({ limit: 4, includePast: true }); // Standard related events fallback

    // Festival dates (Programma) - If this event is part of a series, logic would go here.
    // Based on target site, it's a list of events with similar names or sharing a parent.
    const programEvents = event.relatedEvents || [];

    const eventDate = new Date(event.startDate);

    return (
        <main className="bg-[#161720] min-h-screen text-white pb-20">
            {/* Hero Section */}
            <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
                <Image
                    src={getImageUrl(event.logoUrl || event.logo, "event")}
                    alt={event.name}
                    fill
                    className="object-cover opacity-50 blur-[2px] scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161720] via-black/40 to-black/60"></div>

                <div className="absolute inset-0 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    {/* Floating Back Button */}
                    <Link
                        href="/events"
                        className="absolute top-24 left-6 flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10"
                    >
                        <ArrowLeft size={18} /> Terug naar events
                    </Link>

                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        {/* Date Badge */}
                        <div className="bg-white/95 backdrop-blur-md text-[#15171e] p-5 rounded-2xl shadow-2xl text-center min-w-[130px] hidden md:block">
                            <span className="block text-sm font-black uppercase tracking-widest text-[#e91e63] mb-1">
                                <FormattedDate date={event.startDate} options={{ month: "short" }} />
                            </span>
                            <span className="block text-6xl font-black leading-none mb-1">
                                {eventDate.getDate()}
                            </span>
                            <span className="block text-sm font-bold text-gray-500 tracking-widest uppercase">
                                {eventDate.getFullYear()}
                            </span>
                        </div>

                        <div className="flex-grow">
                            <Badge className="bg-[#e91e63] text-white border-none mb-4 text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                                {event.eventType || "FESTIVAL"}
                            </Badge>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-6 drop-shadow-2xl max-w-4xl">
                                {event.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-8 text-white/80 text-lg font-bold">
                                <span className="flex items-center gap-3">
                                    <MapPin size={22} className="text-[#e91e63]" /> {event.venueName}, {event.city}
                                </span>
                                {event.ticketUrl && (
                                    <span className="flex items-center gap-3">
                                        <Badge variant="outline" className="border-[#e91e63] text-[#e91e63] bg-[#e91e63]/10 font-black px-3 py-1">
                                            {event.ticketStatus || "TICKETS VERKRIJGBAAR"}
                                        </Badge>
                                    </span>
                                )}
                            </div>
                        </div>

                        {event.ticketUrl && (
                            <div className="w-full md:w-auto pb-4">
                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full md:w-auto bg-[#e91e63] hover:bg-[#d81b60] text-white font-black text-xl px-10 py-8 rounded-2xl shadow-[0_0_30px_rgba(233,30,99,0.3)] hover:shadow-[0_0_50px_rgba(233,30,99,0.5)] transition-all transform hover:-translate-y-1 active:scale-95"
                                >
                                    <Link href={event.ticketUrl} target="_blank">
                                        <Ticket className="mr-3 scale-125" /> KOOP TICKETS
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Lineup, News, Videos */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Lineup Component */}
                        <EventLineupClient artists={event.lineupArtists || []} />

                        {/* Description / Bio */}
                        {event.description && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    <Badge variant="secondary" className="bg-[#e91e63]/20 text-[#e91e63] p-2 rounded-lg">
                                        <Info className="size-6" />
                                    </Badge>
                                    Over het event
                                </h2>
                                <p className="text-xl text-gray-400 leading-relaxed font-medium bg-white/5 p-8 rounded-2xl border border-white/10 italic">
                                    &ldquo;{event.description}&rdquo;
                                </p>
                            </div>
                        )}

                        {/* Gerelateerd Nieuws */}
                        {relatedNews.length > 0 && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    <Badge variant="secondary" className="bg-[#e91e63]/20 text-[#e91e63] p-2 rounded-lg">
                                        <ChevronRight className="size-6" />
                                    </Badge>
                                    Gerelateerd Nieuws
                                </h2>
                                <div className="grid gap-6">
                                    {relatedNews.map((article) => (
                                        <Link
                                            key={article.id}
                                            href={`/nieuws/${article.id}`}
                                            className="group flex gap-6 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all overflow-hidden"
                                        >
                                            <div className="relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                                                <Image src={getImageUrl(article.featuredImage, "news")} alt={article.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <p className="text-[#e91e63] text-xs font-black uppercase mb-1 tracking-widest">
                                                    <FormattedDate date={article.publishedAt} /> • {article.category}
                                                </p>
                                                <h3 className="text-xl font-bold group-hover:text-[#e91e63] transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Video's */}
                        {relatedVideos.length > 0 && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    <Badge variant="secondary" className="bg-[#e91e63]/20 text-[#e91e63] p-2 rounded-lg">
                                        <Play className="size-6" />
                                    </Badge>
                                    Video&apos;s
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedVideos.map((video) => (
                                        <div key={video.id} className="group relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-black shadow-2xl">
                                            <Image src={video.thumbnailUrl} alt={video.title} fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-16 h-16 rounded-full bg-[#e91e63]/80 backdrop-blur-md flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-all duration-300">
                                                    <Play fill="white" size={32} />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h4 className="text-lg font-black text-white">{video.title}</h4>
                                                <p className="text-[#e91e63] text-sm font-bold uppercase tracking-widest">{video.artistName}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gerelateerde Albums */}
                        {relatedAlbums.length > 0 && (
                            <div className="space-y-8">
                                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                                    <Badge variant="secondary" className="bg-[#e91e63]/20 text-[#e91e63] p-2 rounded-lg">
                                        <Camera className="size-6" />
                                    </Badge>
                                    Gerelateerde Albums
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedAlbums.map((album) => (
                                        <Link href={`/albums/${album.id}`} key={album.id} className="group relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-xl">
                                            <Image src={getImageUrl(album.coverImage, "album")} alt={album.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <h4 className="text-sm font-bold text-white group-hover:text-[#e91e63] transition-colors line-clamp-1">{album.title}</h4>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{album.photoCount} FOTO'S</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Sidebar */}
                    <div className="lg:col-span-4 space-y-10">

                        {/* Details Sidebar (Sticky) */}
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-[#1f202e] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-8 overflow-hidden relative">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#e91e63]/10 blur-[80px] rounded-full"></div>

                                <h3 className="text-2xl font-black text-white">Details</h3>

                                <div className="space-y-2 pb-2">
                                    <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em] mb-3">DEEL DIT EVENT</p>
                                    <SocialShare url={`/events/${event.id}`} title={event.name} />
                                </div>

                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e91e63]">
                                            <Calendar size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">Datum</p>
                                            <p className="text-lg font-bold"><FormattedDate date={event.startDate} options={{ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }} /></p>
                                            {event.endDate && <p className="text-sm text-gray-400">t/m <FormattedDate date={event.endDate} options={{ day: 'numeric', month: 'long', year: 'numeric' }} /></p>}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e91e63]">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">Tijden</p>
                                            <p className="text-lg font-bold">{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {event.endDate ? new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "00:00"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e91e63]">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">Locatie</p>
                                            <p className="text-lg font-bold">{event.venueName}</p>
                                            <p className="text-sm text-gray-400">{event.city}, {event.country}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e91e63]">
                                            <Globe size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-black uppercase tracking-widest mb-1">Land</p>
                                            <p className="text-lg font-bold">{event.country || "België"}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10 pt-4">
                                    {event.ticketUrl && (
                                        <Button asChild className="w-full bg-[#e91e63] hover:bg-[#d81b60] text-white font-black py-7 rounded-2xl text-lg shadow-lg">
                                            <Link href={event.ticketUrl} target="_blank">
                                                <Ticket className="mr-2" /> Tickets kopen
                                            </Link>
                                        </Button>
                                    )}
                                    {event.websiteUrl || event.officialWebsiteUrl && (
                                        <Button asChild variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white font-black py-7 rounded-2xl text-lg">
                                            <Link href={event.websiteUrl || event.officialWebsiteUrl!} target="_blank">
                                                Officiële Website
                                            </Link>
                                        </Button>
                                    )}
                                </div>

                                {/* Map */}
                                {(event.venueName || (event.city && event.address)) && (
                                    <div className="pt-4">
                                        <p className="text-xs text-gray-500 font-black uppercase tracking-[0.2em] mb-4">LOCATIE OP KAART</p>
                                        <div className="w-full h-48 rounded-2xl overflow-hidden grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all border border-white/10 shadow-inner">
                                            <iframe
                                                width="100%"
                                                height="100%"
                                                frameBorder="0"
                                                scrolling="no"
                                                marginHeight={0}
                                                marginWidth={0}
                                                src={`https://maps.google.com/maps?q=${encodeURIComponent(`${event.venueName} ${event.address || ''} ${event.city} ${event.country}`)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                                            ></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Programma Section */}
                            {programEvents.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black text-white">{event.name.split(' - ')[0]}: Programma</h3>
                                    <div className="space-y-3">
                                        {programEvents.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()).map((pEvent) => {
                                            const isActive = pEvent.id === event.id;
                                            const pDate = new Date(pEvent.startDate);
                                            return (
                                                <Link
                                                    key={pEvent.id}
                                                    href={`/events/${pEvent.id}`}
                                                    className={`group block p-5 rounded-2xl border transition-all duration-300 ${isActive
                                                        ? "bg-[#e91e63] border-[#e91e63] shadow-[0_10px_30px_rgba(233,30,99,0.3)]"
                                                        : "bg-white/5 border-white/10 hover:border-white/30"
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-6">
                                                        <div className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center ${isActive ? "bg-white text-[#e91e63]" : "bg-white/10 text-white group-hover:bg-white group-hover:text-[#15171e] transition-colors"}`}>
                                                            <span className="text-lg font-black leading-none">{pDate.getDate()}</span>
                                                            <span className="text-[10px] font-black uppercase tracking-tighter">
                                                                <FormattedDate date={pEvent.startDate} options={{ month: 'short' }} />
                                                            </span>
                                                        </div>
                                                        <div className="flex-grow">
                                                            <h4 className={`font-black tracking-tight leading-tight ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                                                                {pEvent.name.split(' - ')[1] || pEvent.name}
                                                            </h4>
                                                            <p className={`text-xs mt-1 ${isActive ? "text-white/70" : "text-gray-500"}`}>
                                                                {pEvent.lineupArtists?.slice(0, 3).map(a => a.name).join(' • ')}
                                                                {(pEvent.lineupArtists?.length || 0) > 3 && ` +${pEvent.lineupArtists!.length - 3}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Related Events Fallback */}
                            {!event.parentEventId && relatedEvents.length > 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black text-white">Gerelateerde Events</h3>
                                    <div className="grid gap-4">
                                        {relatedEvents.filter(e => e.id !== event.id).slice(0, 3).map((e) => (
                                            <Link key={e.id} href={`/events/${e.id}`} className="group bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-4 items-center hover:bg-white/10">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                                    <Image src={getImageUrl(e.logoUrl || e.logo, "event")} alt={e.name} fill className="object-cover" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h4 className="font-bold text-white group-hover:text-[#e91e63] truncate transition-colors">{e.name}</h4>
                                                    <p className="text-xs text-gray-500 font-bold uppercase"><FormattedDate date={e.startDate} /></p>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}

