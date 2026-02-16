import { getArticle, getNews, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FormattedDate } from "@/components/formatted-date";
import {
    Calendar,
    User,
    Share2,
    ArrowRight,
    Clock,
    Facebook,
    Twitter,
    Linkedin
} from "lucide-react";

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
        notFound();
    }

    // Fetch recent news for sidebar
    const recentNews = await getNews({ limit: 5 });
    const relatedNews = recentNews.filter(n => n.id !== article.id).slice(0, 4);

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] w-full bg-[#15171e] overflow-hidden">
                <Image
                    src={getImageUrl(article.featuredImage)}
                    alt={article.title}
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-transparent"></div>

                <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-12">
                    <div className="max-w-4xl">
                        <Badge className="bg-[#e91e63] text-white border-none mb-6 text-sm font-bold uppercase tracking-wide px-3 py-1">
                            {article.category}
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 shadow-xl drop-shadow-lg">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm font-bold uppercase tracking-wide">
                            <span className="flex items-center gap-2">
                                <Calendar size={16} className="text-[#e91e63]" /> <FormattedDate date={article.publishedAt} />
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock size={16} className="text-[#e91e63]" /> {article.readTime || 3} MIN LEZEN
                            </span>
                            <span className="flex items-center gap-2">
                                <User size={16} className="text-[#e91e63]" /> {
                                    typeof article.author === 'string'
                                        ? article.author
                                        : (article.author as any)?.firstName
                                            ? `${(article.author as any).firstName} ${(article.author as any).lastName}`
                                            : "Redactie"
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <p className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed border-l-4 border-[#e91e63] pl-6 italic">
                            {article.excerpt}
                        </p>

                        <div
                            className="prose prose-lg prose-gray max-w-none prose-headings:font-black prose-headings:text-[#15171e] prose-a:text-[#e91e63] prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: article.content || "<p>Geen inhoud beschikbaar.</p>" }}
                        />

                        {/* Tags & Share */}
                        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex gap-2">
                                <Badge variant="outline" className="text-gray-500 border-gray-200">#{article.category}</Badge>
                                <Badge variant="outline" className="text-gray-500 border-gray-200">#MainStage</Badge>
                                <Badge variant="outline" className="text-gray-500 border-gray-200">#Music</Badge>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="font-bold text-gray-900 text-sm uppercase">Delen:</span>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="rounded-full text-blue-600 border-blue-100 hover:bg-blue-50">
                                        <Facebook size={18} />
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full text-sky-500 border-sky-100 hover:bg-sky-50">
                                        <Twitter size={18} />
                                    </Button>
                                    <Button size="icon" variant="outline" className="rounded-full text-blue-700 border-blue-100 hover:bg-blue-50">
                                        <Linkedin size={18} />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 bg-gray-50 p-8 rounded-2xl flex items-center gap-6 border border-gray-100">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl uppercase">
                                {typeof article.author === 'string' ? article.author[0] : ((article.author as any)?.firstName?.[0] || "M")}
                            </div>
                            <div>
                                <h4 className="font-bold text-[#15171e] text-lg">
                                    {typeof article.author === 'string'
                                        ? article.author
                                        : (article.author as any)?.firstName
                                            ? `${(article.author as any).firstName} ${(article.author as any).lastName}`
                                            : "MainStage Redactie"}
                                </h4>
                                <p className="text-gray-500 text-sm">Muziekjournalist en festival liefhebber.</p>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-10">
                        {/* Popular/Recent News Widget */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-black text-lg text-[#15171e] uppercase tracking-wide border-l-4 border-[#e91e63] pl-3">
                                    Meer Nieuws
                                </h3>
                            </div>

                            <div className="space-y-6">
                                {relatedNews.map((item) => (
                                    <Link href={`/nieuws/${item.id}`} key={item.id} className="flex gap-4 group">
                                        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                                            <Image
                                                src={getImageUrl(item.featuredImage)}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">
                                                <span className="text-[#e91e63]">{item.category}</span> • <FormattedDate date={item.publishedAt} />
                                            </div>
                                            <h4 className="font-bold text-[#15171e] text-sm leading-snug group-hover:text-[#e91e63] transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Button variant="outline" className="w-full mt-8 border-gray-200 hover:border-[#e91e63] hover:text-[#e91e63] font-bold" asChild>
                                <Link href="/nieuws">BEKIJK ALLES</Link>
                            </Button>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
