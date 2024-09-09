-- CreateTable
CREATE TABLE `UserInChats` (
    `userId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,
    `chatId` INTEGER NOT NULL,
    `isBanned` BOOLEAN NOT NULL DEFAULT false,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`userId`, `chatId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserInChats` ADD CONSTRAINT `UserInChats_userId_groupId_fkey` FOREIGN KEY (`userId`, `groupId`) REFERENCES `UserInGroups`(`userId`, `groupId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInChats` ADD CONSTRAINT `UserInChats_chatId_fkey` FOREIGN KEY (`chatId`) REFERENCES `chats`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
