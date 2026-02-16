import { getEvents, getNews } from "@/lib/api";
import EventsClient from "./events-client";

export default async function EventsPage() {
    const events = await getEvents({ limit: 100, includePast: true });
    const news = await getNews({ limit: 5 });
    return <EventsClient initialEvents={events} sidebarNews={news} />;
}
