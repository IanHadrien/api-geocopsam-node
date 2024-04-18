-- CreateTable
CREATE TABLE `mappeds-area` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `geospatial_data` VARCHAR(191) NOT NULL,
    `total_area` VARCHAR(191) NOT NULL,
    `center_pont` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mappeds-area` ADD CONSTRAINT `mappeds-area_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
