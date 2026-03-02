import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#15171e] text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Description */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-black uppercase italic tracking-tighter inline-block">
                            <span className="text-white">MainStage</span>
                            <span className="text-[#e91e63]">Vision</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed font-bold uppercase tracking-wide opacity-60">
                            HET LAATSTE NIEUWS UIT DE MUZIEKWERELD, LIVE CONCERTFOTO'S EN EEN COMPLEET OVERZICHT VAN ALLE EVENTS.
                        </p>
                    </div>

                    {/* Newsletter / Nieuwsbrief */}
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase italic tracking-tighter text-white">Nieuwsbrief</h4>
                        <p className="text-gray-400 text-xs mb-4 font-bold uppercase tracking-widest opacity-60">BLIJF OP DE HOOGTE!</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="E-mailadres..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e91e63] transition-all font-bold placeholder:opacity-30"
                            />
                            <button className="mt-3 w-full bg-[#e91e63] hover:bg-white hover:text-[#e91e63] text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-[#e91e63]/20 uppercase text-xs tracking-widest">
                                Inschrijven
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase italic tracking-tighter text-white">Navigatie</h4>
                        <ul className="space-y-3">
                            {['Home', 'Nieuws', 'Foto Albums', 'Video\'s', 'Events', 'Recensies', 'Artiesten'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(' ', '-').replace('\'', '').replace('ë', 'e')}`}
                                        className="text-gray-400 hover:text-[#e91e63] transition-colors text-xs font-black uppercase tracking-widest"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div>
                        <h4 className="text-lg font-black mb-6 uppercase italic tracking-tighter text-white">Info</h4>
                        <ul className="space-y-3">
                            <li><Link href="/over-ons" className="text-gray-400 hover:text-[#e91e63] transition-colors text-xs font-black uppercase tracking-widest">Over ons</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-[#e91e63] transition-colors text-xs font-black uppercase tracking-widest">Contact</Link></li>
                            <li><Link href="/privacy-policy" className="text-gray-400 hover:text-[#e91e63] transition-colors text-xs font-black uppercase tracking-widest">Privacybeleid</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-12 pt-8 border-t border-gray-800 text-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} MainStage Vision. Alle rechten
                        voorbehouden.
                    </p>
                </div>
            </div>
        </footer>
    );
}
