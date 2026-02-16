import { getVideos } from "@/lib/api";
import VideosClient from "./videos-client";

export default async function VideosPage() {
    const videos = await getVideos({ limit: 100 });
    return <VideosClient initialVideos={videos} />;
}
