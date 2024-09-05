/*
  Warnings:

  - You are about to drop the column `groupId` on the `messages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `messages` DROP FOREIGN KEY `messages_groupId_fkey`;

-- AlterTable
ALTER TABLE `messages` DROP COLUMN `groupId`;
