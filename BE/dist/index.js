import express from 'express';
import dotenv from 'dotenv';
import { prismaClient } from './client/prismaClient.js';
dotenv.config();
import cors from 'cors';
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const API = process.env.NEWS_API;
app.get("/news", async (req, res) => {
    try {
        let { q, fromDate, toDate } = req.query;
        q = q === undefined ? "todays tech" : q;
        if (!fromDate) {
            const now = new Date();
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() + 1);
            fromDate = lastMonth.toISOString().split('T')[0];
        }
        let endpoint = `https://newsapi.org/v2/everything?q=${q}&from=${fromDate}&sortBy=publishedAt&apiKey=${API}`;
        if (toDate)
            endpoint = `https://newsapi.org/v2/everything?q=${q}&from=${fromDate}&to=${toDate}&sortBy=publishedAt&apiKey=${API}`;
        const reqUrl = new Request(endpoint);
        let data;
        fetch(reqUrl)
            .then(async function (response) {
            data = await response.json();
            const articles = data.articles;
            // articles.map(async (article: Article)=>{
            //     const last = await prismaClient.newsArticle.findFirst({
            //         where: {
            //             url:article.url,
            //         }
            //     });
            //     if(!last){
            //         let source = await prismaClient.source.findFirst({
            //             where:{
            //                 name:article.source.name,
            //             }
            //         });
            //         if(!source){
            //             source = await prismaClient.source.create({
            //                 data:{
            //                     id:article.source.id,
            //                     name:article.source.name
            //                 }
            //             });
            //         }
            //         const news = await prismaClient.newsArticle.create({
            //             data: {
            //             author: article.author,
            //             title: article.title,
            //             description: article.description,
            //             url: article.url,
            //             urlToImage: article.urlToImage,
            //             publishedAt: article.publishedAt,
            //             content: article.content,
            //             source: { connect: {sourceId: source.sourceId} }
            //         }
            //         });
            //     }
            // });
            // console.log(data);
            // return res.json(data);
            return res.json(articles);
        });
        // const response = await prismaClient.newsArticle.findMany({});
        // console.log(response);
        // return res.json(response);
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