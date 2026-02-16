import { getArtists } from "@/lib/api";
import ArtistsClient from "./artists-client";

export default async function ArtiestenPage() {
    const artists = await getArtists();
    return <ArtistsClient initialArtists={artists} />;
}
