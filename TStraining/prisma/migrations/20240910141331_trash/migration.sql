/*
  Warnings:

  - You are about to drop the `banlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `banlist` DROP FOREIGN KEY `banlist_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `banlist` DROP FOREIGN KEY `banlist_userId_fkey`;

-- DropTable
DROP TABLE `banlist`;
