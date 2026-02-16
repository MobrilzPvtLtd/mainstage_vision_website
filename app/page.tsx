import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Camera, Flame, ChevronRight, Mail } from "lucide-react";
import { getNews, getAlbums, getEvents, getImageUrl } from "@/lib/api";

export default async function HomePage() {
  // Fetch real data in parallel
  const [news, albums, upcomingEvents] = await Promise.all([
    getNews({ limit: 10 }),
    getAlbums({ limit: 4, recent: true }),
    getEvents({ limit: 5 })
  ]);

  // Featured Article Logic: Find first featured or fallback to first article
  const featuredArticle = news.find(a => a.isFeatured) || news[0];
  const sideArticles = news.filter(a => a.id !== featuredArticle?.id).slice(0, 3);
  const mainListArticles = news.filter(a => a.id !== featuredArticle?.id && !sideArticles.find(sa => sa.id === a.id)).slice(0, 5);

  return (
    <main className="bg-[#f5f5fa] min-h-screen font-sans text-[#15171e]">
      {/* Hero Section */}
      <section className="relative bg-[#15171e] text-white overflow-hidden pb-12 pt-8">
        {/* Background Patterns */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#e91e63]/10 to-transparent pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#e91e63]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Featured Article - 8 Cols */}
            {featuredArticle && (
              <div className="lg:col-span-8 group relative block h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Link href={`/nieuws/${featuredArticle.id}`}>
                  <Image
                    src={getImageUrl(featuredArticle.featuredImage, "news")}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] text-white border-none mb-4 text-sm font-bold uppercase tracking-wide px-3 py-1">
                      {featuredArticle.category || 'Nieuws'}
                    </Badge>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 text-white group-hover:text-[#e91e63] transition-colors drop-shadow-lg">
                      {featuredArticle.title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl line-clamp-2 font-medium max-w-2xl text-shadow-sm">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gray-300">
                      <span className="text-[#e91e63]">Lees volledig artikel</span> <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Side Articles - 4 Cols */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-1 bg-[#e91e63] rounded-full"></div>
                <h3 className="font-bold text-sm uppercase tracking-widest text-[#e91e63]">Net Binnen</h3>
              </div>

              {sideArticles.map((article) => (
                <Link href={`/nieuws/${article.id}`} key={article.id} className="flex-1 bg-[#1e212b] rounded-xl p-4 flex gap-4 hover:bg-[#252836] transition-all border border-white/5 hover:border-[#e91e63]/30 group">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(article.featuredImage, "news")}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <Badge className="bg-[#e91e63]/20 text-[#e91e63] hover:bg-[#e91e63]/30 border-none text-[10px] px-1.5 py-0.5 mb-1.5 uppercase tracking-wide">
                        {article.category}
                      </Badge>
                      <h4 className="font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#e91e63] transition-colors">{article.title}</h4>
                    </div>
                    <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 text-[#e91e63]" /> {new Date(article.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recente Foto Albums Section */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-[#15171e] mb-2 flex items-center gap-3">
                <Camera className="text-[#e91e63]" /> Recente <span className="text-[#e91e63]">Foto's</span>
              </h2>
              <p className="text-gray-500 font-medium">Beleef de sfeer van de laatste events opnieuw</p>
            </div>
            <Button variant="ghost" className="text-[#e91e63] hover:text-[#c2185b] font-bold hidden md:flex" asChild>
              <Link href="/albums">BEKIJK ALLES <ChevronRight className="ml-1" size={16} /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
              <Link href={`/albums/${album.id}`} key={album.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mb-3 bg-gray-100">
                  <Image
                    src={getImageUrl(album.featuredPhoto?.url || album.coverImage, "album")}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    <Camera size={12} /> {album.photoCount}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-[#15171e] leading-tight group-hover:text-[#e91e63] transition-colors">
                  {album.title}
                </h3>
                <p className="text-xs text-gray-500 uppercase font-bold mt-1 tracking-wide">
                  {album.eventName}
                </p>
              </Link>
            ))}
          </div>
          <Button variant="ghost" className="text-[#e91e63] hover:text-[#c2185b] font-bold w-full mt-6 md:hidden" asChild>
            <Link href="/albums">BEKIJK ALLE FOTO'S <ChevronRight className="ml-1" size={16} /></Link>
          </Button>
        </div>
      </section>

      {/* Main Content Grid: News + Sidebar */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Latest News List */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-8 border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-black text-[#15171e] uppercase tracking-dense">Laatste Nieuws</h2>
              <div className="flex-grow"></div>
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
            {/* Upcoming Events Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg text-[#15171e] flex items-center gap-2">
                  <Calendar size={20} className="text-[#e91e63]" /> AGENDA
                </h3>
                <Link href="/events" className="text-xs font-bold text-[#e91e63] hover:underline">ALLE EVENTS</Link>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex gap-4 group cursor-pointer hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                    <div className="bg-[#15171e] text-white w-14 h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0 group-hover:bg-[#e91e63] transition-colors leading-none shadow-md">
                      <span className="text-xl font-black">{new Date(event.startDate).getDate()}</span>
                      <span className="text-[10px] font-bold uppercase">{new Date(event.startDate).toLocaleDateString('nl-NL', { month: 'short' }).replace('.', '')}</span>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-[#15171e] text-sm truncate group-hover:text-[#e91e63] transition-colors">{event.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{event.venueName}, {event.city}</p>
                      <div className="mt-1 flex gap-1">
                        {event.ticketStatus === "SOLD_OUT" ? (
                          <span className="text-[9px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded">UITVERKOCHT</span>
                        ) : (
                          <span className="text-[9px] font-bold text-[#e91e63] border border-[#e91e63] px-1.5 py-0.5 rounded">TICKETS</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-[#15171e] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e91e63] rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>

              <Mail className="text-[#e91e63] mb-4" size={32} />
              <h3 className="font-black text-2xl mb-2">Stay Tuned!</h3>
              <p className="text-gray-400 text-sm mb-6">Ontvang wekelijks de beste updates, exclusieve interviews en winacties in je mailbox.</p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Je e-mailadres"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#e91e63] transition-colors"
                />
                <Button className="w-full bg-[#e91e63] hover:bg-[#c2185b] font-bold">
                  INSCHRIJVEN
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
