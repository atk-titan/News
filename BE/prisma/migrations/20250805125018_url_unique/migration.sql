/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `NewsArticle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NewsArticle_url_key" ON "public"."NewsArticle"("url");
