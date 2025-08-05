/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Source_id_key" ON "public"."Source"("id");
