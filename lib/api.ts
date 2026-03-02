import { notFound } from "next/navigation";

const API_BASE_URL = "https://beheer.mainstage.vision";

// Helper to construct image URLs
export function getImageUrl(path: string | null | undefined, type?: "news" | "event" | "album" | "artist"): string {
    if (!path) {
        // Fallback images based on type
        if (type === "artist") return "https://placehold.co/600x600/15171e/e91e63?text=Artist";
        return "https://placehold.co/600x400/15171e/e91e63?text=MainStage+Vision";
    }

    if (path.startsWith("http")) return path;

    // Clean the path
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // If it already looks like an uploads path, just return it with base
    if (cleanPath.startsWith("uploads/")) return `${API_BASE_URL}/${cleanPath}`;

    // Otherwise, build the path based on type
    if (type === "news") return `${API_BASE_URL}/uploads/news/${cleanPath}`;

    return `${API_BASE_URL}/uploads/${cleanPath}`;
}

// Types
export interface Event {
    id: number;
    name: string;
    eventType: string;
    artist?: string; // Headliner/Artist name
    logo?: string;
    logoUrl?: string; // Standardized URL
    startDate: string;
    endDate?: string;
    venueName?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    province?: string;
    country?: string;
    description?: string;
    status?: string;
    ticketPrice?: string;
    ticketStatus?: string;
    ticketUrl?: string;
    websiteUrl?: string;
    officialWebsiteUrl?: string;
    organizationName?: string; // v2 field
    parentEventId?: number;
    parentEvent?: { id: number; name: string }; // v2 field
    childEvents?: { id: number; name: string; startDate: string }[]; // v2 field
    lineup?: Artist[];
    lineupArtists?: Artist[];
    relatedNews?: Article[];
    relatedAlbums?: Album[];
    relatedVideos?: Video[];
    relatedEvents?: Event[];
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
    summary?: string; // Full HTML content
    content?: string; // Legacy/Alias
    publishedAt: string;
    createdAt?: string;
    category: string;
    featuredImage?: string;
    isFeatured?: boolean;
    isBreaking?: boolean;
    readTime?: number;
    author?: string | Author;
    photoCredit?: string;
    tags?: string[];
    eventId?: number;
    relatedEventIds?: number[];
    isEventSpecific?: boolean;
}

export interface Album {
    id: number;
    title: string;
    slug: string;
    eventId?: number;
    eventName?: string;
    artistName?: string;
    photographerName?: string;
    photoCount: number;
    featuredPhotoId?: number;
    isFeatured?: boolean;
    featuredPhoto?: { url: string; thumbnailUrl: string; isFeatured?: boolean };
    coverImage?: string; // Mapped from featuredPhoto for UI consistency
    createdAt: string;
    photos?: Photo[];
    tags?: string[];
    event?: {
        name: string;
        startDate: string;
        venueName: string;
        city: string;
    };
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
    approvedAt?: string;
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
    verified?: boolean;
    followers?: number;
    country?: string;
    events?: (Event & { isPast?: boolean })[];
    albums?: Album[];
    news?: Article[];
    videos?: Video[];
}

export interface Review {
    id: number;
    title: string;
    slug: string;
    summary: string;
    content: string;
    featuredImage: string;
    rating: number;
    status: string;
    publishDate: string;
    eventId?: number;
    authorId?: number;
    author?: Author;
    event?: Event;
    tags?: string[];
}

export interface HeadlinerAnnouncement {
    id: number;
    eventId: number;
    artistId: number;
    title: string;
    description: string;
    announcementDate: string;
    isActive: boolean;
    eventName: string;
    eventLogo: string;
    eventStartDate: string;
    artistName: string;
    artistPhoto: string;
}

export interface SearchResult {
    type: "event" | "nieuws" | "news" | "album" | "artiest" | "artist" | "article" | "video";
    id: number;
    title: string;
    subtitle?: string;
    image?: string;
    url: string;
    date?: string | null;
}

export interface SearchData {
    articles?: Article[];
    events?: Event[];
    artists?: Artist[];
    albums?: Album[];
    videos?: Video[];
}

export interface StaffApplication {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    motivation: string;
    cameraEquipment: string;
    portfolioUrl: string;
    desiredRole: "photographer" | "videographer" | "editor" | "reporter";
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
        // The API returns { "events": [...], "total": ... }
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

        // Single event endpoint usually returns the event object directly or wrapped in { event: ... }
        // Looking at the docs, it seems to be the object directly.
        const eventData = event.event || event;

        // Multi-day event logic (Programma)
        // If it's a child event, fetch siblings
        if (eventData.parentEventId) {
            const siblingsRes = await fetch(`${API_BASE_URL}/api/events/public?limit=50&includePast=true`, { next: { revalidate: 3600 } });
            if (siblingsRes.ok) {
                const data = await siblingsRes.json();
                eventData.relatedEvents = (data.events || []).filter((e: Event) => e.parentEventId === eventData.parentEventId);
            }
        }
        // If it's a parent event, use childEvents if available, or fetch them
        else if (eventData.childEvents && eventData.childEvents.length > 0) {
            // Already has basic info, but we might want full Event objects
            const childIds = eventData.childEvents.map((ce: any) => ce.id);
            const childrenRes = await fetch(`${API_BASE_URL}/api/events/public?limit=50&includePast=true`, { next: { revalidate: 3600 } });
            if (childrenRes.ok) {
                const data = await childrenRes.json();
                eventData.relatedEvents = (data.events || []).filter((e: Event) => childIds.includes(e.id));
            }
        }

        // Ensure lineup matches lineupArtists for consistency
        if (eventData.lineup && !eventData.lineupArtists) {
            eventData.lineupArtists = eventData.lineup;
        }

        return eventData;
    } catch (error) {
        console.error(`Error fetching event ${id}:`, error);
        return null;
    }
}

export async function getPastEvents(): Promise<Event[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/events/past`, { next: { revalidate: 3600 } });
        if (!res.ok) throw new Error("Failed to fetch past events");
        const data = await res.json();
        return data.events || data; // Handle both direct array and object with events key
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
        const data = await res.json();
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
export async function search(query: string): Promise<SearchData | null> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error searching:", error);
        return null;
    }
}

// Headliner Announcements
export async function getHeadlinerAnnouncements(): Promise<HeadlinerAnnouncement[]> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/public/headliner-announcements`, { next: { revalidate: 300 } });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data : (data.announcements || []);
    } catch (error) {
        return [];
    }
}

// Newsletter
export async function subscribeNewsletter(email: string): Promise<{ message?: string; error?: string }> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/newsletter/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        return await res.json();
    } catch (error) {
        return { error: "Newsletter subscription failed." };
    }
}

// Staff Application
export async function submitStaffApplication(data: StaffApplication): Promise<{ success?: boolean; message?: string; error?: string }> {
    try {
        const res = await fetch(`${API_BASE_URL}/api/public/staff-application`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return await res.json();
    } catch (error) {
        return { error: "Failed to submit application." };
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

// Reviews
export async function getReviews(params: { limit?: number; recent?: boolean; eventId?: number } = {}): Promise<Review[]> {
    const searchParams = new URLSearchParams();
    if (params.limit) searchParams.append("limit", params.limit.toString());
    if (params.recent) searchParams.append("recent", "true");
    if (params.eventId) searchParams.append("eventId", params.eventId.toString());

    try {
        const res = await fetch(`${API_BASE_URL}/api/reviews/public?${searchParams.toString()}`, { next: { revalidate: 60 } });
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        return Array.isArray(data) ? data : (data.reviews || []);
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return [];
    }
}

export async function getReview(id: string): Promise<Review | null> {
    try {
        const reviews = await getReviews();
        // Since we don't have a specific detail endpoint mentioned in docs that returns a single object by ID (standard),
        // we'll find it in the list or attempt a direct fetch if common pattern holds.
        // Actually, let's try direct fetch first.
        const res = await fetch(`${API_BASE_URL}/api/reviews/public?id=${id}`, { next: { revalidate: 60 } });
        if (res.ok) {
            const data = await res.json();
            const review = Array.isArray(data) ? data.find((r: any) => r.id === parseInt(id)) : (data.reviews?.[0] || data);
            if (review && review.id === parseInt(id)) return review;
        }

        const allReviews = await getReviews();
        return allReviews.find(r => r.id === parseInt(id)) || null;
    } catch (error) {
        console.error(`Error fetching review ${id}:`, error);
        return null;
    }
}

// Utils
export function getCalendarUrl(): string {
    return `${API_BASE_URL}/api/calendar/events.ics`;
}

