"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Video, Edit3, Newspaper, CheckCircle2, AlertCircle } from "lucide-react";
import { submitStaffApplication, StaffApplication } from "@/lib/api";

export default function StaffApplicationPage() {
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState<StaffApplication['desiredRole']>("photographer");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = new FormData(event.currentTarget);
        const data: StaffApplication = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            city: formData.get('city') as string,
            postalCode: formData.get('postalCode') as string,
            motivation: formData.get('motivation') as string,
            cameraEquipment: formData.get('cameraEquipment') as string,
            portfolioUrl: formData.get('portfolioUrl') as string,
            desiredRole: role,
        };

        try {
            const result = await submitStaffApplication(data);
            if (result.error) {
                setStatus({ type: 'error', message: result.error });
            } else {
                setStatus({ type: 'success', message: result.message || "Aanmelding succesvol ontvangen!" });
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
                    <Badge className="bg-[#e91e63] hover:bg-[#d81557] text-white border-none mb-6">WERKEN BIJ MAINSTAGE</Badge>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">Word <span className="text-[#e91e63]">Medewerker</span></h1>
                    <p className="text-xl text-gray-400 max-w-3xl font-medium">
                        Ben jij een gepassioneerde fotograaf, videograaf of verslaggever?
                        Sluit je aan bij ons team en krijg de kans om op de grootste podia van Europa te staan.
                    </p>
                </div>
            </section>

            <section className="py-24 container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100">
                        {status?.type === 'success' ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-3xl font-black text-[#15171e] mb-4">Bedankt voor je aanmelding!</h2>
                                <p className="text-gray-600 mb-8 font-medium">We hebben je gegevens ontvangen en nemen zo snel mogelijk contact met je op.</p>
                                <Button className="bg-[#15171e] hover:bg-[#e91e63]" onClick={() => setStatus(null)}>NIEUWE AANMELDING</Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-black text-[#15171e] border-b border-gray-100 pb-4">Persoonlijke Gegevens</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">Voornaam</label>
                                            <Input name="firstName" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">Achternaam</label>
                                            <Input name="lastName" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">E-mailadres</label>
                                            <Input name="email" type="email" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">Telefoonnummer</label>
                                            <Input name="phone" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">Adres</label>
                                            <Input name="address" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-gray-500 uppercase">Postcode</label>
                                            <Input name="postalCode" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase">Woonplaats</label>
                                        <Input name="city" required className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                    </div>
                                </div>

                                <div className="space-y-6 pt-8">
                                    <h3 className="text-2xl font-black text-[#15171e] border-b border-gray-100 pb-4">Vakgebied & Motivatie</h3>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase">Gewenste Rol</label>
                                        <Select value={role} onValueChange={(v: any) => setRole(v)}>
                                            <SelectTrigger className="bg-[#f5f5fa] border-none rounded-xl h-12">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="photographer">Fotograaf</SelectItem>
                                                <SelectItem value="videographer">Videograaf</SelectItem>
                                                <SelectItem value="editor">Editor</SelectItem>
                                                <SelectItem value="reporter">Reporter</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase">Portfolio URL</label>
                                        <Input name="portfolioUrl" type="url" required placeholder="https://..." className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase">Equipment (Indien van toepassing)</label>
                                        <Input name="cameraEquipment" placeholder="Bijv. camera, lenzen, software..." className="bg-[#f5f5fa] border-none rounded-xl h-12" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-500 uppercase">Motivatie</label>
                                        <Textarea name="motivation" required placeholder="Waarom wil je bij ons aan de slag?" className="bg-[#f5f5fa] border-none rounded-xl min-h-[150px] resize-none" />
                                    </div>
                                </div>

                                {status?.type === 'error' && (
                                    <div className="p-4 bg-red-50 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                                        <AlertCircle size={18} />
                                        {status.message}
                                    </div>
                                )}

                                <Button type="submit" disabled={loading} className="w-full bg-[#15171e] hover:bg-[#e91e63] text-white h-14 rounded-xl font-black text-lg shadow-lg">
                                    {loading ? "BEZIG MET VERZENDEN..." : "AANMELDING VERZENDEN"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
