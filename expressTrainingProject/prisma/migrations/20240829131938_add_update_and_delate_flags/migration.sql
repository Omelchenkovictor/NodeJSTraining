-- AlterTable
ALTER TABLE `articles` ADD COLUMN `isDelated` BOOLEAN NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `comments` ADD COLUMN `isDelated` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `user_accounts` ADD COLUMN `isDelated` BOOLEAN NULL;

-- AlterTable
ALTER TABLE `user_info_tables` ADD COLUMN `isDelated` BOOLEAN NULL;
