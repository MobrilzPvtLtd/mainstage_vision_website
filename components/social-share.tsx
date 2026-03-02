"use client";

import { Button } from "@/components/ui/button";
import { Facebook, Twitter, MessageCircle, Link2, Share2 } from "lucide-react";
import { useState } from "react";

interface SocialShareProps {
    url: string;
    title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
    const [copied, setCopied] = useState(false);

    const shareUrl = typeof window !== "undefined" ? window.location.href : url;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`, "_blank");
    };

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`, "_blank");
    };

    return (
        <div className="flex flex-wrap items-center gap-3">
            <button
                onClick={shareOnFacebook}
                className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                title="Share on Facebook"
            >
                <Facebook size={18} fill="white" />
            </button>
            <button
                onClick={shareOnTwitter}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg border border-white/10"
                title="Share on X"
            >
                <Twitter size={18} fill="white" />
            </button>
            <button
                onClick={shareOnWhatsApp}
                className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                title="Share on WhatsApp"
            >
                <MessageCircle size={18} fill="white" />
            </button>
            <button
                onClick={copyToClipboard}
                className={`w-10 h-10 rounded-full ${copied ? "bg-green-500" : "bg-white/10"} text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg border border-white/10`}
                title="Copy Link"
            >
                {copied ? <Share2 size={18} /> : <Link2 size={18} />}
            </button>
        </div>
    );
}
