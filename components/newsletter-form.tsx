"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { subscribeNewsletter } from "@/lib/api";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setStatus(null);

        try {
            const result = await subscribeNewsletter(email);
            if (result.error) {
                setStatus({ type: 'error', message: result.error });
            } else {
                setStatus({ type: 'success', message: result.message || "Succesvol ingeschreven!" });
                setEmail("");
            }
        } catch (error) {
            setStatus({ type: 'error', message: "Er is een fout opgetreden." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-[#15171e] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e91e63] rounded-full blur-3xl opacity-20 transform translate-x-10 -translate-y-10"></div>

            <Mail className="text-[#e91e63] mb-4" size={32} />
            <h3 className="font-black text-2xl mb-2">Stay Tuned!</h3>
            <p className="text-gray-400 text-sm mb-6">Ontvang wekelijks de beste updates, exclusieve interviews en winacties in je mailbox.</p>

            <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Je e-mailadres"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#e91e63] transition-colors"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#e91e63] hover:bg-[#d81557] font-bold h-12"
                >
                    {loading ? "BEZIG..." : "INSCHRIJVEN"}
                </Button>

                {status && (
                    <div className={`mt-4 flex items-center gap-2 text-xs font-bold ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                        {status.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
                        {status.message}
                    </div>
                )}
            </form>
        </div>
    );
}
