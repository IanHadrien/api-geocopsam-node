-- CreateTable
CREATE TABLE `map-latlng` (
    `id` VARCHAR(191) NOT NULL,
    `lat` VARCHAR(191) NOT NULL,
    `lng` VARCHAR(191) NOT NULL,
    `mappedAreaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `map-latlng` ADD CONSTRAINT `map-latlng_mappedAreaId_fkey` FOREIGN KEY (`mappedAreaId`) REFERENCES `mappeds-area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
