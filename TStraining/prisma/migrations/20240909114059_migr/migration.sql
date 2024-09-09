/*
  Warnings:

  - You are about to drop the `UserInChats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserInChats` DROP FOREIGN KEY `UserInChats_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `UserInChats` DROP FOREIGN KEY `UserInChats_userId_groupId_fkey`;

-- DropTable
DROP TABLE `UserInChats`;
