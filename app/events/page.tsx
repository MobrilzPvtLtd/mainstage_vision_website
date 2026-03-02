import { getEvents, getNews, getAlbums } from "@/lib/api";
import EventsClient from "./events-client";

export default async function EventsPage() {
    const events = await getEvents({ limit: 100, includePast: true });
    const news = await getNews({ limit: 5 });
    const albums = await getAlbums({ limit: 4 });
    return <EventsClient initialEvents={events} sidebarNews={news} recentAlbums={albums} />;
}
