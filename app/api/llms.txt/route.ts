export async function GET() {
    const summary = `# MainStage Vision

MainStage Vision is a music news, photo, and event platform. It provides the latest news from the music world, live concert photos, and a complete overview of all events.

## Endpoints
- /nieuws: Music news articles and categories.
- /albums: Live concert photo albums.
- /videos: Concert highlights and interviews.
- /events: Upcoming festival and concert agenda.
- /artiesten: Artist database with history and photos.
- /over-ons: About the organization.
- /contact: Get in touch.
- /aanmelden: Staff applications for photographers and editors.

## Technical Details
Built with Next.js and integrated with a custom REST API. Supports full-text search across all content areas.
`;

    return new Response(summary, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
        },
    });
}
