import { getNews, getEvents, getAlbums, getArtists } from "@/lib/api";

export async function GET() {
    const [news, events, albums, artists] = await Promise.all([
        getNews({ limit: 50 }),
        getEvents({ limit: 50 }),
        getAlbums({ limit: 50 }),
        getArtists(),
    ]);

    let content = "# MainStage Vision Full Content Export\n\n";

    content += "## News Articles\n";
    news.forEach((a) => {
        content += `- ${a.title} (${new Date(a.publishedAt).toLocaleDateString()})\n  ${a.excerpt || ""}\n`;
    });

    content += "\n## Upcoming Events\n";
    events.forEach((e) => {
        content += `- ${e.name} at ${e.venueName}, ${e.city} (${new Date(e.startDate).toLocaleDateString()})\n`;
    });

    content += "\n## Photo Albums\n";
    albums.forEach((a) => {
        content += `- ${a.title} (${a.photoCount} photos)\n`;
    });

    content += "\n## Artists\n";
    artists.forEach((a) => {
        content += `- ${a.name} (${a.genre})\n`;
    });

    return new Response(content, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
