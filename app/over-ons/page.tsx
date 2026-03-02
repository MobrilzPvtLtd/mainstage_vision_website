import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, Mail, Heart, Rocket, Target } from "lucide-react";
import Image from "next/image";

export default function OverOnsPage() {
    return (
        <main className="bg-[#f5f5fa] min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-[#15171e] text-white py-24 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#e91e63]/10 to-transparent pointer-events-none"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] text-white border-none mb-6">OVER ONS</Badge>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">De visie achter <span className="text-[#e91e63]">MainStage</span></h1>
                    <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Wij brengen de energie van live concerten en festivals rechtstreeks naar jouw scherm.
                        Ontdek het laatste nieuws, beleef de sfeer via onze exclusieve fotoalbums en video's,
                        en blijf op de hoogte van alle belangrijke events.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#e91e63]/10 rounded-2xl flex items-center justify-center text-[#e91e63] mb-8 group-hover:bg-[#e91e63] group-hover:text-white transition-colors">
                            <Target size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-[#15171e] mb-4">Onze Missie</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Het verbinden van muziekliefhebbers met hun favoriete artiesten door middel van hoogwaardige journalistiek en adembenemende visuele content.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#e91e63]/10 rounded-2xl flex items-center justify-center text-[#e91e63] mb-8 group-hover:bg-[#e91e63] group-hover:text-white transition-colors">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-[#15171e] mb-4">Onze Passie</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Muziek stroomt door onze aderen. Elk lid van ons team deelt een diepe liefde voor de live-ervaring, van intieme clubshows tot massale festivals.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#e91e63]/10 rounded-2xl flex items-center justify-center text-[#e91e63] mb-8 group-hover:bg-[#e91e63] group-hover:text-white transition-colors">
                            <Rocket size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-[#15171e] mb-4">Onze Toekomst</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            We blijven innoveren met nieuwe tools voor LLMs en sitemaps, zodat onze content overal en altijd toegankelijk is voor iedereen.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Stats Section */}
            <section className="bg-white py-24 border-y border-gray-100">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        <div>
                            <div className="text-5xl font-black text-[#15171e] mb-2">100+</div>
                            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Events Jaarlijks</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-[#e91e63] mb-2">10k+</div>
                            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Exclusieve Foto's</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-[#15171e] mb-2">500+</div>
                            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Artiesten Catalogus</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black text-[#e91e63] mb-2">24/7</div>
                            <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Muziek Updates</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
