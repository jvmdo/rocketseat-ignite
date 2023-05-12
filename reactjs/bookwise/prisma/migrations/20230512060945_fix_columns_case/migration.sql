/*
  Warnings:

  - You are about to drop the column `bookId` on the `shelves` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `shelves` table. All the data in the column will be lost.
  - The primary key for the `CategoriesOnBooks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `CategoriesOnBooks` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `shelves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `shelves` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `CategoriesOnBooks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shelves" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    CONSTRAINT "shelves_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shelves_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shelves" ("created_at", "id", "updated_at") SELECT "created_at", "id", "updated_at" FROM "shelves";
DROP TABLE "shelves";
ALTER TABLE "new_shelves" RENAME TO "shelves";
CREATE TABLE "new_CategoriesOnBooks" (
    "book_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,

    PRIMARY KEY ("book_id", "category_id"),
    CONSTRAINT "CategoriesOnBooks_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoriesOnBooks_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CategoriesOnBooks" ("book_id") SELECT "book_id" FROM "CategoriesOnBooks";
DROP TABLE "CategoriesOnBooks";
ALTER TABLE "new_CategoriesOnBooks" RENAME TO "CategoriesOnBooks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
