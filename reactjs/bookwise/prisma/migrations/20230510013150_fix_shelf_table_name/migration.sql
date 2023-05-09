/*
  Warnings:

  - You are about to drop the `shelf` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "shelf";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "shelves" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "updated_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    CONSTRAINT "shelves_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shelves_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
