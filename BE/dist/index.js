import express from 'express';
import { prismaClient } from './client/prismaClient.js';
import cors from 'cors';
import { fetchAndStoreArticles } from './utils/fetchAndStoreArticles.js';
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/news", async (req, res) => {
    try {
        let { q, fromDate, toDate } = req.query;
        const qStr = typeof q === 'string' ? q : "world";
        const from = typeof fromDate === 'string' ? fromDate : undefined;
        const to = typeof toDate === 'string' ? toDate : undefined;
        const articles = await prismaClient.newsArticle.findMany({
            where: {
                OR: [
                    { title: { contains: qStr, mode: "insensitive" } },
                    { content: { contains: qStr, mode: "insensitive" } },
                    { description: { contains: qStr, mode: "insensitive" } }
                ],
            },
            orderBy: {
                publishedAt: "desc"
            }
        });
        let newArticles = [];
        if (articles.length < 7 || new Date(articles[0]?.publishedAt) < new Date()) {
            const currTime = new Date().toISOString();
            // newArticles.push(fetchAndStoreArticles(qStr,articles[0]?.publishedAt as string,currTime));
            newArticles = await fetchAndStoreArticles(qStr, articles[0]?.publishedAt, currTime);
        }
        const allArticles = [...articles, ...newArticles];
        return res.json({ allArticles });
    }
    catch (err) {
        console.log(err);
        return res.json({ msg: "something wrong with API request." });
    }
});
app.listen(port, () => {
    console.log("server started at localhost:3000");
});
//# sourceMappingURL=index.js.map