import { getNews, getNewsCategories } from "@/lib/api";
import NewsClient from "./news-client";

export default async function NewsPage() {
    const [news, categories] = await Promise.all([
        getNews({ limit: 100 }),
        getNewsCategories()
    ]);

    return <NewsClient initialArticles={news} categories={categories} />;
}
