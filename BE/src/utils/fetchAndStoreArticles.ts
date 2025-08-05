import { prismaClient } from "../client/prismaClient.js";
import type { Article } from "../types/interface.js";
import { getEndpoint } from "./endpoint.js";
import pLimit from "p-limit";

const limit = pLimit(8);

export const fetchAndStoreArticles = async (
  qStr: string,
  from: string,
  to: string
) => {
  try {
    const reqUrl = getEndpoint(qStr, from, to);
    const response = await fetch(reqUrl);
    const data = await response.json();
    const articles: Article[] = data.articles;

    const tasks = articles.map((article) =>
      limit(() =>
        prismaClient.newsArticle.upsert({
          where: {
            url: article.url, 
          },
          update: {}, 
          create: {
            title: article.title,
            author: article.author,
            url: article.url,
            urlToImage: article.urlToImage,
            publishedAt: article.publishedAt,
            content: article.content,
            description: article.description,
            source: {
              connectOrCreate: {
                where: {
                  name: article.source.name, 
                },
                create: {
                  name: article.source.name, 
                },
              },
            },
          },
          include: {
            source: true
          }
        })
      )
    );

    const result = await Promise.all(tasks);

    console.log("All articles fetched and stored.");

    return result;

  } catch (err) {
    console.error("Error while fetching/storing articles:", err);
    return [];
  }
};
