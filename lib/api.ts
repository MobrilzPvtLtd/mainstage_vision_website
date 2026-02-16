import { notFound } from "next/navigation";

const API_BASE_URL = "https://beheer.mainstage.vision";

// Helper to construct image URLs
export function getImageUrl(path: string | null | undefined, type?: "news" | "event" | "album" | "artist"): string {
    if (!path) return "https://placehold.co/600x400/15171e/e91e63?text=MainStage+Vision"; // Fallback
    if (path.startsWith("http")) return path;
    if (path.startsWith("/")) return `${API_BASE_URL}${path}`;

    // Based on v2.0 docs example, news images might live in /uploads/news/ if not preceded by /
    if (type === "news") return `${API_BASE_URL}/uploads/news/${path}`;

    return `${API_BASE_URL}/uploads/${path}`;
}

// Types
export interface Event {
    id: number;
    name: string;
    eventType: string;
    artist?: string; // Headliner from docs
    logo?: string;
    logoUrl?: string; // Standardized in docs v2.0
    startDate: string;
    endDate?: string;
    venueName?: string;
    city?: string;
    province?: string;
    country?: string;
    description?: string;
    ticketStatus?: string;
    ticketPrice?: string;
    ticketUrl?: string; // v2.0 field
    websiteUrl?: string; // v2.0 field
    officialWebsiteUrl?: string; // v2.0 field (alias/fallback)
    lineup?: Artist[]; // Actual API field
    lineupArtists?: Artist[]; // Docs v2.0 field
    parentEventId?: number; // For grouping festival days
    address?: string;
    postalCode?: string;
    status?: string;
    relatedNews?: Article[];
    relatedAlbums?: Album[];
    relatedVideos?: Video[];
    relatedEvents?: Event[]; // For "Programma" navigation
}

export interface Author {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    province?: string | null;
    roles?: string[];
    emailPreferences?: {
        newEvents: boolean;
        applicationUpdates: boolean;
        eventStatusChanges: boolean;
        assignmentNotifications: boolean;
    };
    isActive: boolean;
    mustChangePassword: boolean;
    calendarToken?: string | null;
    deletedAt?: string | null;
    createdAt: string;
}

export interface Article {
    id: number;
    title: string;
    slug: string;
    excerpt?: string;
    summary?: string;
    content?: string;
    publishedAt: string;
    createdAt?: string; // v2.0 field
    category: string;
    featuredImage?: string;
    isFeatured?: boolean;
    isBreaking?: boolean;
    readTime?: number;
    author?: string | Author; // Docs say string, API sometimes returns object
    photoCredit?: string;
    tags?: string[]; // v2.0 field
    eventId?: number; // v2.0 field
    relatedEventIds?: number[];
    isEventSpecific?: boolean; // v2.0 field
}

export interface Album {
    id: number;
    title: string;
    slug: string;
    eventId?: number;
    eventName?: string;
    artistName?: string;
    photoCount: number;
    featuredPhoto?: { url: string; thumbnailUrl: string };
    coverImage?: string; // Mapped from featuredPhoto for UI consistency
    photographerName?: string;
    createdAt: string;
    photos?: Photo[];
}

export interface Photo {
    id: number;
    url: string;
    thumbnailUrl: string;
    filename?: string;
    isFeatured?: boolean;
    photographerName?: string;
}

export interface Video {
    id: number;
    title: string;
    slug: string;
    description?: string;
    eventId?: number;
    eventName?: string;
    artistName?: string;
    videographerName?: string; // v2.0 field
    youtubeVideoId: string;
    youtubeUrl: string;
    thumbnailUrl: string;
    websiteUrl?: string; // Legacy/fallback
    duration?: number;
    tags?: string[]; // v2.0 field
    views?: number; // Not in API, implies mock or optional
    createdAt: string;
    category?: string; // Mapped or optional
}

export interface Artist {
    id: number;
    name: string;
    genre: string;
    bio?: string;
    description?: string;
    photoUrl?: string;
    eventCount?: number;
    photoCount?: number;
    verified?: boolean; // Not in API
    followers?: number; // Not in API
    country?: string; // Not in API
    events?: Event[];
    albums?: Album[];
    news?: Article[];
    videos?: Video[];
}

export interface SearchResult {
    type: "event" | "nieuws" | "album" | "artiest";
    id: number;
    title: string;
    subtitle?: string;
    image?: string;
    url: string;
    date?: string;
}

// API Functions

// Events
export async function getEvents(params: { limit?: number; recent?: boolean; includePast?: boolean } = {}): Promise<Event[]> {
    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.recent) searchParams.append("recent", "true");
    if (params.includePast) searchParams.append("includePast", "true");

    try {
        const res = await fetch(`${API_BASE_URL}/api/events/public?${searchParams.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        return data.events || [];
    } catch (error) {
        console.error("Error fetching events:", error);
        return [];
    }
}

export async function getEvent(id: string): Promise<Event | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/events/public/${id}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const event = await res.json();

        // If it's part of a festival (parentEventId), fetch siblings for the "Programma" section
        if (event.parentEventId) {
            const siblingsRes = await fetch(`${API_BASE_URL}/api/events/public?limit=50&includePast=true`, { next: { revalidate: 3600 } });
            if (siblingsRes.ok) {
                const data = await siblingsRes.json();
                event.relatedEvents = (data.events || []).filter((e: Event) => e.parentEventId === event.parentEventId);
            }
        }

        // Ensure lineup matches lineupArtists for consistency
        if (event.lineup && !event.lineupArtists) {
            event.lineupArtists = event.lineup;
        }

        return event;
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        return null;
    }
}

export async function getPastEvents(): Promise<Event[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/events/past`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch past events");
        return await res.json(); // API docs say it returns array directly
    } catch (error) {
        console.error("Error fetching past events:", error);
        return [];
    }
}

// News
export async function getNews(params: { limit?: number; category?: string; breaking?: boolean; eventId?: number } = {}): Promise<Article[]> {
    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.category && params.category !== "all") searchParams.append("category", params.category);
    if (params.breaking) searchParams.append("breaking", "true");
    if (params.eventId) searchParams.append("eventId", params.eventId.toString());

    try {
        const res = await fetch(`${API_BASE_URL}/api/news/public?${searchParams.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        return data.articles || [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}

export async function getArticle(id: string): Promise<Article | null> {
    // API doesn't explicitly list detail, but usually ID filtering works or we fetch all and find
    // Let's try to fetch all with a limit if there's no direct endpoint, OR assume standard REST
    // Implementation: Fetch list and find (fallback) or try direct if verified.
    // For now, I'll assume I can filter the list or just fetch recent matches.
    // OPTION: The docs didn't show /public/:id for news. I will fetch all (or limit 100) and find.
    // This is inefficient but safe given the docs. Use cache.
    try {
        const allNews = await getNews({ limit: 100 });
        return allNews.find(a => a.id === parseInt(id)) || null;
    } catch (e) {
        return null;
    }
}

// Categories
export async function getNewsCategories(): Promise<{ id: number; name: string; slug: string }[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/news/categories`, { next: { revalidate: 3600 } });
        if (!res.ok) return [];
        const data = await res.json();
        return data.categories || [];
    } catch (error) {
        return [];
    }
}

// Albums
export async function getAlbums(params: { limit?: number; featured?: boolean; recent?: boolean; eventId?: number } = {}): Promise<Album[]> {
    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.featured) searchParams.append("featured", "true");
    if (params.recent) searchParams.append("recent", "true");
    if (params.eventId) searchParams.append("eventId", params.eventId.toString());

    try {
        const res = await fetch(`${API_BASE_URL}/api/albums/public?${searchParams.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch albums");
        const data = await res.json();
        // Map API response to match our interface if needed
        return (data.albums || []).map((album: any) => ({
            ...album,
            coverImage: album.featuredPhoto?.url || getImageUrl(null)
        }));
    } catch (error) {
        console.error("Error fetching albums:", error);
        return [];
    }
}

export async function getAlbum(id: string): Promise<Album | null> {
    // Docs allow query param id? No, typical REST. But docs say "Query Parameters: id".
    // So distinct endpoint probably not there or it supports filter.
    // "Query Parameters ... id" implies /api/albums/public?id=...
    try {
        const res = await fetch(`${API_BASE_URL}/api/albums/public?id=${id}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const data = await res.json();
        const album = data.albums?.[0];
        if (!album) return null;
        return {
            ...album,
            coverImage: album.featuredPhoto?.url || getImageUrl(null)
        };
    } catch (error) {
        return null;
    }
}

// Videos
export async function getVideos(params: { limit?: number; recent?: boolean; eventId?: number } = {}): Promise<Video[]> {
    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.recent) searchParams.append("recent", "true");
    if (params.eventId) searchParams.append("eventId", params.eventId.toString());

    try {
        const res = await fetch(`${API_BASE_URL}/api/videos/public?${searchParams.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        return data.videos || [];
    } catch (error) {
        console.error("Error fetching videos:", error);
        return [];
    }
}

export async function getVideo(id: string): Promise<Video | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/videos/public?id=${id}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        const data = await res.json();
        return data.videos?.[0] || null;
    } catch (error) {
        return null;
    }
}

// Artists
export async function getArtists(): Promise<Artist[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/artists/public`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch artists");
        const data = await res.json(); // Returns array directly in one doc example, but verify?
        // Doc Chunk 6: "[ { ... } ]" - yes array directly.
        return Array.isArray(data) ? data : (data.artists || []);
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
}

export async function getArtist(id: string): Promise<Artist | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/artists/public/${id}`, { next: { revalidate: 60 } });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error(`Error fetching artist ${id}:`, error);
        return null;
    }
}

// Search
export async function search(query: string): Promise<SearchResult[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.results || [];
    } catch (error) {
        console.error("Error searching:", error);
        return [];
    }
}

// Contact
export interface ContactSubmission {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function submitContact(data: ContactSubmission): Promise<{ message?: string; error?: string }> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        return { error: "Failed to submit contact form. Please try again later." };
    }
}
