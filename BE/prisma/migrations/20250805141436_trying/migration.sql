/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Source` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Source_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Source_name_key" ON "public"."Source"("name");
