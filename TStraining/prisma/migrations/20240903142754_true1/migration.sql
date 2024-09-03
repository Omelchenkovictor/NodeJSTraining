-- DropForeignKey
ALTER TABLE `groups` DROP FOREIGN KEY `groups_adminId_fkey`;

-- AlterTable
ALTER TABLE `groups` MODIFY `adminId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `adminlist`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;
