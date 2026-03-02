"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, MessageSquare, Info } from "lucide-react";
import { submitContact } from "@/lib/api";

export default function ContactPage() {
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = new FormData(event.currentTarget);
        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const result = await submitContact(data);
            if (result.error) {
                setStatus({ type: 'error', message: result.error });
            } else {
                setStatus({ type: 'success', message: result.message || "Bericht succesvol verzonden!" });
                (event.target as HTMLFormElement).reset();
            }
        } catch (e) {
            setStatus({ type: 'error', message: "Er is een fout opgetreden bij het verzenden." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="bg-[#f5f5fa] min-h-screen">
            <section className="bg-[#15171e] text-white py-24">
                <div className="container mx-auto px-6">
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] text-white border-none mb-6">CONTACT</Badge>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Neem <span className="text-[#e91e63]">Contact</span> op</h1>
                    <p className="text-xl text-gray-400 max-w-2xl font-medium">
                        Heb je een vraag, opmerking of wil je samenwerken? Laat het ons weten.
                        Ons team staat klaar om je te helpen.
                    </p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Contact Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div>
                            <h3 className="text-2xl font-black text-[#15171e] mb-8 uppercase tracking-dense">Contactgegevens</h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#e91e63] flex-shrink-0">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">E-mail</div>
                                        <div className="text-[#15171e] font-black">info@mainstage.vision</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#e91e63] flex-shrink-0">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Telefoon</div>
                                        <div className="text-[#15171e] font-black">+32 (0) 471 12 34 56</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center text-[#e91e63] flex-shrink-0">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Adres</div>
                                        <div className="text-[#15171e] font-black">Hoofdstraat 1, 2000 Antwerpen</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#15171e] text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#e91e63] rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>
                            <Info className="text-[#e91e63] mb-4" size={32} />
                            <h4 className="font-black text-xl mb-2">Pers & Accreditatie</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Ben je op zoek naar persaccreditatie voor een van onze partner-events?
                                Vermeld de naam van het event in je bericht.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#15171e] uppercase tracking-wide">Naam</label>
                                        <Input name="name" required placeholder="Jouw Naam" className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-[#15171e] uppercase tracking-wide">E-mailadres</label>
                                        <Input name="email" type="email" required placeholder="naam@voorbeeld.nl" className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#15171e] uppercase tracking-wide">Onderwerp</label>
                                    <Input name="subject" required placeholder="Waar gaat het over?" className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#15171e] uppercase tracking-wide">Bericht</label>
                                    <Textarea name="message" required placeholder="Schrijf hier je bericht..." className="bg-[#f5f5fa] border-none rounded-xl min-h-[150px] resize-none" />
                                </div>

                                {status && (
                                    <div className={`p-4 rounded-xl text-sm font-bold ${status.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <Button type="submit" disabled={loading} className="w-full bg-[#15171e] hover:bg-[#e91e63] text-white h-14 rounded-xl font-black text-lg shadow-lg transition-all group">
                                    {loading ? "VERZENDEN..." : "BERICHT VERZENDEN"}
                                    <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
