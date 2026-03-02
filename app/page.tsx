import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Camera, Flame, ChevronRight, Mail } from "lucide-react";
import { getNews, getAlbums, getEvents, getImageUrl, getHeadlinerAnnouncements } from "@/lib/api";
import { HeadlinerAnnouncements } from "@/components/headliner-announcements";
import { NewsletterForm } from "@/components/newsletter-form";

export default async function HomePage() {
  // Fetch real data in parallel
  const [news, albums, upcomingEvents, headliners] = await Promise.all([
    getNews({ limit: 12 }),
    getAlbums({ limit: 4, recent: true }),
    getEvents({ limit: 6 }),
    getHeadlinerAnnouncements()
  ]);

  // Featured Article Logic: Find first featured or fallback to first article
  const featuredArticle = news.find(a => a.isFeatured) || news[0];
  const sideArticles = news.filter(a => a.id !== featuredArticle?.id).slice(0, 3);
  const mainListArticles = news.filter(a => a.id !== featuredArticle?.id && !sideArticles.find(sa => sa.id === a.id)).slice(0, 6);

  return (
    <main className="bg-[#f5f5fa] min-h-screen font-sans text-[#15171e]">
      {/* Hero Section */}
      <section className="relative bg-[#0a0a0a] text-white overflow-hidden pb-12 pt-8">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#e91e63]/10 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-48 -left-48 w-[30rem] h-[30rem] bg-[#e91e63]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Featured Article - 8 Cols */}
            {featuredArticle && (
              <div className="lg:col-span-8 group relative block h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 bg-[#15171e]">
                <Link href={`/nieuws/${featuredArticle.id}`}>
                  <Image
                    src={getImageUrl(featuredArticle.featuredImage, "news")}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <Badge className="bg-[#e91e63] text-white border-none mb-4 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-lg shadow-[#e91e63]/20">
                      {featuredArticle.category || 'Nieuws'}
                    </Badge>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl font-black leading-[1.1] mb-4 text-white group-hover:text-[#e91e63] transition-colors tracking-tighter uppercase italic">
                      {featuredArticle.title}
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base line-clamp-2 font-medium max-w-xl opacity-80 mb-6 uppercase tracking-wide">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-[#e91e63]">
                      <span>Lees volledig artikel</span>
                      <div className="w-10 h-10 rounded-full border border-[#e91e63]/30 flex items-center justify-center group-hover:bg-[#e91e63] group-hover:text-white transition-all transform group-hover:translate-x-2">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Side Articles - 4 Cols */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="text-[#e91e63]" size={20} />
                <h3 className="font-black text-sm uppercase tracking-[0.3em] text-[#e91e63]">LAATSTE NIEUWS</h3>
              </div>

              <div className="space-y-4">
                {sideArticles.map((article) => (
                  <Link href={`/nieuws/${article.id}`} key={article.id} className="flex bg-white/5 backdrop-blur-md rounded-3xl p-4 gap-4 hover:bg-white/10 transition-all border border-white/5 group h-32">
                    <div className="relative w-24 h-full flex-shrink-0 rounded-2xl overflow-hidden">
                      <Image
                        src={getImageUrl(article.featuredImage, "news")}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="flex flex-col justify-center py-1 overflow-hidden">
                      <Badge className="bg-[#e91e63]/20 text-[#e91e63] border-none text-[8px] px-2 py-0.5 mb-2 uppercase font-black tracking-widest w-fit">
                        {article.category}
                      </Badge>
                      <h4 className="font-black text-white text-sm leading-tight line-clamp-2 group-hover:text-[#e91e63] transition-colors uppercase italic">{article.title}</h4>
                      <div className="mt-2 text-[9px] text-gray-500 font-black uppercase tracking-widest">
                        {new Date(article.publishedAt).toLocaleDateString('nl-NL', { day: '2-digit', month: 'short' })}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Headliner Announcements */}
      <HeadlinerAnnouncements announcements={headliners} />


      {/* Recente Foto Albums Section */}
      <section className="bg-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#e91e63 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-[#15171e] mb-2 flex items-center gap-3 uppercase italic tracking-tighter">
                <Camera className="text-[#e91e63]" size={28} /> Recente <span className="text-[#e91e63]">Foto's</span>
              </h2>
              <div className="h-1 w-16 bg-[#e91e63] rounded-full"></div>
            </div>
            <Link href="/albums" className="group flex items-center gap-2 text-sm font-black text-[#e91e63] uppercase tracking-widest hover:translate-x-1 transition-transform">
              BEKIJK ALLES <div className="w-8 h-8 rounded-full bg-[#f5f5fa] flex items-center justify-center group-hover:bg-[#e91e63] group-hover:text-white transition-all"><ChevronRight size={16} /></div>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {albums.map((album) => (
              <Link href={`/albums/${album.id}`} key={album.id} className="group relative">
                <div className="relative h-80 rounded-[2rem] overflow-hidden shadow-2xl mb-4 bg-gray-100 border border-gray-100">
                  <Image
                    src={getImageUrl(album.featuredPhoto?.url || album.coverImage, "album")}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>

                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                    {new Date(album.createdAt || '').toLocaleDateString('nl-NL', { month: 'short', year: 'numeric' })}
                  </div>

                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-widest mb-1">
                      <Camera size={12} className="text-[#e91e63]" /> {album.photoCount} FOTO'S
                    </div>
                    <h3 className="font-black text-xl text-white leading-tight group-hover:text-[#e91e63] transition-colors uppercase italic truncate">
                      {album.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Button variant="ghost" className="text-[#e91e63] hover:text-[#c2185b] font-bold w-full mt-6 md:hidden" asChild>
            <Link href="/albums">BEKIJK ALLE FOTO'S <ChevronRight className="ml-1" size={16} /></Link>
          </Button>
        </div>
      </section>

      {/* Main Content Grid: News + Agenda */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left Column: Latest News List */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-12 border-b border-gray-100 pb-6">
              <h2 className="text-2xl font-black text-[#15171e] uppercase italic tracking-tighter">Laatste Nieuws</h2>
              <div className="h-1 w-10 bg-[#e91e63] rounded-full"></div>
            </div>

            <div className="space-y-8">
              {mainListArticles.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-6 border border-gray-100 group">
                  <div className="relative w-full md:w-64 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={getImageUrl(article.featuredImage, "news")}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-3 left-3 bg-[#e91e63] border-none text-[10px] uppercase tracking-wide">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wide mb-2">
                        <Calendar size={12} className="text-[#e91e63]" /> {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                      <Link href={`/nieuws/${article.id}`}>
                        <h3 className="text-xl font-bold text-[#15171e] mb-3 leading-snug group-hover:text-[#e91e63] transition-colors">
                          {article.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 text-sm line-clamp-2 md:line-clamp-3 leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>
                    <Link href={`/nieuws/${article.id}`} className="mt-4 inline-flex items-center text-xs font-black text-[#e91e63] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                      LEES ARTIKEL <ArrowRight size={12} className="ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button size="lg" className="bg-[#15171e] text-white hover:bg-[#e91e63] px-8 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1" asChild>
                <Link href="/nieuws">MEER NIEUWS LADEN</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Upcoming Events Widget / Agenda */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#e91e63]/5 rounded-full blur-2xl"></div>

              <div className="flex justify-between items-center mb-10 relative z-10">
                <h3 className="font-black text-xl text-[#15171e] flex items-center gap-3 uppercase italic tracking-tighter">
                  <Calendar size={24} className="text-[#e91e63]" /> AGENDA
                </h3>
                <Link href="/events" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#e91e63] hover:bg-[#e91e63] hover:text-white transition-all shadow-sm">
                  <ChevronRight size={20} />
                </Link>
              </div>

              <div className="space-y-6 relative z-10">
                {upcomingEvents.map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id} className="flex gap-5 group items-center py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 -mx-4 px-4 rounded-2xl transition-all">
                    <div className="bg-[#e91e63] text-white w-16 h-16 rounded-2xl flex flex-col items-center justify-center flex-shrink-0 shadow-lg shadow-[#e91e63]/20 group-hover:scale-105 transition-transform leading-none">
                      <span className="text-2xl font-black">{new Date(event.startDate).getDate()}</span>
                      <span className="text-[10px] font-black uppercase mt-1">{new Date(event.startDate).toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '').toUpperCase()}</span>
                    </div>
                    <div className="overflow-hidden flex-grow">
                      <h4 className="font-black text-[#15171e] text-base leading-tight truncate group-hover:text-[#e91e63] transition-colors uppercase italic">{event.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1 truncate">{event.venueName}, {event.city}</p>
                      <div className="mt-2 text-[10px] font-black text-[#e91e63] uppercase tracking-widest flex items-center gap-1">
                        {event.ticketStatus === "SOLD_OUT" ? "UITVERKOCHT" : "TICKETS VERKRIJGBAAR"} <ArrowRight size={10} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <NewsletterForm />

          </aside>
        </div>
      </section>
    </main>
  );
}
