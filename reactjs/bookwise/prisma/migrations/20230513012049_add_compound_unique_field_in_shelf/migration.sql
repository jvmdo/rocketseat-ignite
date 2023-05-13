/*
  Warnings:

  - A unique constraint covering the columns `[user_id,book_id]` on the table `shelves` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shelves_user_id_book_id_key" ON "shelves"("user_id", "book_id");
