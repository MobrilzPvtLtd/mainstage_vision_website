import { getReviews, getEvents } from "@/lib/api";
import ReviewsClient from "./reviews-client";

export const metadata = {
    title: "Recensies - MainStage Vision",
    description: "Lees evenement recensies op MainStage Vision. Reviews van concerten, festivals en live muziek evenementen door onze redactie.",
};

export default async function RecensiesPage() {
    const [reviews, events] = await Promise.all([
        getReviews(),
        getEvents({ limit: 100, includePast: true })
    ]);
    return <ReviewsClient initialReviews={reviews} events={events} />;
}
