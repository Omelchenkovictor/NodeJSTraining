-- CreateTable
CREATE TABLE `user_accounts` (
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_accounts_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_info_tables` (
    `username` VARCHAR(191) NOT NULL,
    `FIO` VARCHAR(191) NOT NULL,
    `dateOfBirth` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `aboutMe` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_info_tables_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `articleId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `comments_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `articles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `articles_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_info_tables` ADD CONSTRAINT `user_info_tables_username_fkey` FOREIGN KEY (`username`) REFERENCES `user_accounts`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_username_fkey` FOREIGN KEY (`username`) REFERENCES `user_accounts`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `articles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `articles` ADD CONSTRAINT `articles_username_fkey` FOREIGN KEY (`username`) REFERENCES `user_accounts`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
