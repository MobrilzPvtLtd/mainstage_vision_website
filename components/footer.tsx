import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#15171e] text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Description */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            <span className="text-white">MainStage</span>
                            <span className="text-[#e91e63]">Vision</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Het laatste nieuws uit de muziekwereld, live concertfoto's en een
                            compleet overzicht van alle events.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 uppercase">Navigatie</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/nieuws"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Nieuws
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/albums"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Foto Albums
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/videos"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Video's
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/events"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/artiesten"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Artiesten
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4 uppercase">Info</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/over-ons"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Over ons
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-400 hover:text-[#e91e63] transition-colors text-sm"
                                >
                                    Contact
                                </Link>
                            </li>
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
