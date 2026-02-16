import { getAlbums } from "@/lib/api";
import AlbumsClient from "./albums-client";

export default async function AlbumsPage() {
    const albums = await getAlbums({ limit: 100 });
    return <AlbumsClient initialAlbums={albums} />;
}
