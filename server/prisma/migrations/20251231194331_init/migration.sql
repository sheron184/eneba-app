-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `discountedPrice` DOUBLE NULL,
    `discountPercent` INTEGER NULL,
    `cashbackAmount` DOUBLE NULL,
    `platform` VARCHAR(191) NOT NULL,
    `region` VARCHAR(191) NOT NULL,
    `publisher` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NULL,
    `releaseDate` DATETIME(3) NULL,
    `description` VARCHAR(191) NULL,
    `rating` DOUBLE NULL DEFAULT 0.0,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
