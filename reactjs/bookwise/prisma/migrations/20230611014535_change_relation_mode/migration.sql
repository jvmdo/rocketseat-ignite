-- DropForeignKey
ALTER TABLE `CategoriesOnBooks` DROP FOREIGN KEY `CategoriesOnBooks_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `CategoriesOnBooks` DROP FOREIGN KEY `CategoriesOnBooks_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `shelves` DROP FOREIGN KEY `shelves_book_id_fkey`;

-- DropForeignKey
ALTER TABLE `shelves` DROP FOREIGN KEY `shelves_user_id_fkey`;

-- CreateIndex
CREATE INDEX `CategoriesOnBooks_book_id_idx` ON `CategoriesOnBooks`(`book_id`);

-- CreateIndex
CREATE INDEX `shelves_user_id_idx` ON `shelves`(`user_id`);

-- RenameIndex
ALTER TABLE `CategoriesOnBooks` RENAME INDEX `CategoriesOnBooks_category_id_fkey` TO `CategoriesOnBooks_category_id_idx`;

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `accounts_user_id_idx`;

-- RenameIndex
ALTER TABLE `reviews` RENAME INDEX `reviews_book_id_fkey` TO `reviews_book_id_idx`;

-- RenameIndex
ALTER TABLE `reviews` RENAME INDEX `reviews_user_id_fkey` TO `reviews_user_id_idx`;

-- RenameIndex
ALTER TABLE `sessions` RENAME INDEX `sessions_user_id_fkey` TO `sessions_user_id_idx`;

-- RenameIndex
ALTER TABLE `shelves` RENAME INDEX `shelves_book_id_fkey` TO `shelves_book_id_idx`;
