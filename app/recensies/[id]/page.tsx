import { getReview, getReviews, getImageUrl } from "@/lib/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormattedDate } from "@/components/formatted-date";
import { Star, Calendar, User, ArrowLeft, ChevronRight } from "lucide-react";
import { SocialShare } from "@/components/social-share";

export default async function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const review = await getReview(id);

    if (!review) {
        notFound();
    }

    // Fetch related reviews for sidebar
    const allReviews = await getReviews({ limit: 5 });
    const otherReviews = allReviews.filter(r => r.id !== review.id).slice(0, 4);

    // Star Rating Component
    const RatingStars = ({ rating }: { rating: number }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={20}
                        className={star <= rating ? "fill-[#e91e63] text-[#e91e63]" : "text-gray-600"}
                    />
                ))}
            </div>
        );
    };

    return (
        <main className="bg-[#0d0e14] min-h-screen pb-20 text-white">
            {/* Hero Section */}
            <section className="relative h-[65vh] min-h-[550px] w-full bg-[#15171e] overflow-hidden">
                <Image
                    src={getImageUrl(review.featuredImage, "news")}
                    alt={review.title}
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0e14] via-[#0d0e14]/40 to-transparent"></div>

                <div className="absolute inset-0 container mx-auto px-6 flex flex-col justify-end pb-16">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Badge className="bg-[#e91e63] text-white border-none text-xs font-black uppercase tracking-[2px] px-4 py-1.5 rounded-full">
                                EVENT RECENSIE
                            </Badge>
                            <RatingStars rating={review.rating} />
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 drop-shadow-2xl">
                            {review.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-gray-400 text-sm font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-2.5">
                                <Calendar size={18} className="text-[#e91e63]" /> <FormattedDate date={review.publishDate} />
                            </span>
                            <span className="flex items-center gap-2.5">
                                <User size={18} className="text-[#e91e63]" /> Redactie
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div className="mb-12">
                            <p className="text-2xl md:text-3xl font-black text-white leading-relaxed mb-8 border-l-[6px] border-[#e91e63] pl-8 py-2">
                                {review.summary}
                            </p>
                        </div>

                        <div
                            className="prose prose-xl prose-invert max-w-none 
                            prose-headings:font-black prose-headings:text-white prose-headings:tracking-tight
                            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-8
                            prose-a:text-[#e91e63] prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
                            prose-strong:text-white prose-strong:font-black"
                            dangerouslySetInnerHTML={{ __html: review.content || "<p>Geen inhoud beschikbaar.</p>" }}
                        />

                        {/* Footer / Share */}
                        <div className="mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                            <Link href="/recensies" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Terug naar overzicht
                            </Link>

                            <div className="flex items-center gap-6">
                                <span className="font-bold text-gray-500 text-xs uppercase tracking-widest">Deel deze recensie:</span>
                                <SocialShare url={`/recensies/${review.id}`} title={review.title} />
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* More Reviews Widget */}
                        <div className="bg-[#15171e] border border-white/5 p-8 rounded-[32px] sticky top-28">
                            <h3 className="font-black text-xl text-white uppercase tracking-wider mb-8 flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-[#e91e63] rounded-full"></div>
                                Meer Recensies
                            </h3>

                            <div className="space-y-8">
                                {otherReviews.map((item) => (
                                    <Link href={`/recensies/${item.id}`} key={item.id} className="flex gap-5 group">
                                        <div className="relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg">
                                            <Image
                                                src={getImageUrl(item.featuredImage, "news")}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className="flex gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((s) => (
                                                        <Star key={s} size={10} className={s <= item.rating ? "fill-[#e91e63] text-[#e91e63]" : "text-gray-700"} />
                                                    ))}
                                                </div>
                                            </div>
                                            <h4 className="font-bold text-white text-base leading-snug group-hover:text-[#e91e63] transition-colors line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Button className="w-full mt-10 bg-white/5 hover:bg-[#e91e63] text-white border-none py-6 rounded-2xl font-black tracking-widest text-xs uppercase transition-all" asChild>
                                <Link href="/recensies">BEKIJK ALLE RECENSIES</Link>
                            </Button>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}
