-- DropForeignKey
ALTER TABLE `articles` DROP FOREIGN KEY `articles_username_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_articleId_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_username_fkey`;

-- DropForeignKey
ALTER TABLE `user_info_tables` DROP FOREIGN KEY `user_info_tables_username_fkey`;

-- AddForeignKey
ALTER TABLE `user_info_tables` ADD CONSTRAINT `user_info_tables_username_fkey` FOREIGN KEY (`username`) REFERENCES `user_accounts`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_username_fkey` FOREIGN KEY (`username`) REFERENCES `user_accounts`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `articles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_username_fkey` FOREIGN KEY (`username`) REFERENCES `user_accounts`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;
