/*
  Warnings:

  - Added the required column `platform` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `game` ADD COLUMN `cashbackAmount` DOUBLE NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `discountPercent` INTEGER NULL,
    ADD COLUMN `discountedPrice` DOUBLE NULL,
    ADD COLUMN `genre` VARCHAR(191) NULL,
    ADD COLUMN `platform` VARCHAR(191) NOT NULL,
    ADD COLUMN `publisher` VARCHAR(191) NULL,
    ADD COLUMN `rating` DOUBLE NULL DEFAULT 0.0,
    ADD COLUMN `region` VARCHAR(191) NOT NULL,
    ADD COLUMN `releaseDate` DATETIME(3) NULL,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 0;
