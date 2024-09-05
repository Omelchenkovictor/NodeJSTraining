-- AlterTable
ALTER TABLE `messages` ADD COLUMN `groupId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `groups`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
