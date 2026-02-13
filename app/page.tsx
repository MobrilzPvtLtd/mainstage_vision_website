"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Keeping import, might use later or standard button
import {
  Calendar,
  ArrowRight,
  Camera,
  Flame,
  ChevronRight,
  Mail,
} from "lucide-react";
import {
  newsArticles,
  photoAlbums,
  events,
  getMostPopularNews,
  getUpcomingEvents,
} from "@/lib/data";

export default function HomePage() {
  // Get data using our helper functions
  // Ensure we have data even if imports fail in edge cases
  const articles = newsArticles || [];
  const albums = photoAlbums || [];

  const featuredArticle = articles.find((a) => a.featured) || articles[0];
  const sideNews = articles.filter((a) => a.id !== featuredArticle?.id).slice(0, 4);
  const recentAlbums = albums.slice(0, 4);
  const popularNews = getMostPopularNews(5);
  const nextEvents = getUpcomingEvents(5);
  const latestNewsGrid = articles.filter(a => a.id !== featuredArticle?.id).slice(0, 6);

  return (
    <main className="bg-[#f5f5fa] min-h-screen font-sans text-[#15171e]">
      {/* Hero Section */}
      <section className="relative bg-[#15171e] text-white overflow-hidden pb-12 pt-8">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Hero Article */}
            {featuredArticle && (
              <div className="lg:col-span-2 relative group cursor-pointer h-full">
                <Link href={`/nieuws/${featuredArticle.id}`} className="block h-full">
                  <div className="relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                    <Image
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                      <Badge className="bg-[#e91e63] hover:bg-[#d81557] text-white border-none mb-4 text-sm font-bold px-3 py-1 uppercase tracking-wide">
                        {featuredArticle.category}
                      </Badge>
                      <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-white group-hover:text-[#e91e63] transition-colors">
                        {featuredArticle.title}
                      </h1>
                      <p className="text-gray-300 text-base md:text-lg line-clamp-2 max-w-2xl mb-4 hidden md:block">
                        {featuredArticle.excerpt}
                      </p>
                      <span className="text-gray-400 text-sm font-medium flex items-center gap-2">
                        <Calendar size={16} className="text-[#e91e63]" /> {featuredArticle.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Side News List - "Net Binnen" style */}
            <div className="flex flex-col h-full">
              <div className="bg-[#1e212b] rounded-2xl p-6 border border-gray-800 h-full">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-[#e91e63] rounded-full block"></span>
                  LAATSTE NIEUWS
                </h3>
                <div className="flex flex-col gap-6">
                  {sideNews.map((article) => (
                    <Link key={article.id} href={`/nieuws/${article.id}`} className="group flex gap-4 items-start">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col justify-between h-full">
                        <span className="text-[10px] uppercase font-bold text-[#e91e63] tracking-wider mb-1">
                          {article.category}
                        </span>
                        <h4 className="text-white text-sm font-bold leading-snug line-clamp-2 group-hover:text-[#e91e63] transition-colors">
                          {article.title}
                        </h4>
                        <span className="text-[11px] text-gray-500 mt-2 flex items-center gap-1">
                          <Calendar size={10} /> {article.date}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/nieuws" className="block text-center mt-6 py-3 bg-[#252836] hover:bg-[#2d3142] rounded-xl text-sm font-bold transition-colors">
                  BEKIJK ALLE ARTIKELS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recente Foto Albums Section - White Background */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-[#15171e] uppercase tracking-tight flex items-center gap-3">
                <Camera className="text-[#e91e63]" size={32} />
                Recente <span className="text-[#e91e63]">Foto Albums</span>
              </h2>
              <div className="h-1.5 w-24 bg-[#e91e63] rounded-full mt-4"></div>
            </div>
            <Link href="/albums" className="text-[#15171e] font-bold hover:text-[#e91e63] flex items-center gap-2 transition-colors border-b-2 border-transparent hover:border-[#e91e63] pb-1">
              ALLE ALBUMS BEKIJKEN <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentAlbums.map((album) => (
              <Link key={album.id} href={`/albums/${album.id}`} className="group block h-full">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mb-4 bg-gray-100">
                  <Image
                    src={album.coverImage}
                    alt={album.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>

                  {/* Photo Count Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 border border-white/10">
                    <Camera size={14} className="text-[#e91e63]" /> {album.photoCount}
                  </div>

                  <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                    <span className="bg-[#e91e63] text-[10px] font-bold px-2 py-1 rounded mb-2 inline-block shadow-md">
                      {album.date.split("-")[0]}
                    </span>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-[#e91e63] transition-colors mb-1">
                      {album.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-medium tracking-wide uppercase">{album.event}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid: News + Sidebar */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Latest News Grid (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-extrabold text-[#15171e] uppercase tracking-tight flex items-center gap-3">
                <span className="w-1.5 h-8 bg-[#e91e63] block"></span>
                LAATSTE <span className="text-[#e91e63]">NIEUWS</span>
              </h2>
              <Link href="/nieuws" className="text-xs font-bold text-gray-500 hover:text-[#e91e63] uppercase tracking-wider border border-gray-300 px-4 py-2 rounded-full hover:border-[#e91e63] transition-all">
                Bekijk archief
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestNewsGrid.map((article) => (
                <article key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-[#15171e] text-white border-none text-[10px] px-2 py-1 uppercase tracking-wide">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 mb-3 flex items-center gap-2 font-medium">
                      <Calendar size={14} className="text-[#e91e63]" /> {article.date}
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      {article.views} views
                    </div>
                    <Link href={`/nieuws/${article.id}`}>
                      <h3 className="text-xl font-bold text-[#15171e] mb-3 leading-snug group-hover:text-[#e91e63] transition-colors">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>
                    <Link href={`/nieuws/${article.id}`} className="inline-flex items-center text-xs font-black text-[#e91e63] uppercase tracking-wider group-hover:underline">
                      LEES ARTIKEL <ChevronRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination / More Button */}
            <div className="mt-12 text-center">
              <Link href="/nieuws">
                <Button size="lg" className="bg-[#15171e] hover:bg-[#e91e63] text-white rounded-full px-8 font-bold transition-all transform hover:-translate-y-1">
                  MEER NIEUWS LADEN
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-10">

            {/* Populaire Artikels Widget */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-extrabold text-[#15171e] mb-6 flex items-center gap-2 pb-4 border-b border-gray-100">
                <Flame className="text-[#e91e63]" size={20} /> POPULAIR NU
              </h3>
              <div className="space-y-0">
                {popularNews.map((article, index) => (
                  <Link key={article.id} href={`/nieuws/${article.id}`} className="group flex gap-4 items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors -mx-2 px-2 rounded-lg">
                    <span className="text-3xl font-black text-gray-200 group-hover:text-[#e91e63] transition-colors w-8 text-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-[#15171e] text-sm leading-snug group-hover:text-[#e91e63] transition-colors mb-1 line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Upcoming Events Widget */}
            <div className="bg-[#15171e] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#e91e63] opacity-20 blur-3xl rounded-full pointer-events-none"></div>

              <h3 className="text-lg font-extrabold mb-6 flex items-center gap-2 pb-4 border-b border-gray-700 relative z-10">
                <Calendar className="text-[#e91e63]" size={20} /> EVENTS
              </h3>
              <div className="space-y-4 relative z-10">
                {nextEvents.map((event) => (
                  <Link key={event.id} href={`/events/${event.id}`} className="group flex gap-4 items-center bg-[#1e212b] p-3 rounded-xl hover:bg-[#252836] transition-colors border border-gray-800 hover:border-gray-700">
                    <div className="bg-[#e91e63] w-14 h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0 leading-none shadow-lg">
                      <span className="text-[10px] font-bold opacity-90 mb-0.5">
                        {new Date(event.date).toLocaleDateString('nl-NL', { month: 'short' }).toUpperCase().replace('.', '')}
                      </span>
                      <span className="text-xl font-black">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="font-bold text-sm truncate group-hover:text-[#e91e63] transition-colors">
                        {event.title}
                      </h4>
                      <span className="text-xs text-gray-400 truncate block mt-0.5">
                        {event.location}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href="/events" className="block text-center mt-6 text-xs font-bold hover:text-[#e91e63] transition-colors uppercase tracking-widest relative z-10">
                BEKIJK ALLE EVENTS
              </Link>
            </div>

            {/* Social / Newsletter Widget */}
            <div className="bg-gradient-to-br from-[#e91e63] to-[#c2185b] p-8 rounded-2xl shadow-lg text-center text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-pattern.svg')] opacity-10"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Mail size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-extrabold mb-2">MIS NIKS!</h3>
                <p className="opacity-90 mb-6 text-sm leading-relaxed">
                  Elke week het laatste nieuws, de vetste foto's en de beste event tips in je inbox.
                </p>
                <form className="space-y-2">
                  <input
                    type="email"
                    placeholder="Jouw email adres"
                    className="w-full px-4 py-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-4 focus:ring-white/30 placeholder:text-gray-400"
                  />
                  <button className="w-full bg-[#15171e] text-white font-bold py-3 rounded-lg hover:bg-[#0f1116] transition-colors uppercase text-xs tracking-widest shadow-lg">
                    Inschrijven
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
