/*
  Warnings:

  - The primary key for the `shelves` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `shelves` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shelves" (
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "book_id"),
    CONSTRAINT "shelves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shelves_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shelves" ("book_id", "created_at", "updated_at", "user_id") SELECT "book_id", "created_at", "updated_at", "user_id" FROM "shelves";
DROP TABLE "shelves";
ALTER TABLE "new_shelves" RENAME TO "shelves";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
