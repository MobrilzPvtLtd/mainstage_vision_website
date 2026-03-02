import { search, SearchResult } from "@/lib/api";
import SearchClient from "./search-client";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
    const query = searchParams.q || "";
    const searchData = query ? await search(query) : null;

    // Transform search data into a flat array for the UI
    const results: SearchResult[] = searchData ? [
        ...(searchData.articles || []).map(a => ({
            id: a.id,
            type: 'article' as const,
            title: a.title,
            subtitle: a.excerpt,
            image: a.featuredImage,
            url: `/nieuws/${a.id}`,
            date: a.publishedAt
        })),
        ...(searchData.events || []).map(e => ({
            id: e.id,
            type: 'event' as const,
            title: e.name,
            subtitle: `${e.venueName}, ${e.city}`,
            image: e.logoUrl || e.logo,
            url: `/events/${e.id}`,
            date: e.startDate
        })),
        ...(searchData.artists || []).map(a => ({
            id: a.id,
            type: 'artist' as const,
            title: a.name,
            subtitle: a.genre,
            image: a.photoUrl,
            url: `/artiesten/${a.id}`
        })),
        ...(searchData.albums || []).map(a => ({
            id: a.id,
            type: 'album' as const,
            title: a.title,
            subtitle: `${a.photoCount} foto's`,
            image: a.coverImage,
            url: `/albums/${a.id}`,
            date: a.createdAt
        })),
        ...(searchData.videos || []).map(v => ({
            id: v.id,
            type: 'video' as const,
            title: v.title,
            subtitle: v.description,
            image: v.thumbnailUrl,
            url: `/videos/${v.id}`,
            date: v.createdAt
        }))
    ] : [];

    return <SearchClient initialResults={results} query={query} />;
}
