import { getNews, getAlbums, getEvents, getArtists } from "@/lib/api";

export async function GET() {
  const baseUrl = "https://mainstage.vision"; // Target domain

  const [news, albums, events, artists] = await Promise.all([
    getNews({ limit: 1000 }),
    getAlbums({ limit: 1000 }),
    getEvents({ limit: 1000, includePast: true }),
    getArtists(),
  ]);

  const staticPages = [
    "",
    "/nieuws",
    "/albums",
    "/videos",
    "/events",
    "/artiesten",
    "/over-ons",
    "/contact",
    "/aanmelden",
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages
      .map((page) => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `).join("")}
      ${news
      .map((article) => `
        <url>
          <loc>${baseUrl}/nieuws/${article.id}</loc>
          <lastmod>${new Date(article.publishedAt).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join("")}
      ${albums
      .map((album) => `
        <url>
          <loc>${baseUrl}/albums/${album.id}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.6</priority>
        </url>
      `).join("")}
      ${events
      .map((event) => `
        <url>
          <loc>${baseUrl}/events/${event.id}</loc>
          <lastmod>${new Date(event.startDate).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
        </url>
      `).join("")}
      ${artists
      .map((artist) => `
        <url>
          <loc>${baseUrl}/artiesten/${artist.id}</loc>
          <changefreq>monthly</changefreq>
          <priority>0.5</priority>
        </url>
      `).join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
