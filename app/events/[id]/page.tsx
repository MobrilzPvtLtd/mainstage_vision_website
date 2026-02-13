"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Ticket, Info, Users, Music } from "lucide-react";
import { events } from "@/lib/data";
import { notFound } from "next/navigation";

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const event = events.find((e) => e.id === parseInt(id));

    if (!event) {
        notFound();
    }

    return (
        <main className="bg-white min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] w-full bg-[#15171e] overflow-hidden">
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover opacity-60 blur-sm scale-105"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-black/50 to-transparent"></div>

                <div className="absolute inset-0 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-end">
                        {/* Date Block */}
                        <div className="bg-white text-[#15171e] p-6 rounded-2xl shadow-2xl text-center min-w-[120px] hidden md:block rotate-3 transform hover:rotate-0 transition-transform duration-300">
                            <span className="block text-xl font-bold uppercase tracking-wider text-gray-400 mb-1">
                                {new Date(event.date).toLocaleDateString("nl-NL", { month: "short" })}
                            </span>
                            <span className="block text-6xl font-black text-[#e91e63] leading-none mb-1">
                                {new Date(event.date).getDate()}
                            </span>
                            <span className="block text-lg font-bold text-gray-800">
                                {new Date(event.date).getFullYear()}
                            </span>
                        </div>

                        <div className="flex-grow">
                            <Badge className="bg-[#e91e63] text-white border-none mb-4 text-sm font-bold uppercase tracking-wide px-3 py-1">
                                {event.type}
                            </Badge>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 shadow-xl drop-shadow-lg">
                                {event.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-gray-200 text-lg font-medium">
                                <span className="flex items-center gap-2">
                                    <MapPin size={20} className="text-[#e91e63]" /> {event.location}, {event.venue}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Ticket size={20} className="text-[#e91e63]" /> {event.ticketStatus.replace("_", " ")}
                                </span>
                            </div>
                        </div>

                        <div className="w-full md:w-auto">
                            <Button size="lg" className="w-full md:w-auto bg-[#e91e63] hover:bg-[#c2185b] text-white font-bold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Ticket className="mr-3" /> KOOP TICKETS
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-[#15171e] mb-6 flex items-center gap-3">
                                <Info className="text-[#e91e63]" /> Over dit event
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                {event.description}
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>

                        {/* Lineup Placeholder */}
                        <div>
                            <h2 className="text-3xl font-bold text-[#15171e] mb-6 flex items-center gap-3">
                                <Music className="text-[#e91e63]" /> Line-up
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {["Main Stage", "Techno Tent", "Hardstyle Arena"].map((stage) => (
                                    <div key={stage} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <h4 className="font-bold text-[#e91e63] mb-4 uppercase text-sm tracking-wide">{stage}</h4>
                                        <ul className="space-y-2 text-gray-700 font-medium">
                                            <li>• Headliner Act</li>
                                            <li>• Special Guest</li>
                                            <li>• Support Act 1</li>
                                            <li>• Support Act 2</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Details */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
                            <h3 className="text-xl font-bold text-[#15171e] mb-6">Details</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <Calendar className="text-[#e91e63] mt-1" size={20} />
                                    <div>
                                        <p className="font-bold text-gray-900">Datum</p>
                                        <p className="text-gray-600">{new Date(event.date).toLocaleDateString("nl-NL", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        {event.endDate && <p className="text-gray-500 text-sm">t/m {new Date(event.endDate).toLocaleDateString("nl-NL", { day: 'numeric', month: 'long' })}</p>}
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Clock className="text-[#e91e63] mt-1" size={20} />
                                    <div>
                                        <p className="font-bold text-gray-900">Tijden</p>
                                        <p className="text-gray-600">{event.time} - 01:00</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <MapPin className="text-[#e91e63] mt-1" size={20} />
                                    <div>
                                        <p className="font-bold text-gray-900">Locatie</p>
                                        <p className="text-gray-600">{event.venue}</p>
                                        <p className="text-gray-500 text-sm">{event.location}, {event.province}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Users className="text-[#e91e63] mt-1" size={20} />
                                    <div>
                                        <p className="font-bold text-gray-900">Leeftijd</p>
                                        <p className="text-gray-600">18+</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <p className="font-bold text-gray-900 mb-2">Ticket Prijs</p>
                                <p className="text-3xl font-black text-[#e91e63] mb-4">{event.ticketPrice}</p>
                                <Button className="w-full bg-[#15171e] hover:bg-black text-white">
                                    Officiële Website
                                </Button>
                            </div>
                        </div>

                        {/* Location Map Placeholder */}
                        <div className="bg-gray-200 h-64 rounded-2xl w-full flex items-center justify-center text-gray-400 font-bold">
                            GOOGLE MAPS PLACEHOLDER
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
