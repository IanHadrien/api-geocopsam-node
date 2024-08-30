-- DropForeignKey
ALTER TABLE `map-latlng` DROP FOREIGN KEY `map-latlng_mappedAreaId_fkey`;

-- DropForeignKey
ALTER TABLE `mappeds-area` DROP FOREIGN KEY `mappeds-area_userId_fkey`;

-- DropForeignKey
ALTER TABLE `plantations` DROP FOREIGN KEY `plantations_cultivationId_fkey`;

-- DropForeignKey
ALTER TABLE `plantations` DROP FOREIGN KEY `plantations_mappedAreaId_fkey`;

-- DropForeignKey
ALTER TABLE `plantations` DROP FOREIGN KEY `plantations_userId_fkey`;

-- AddForeignKey
ALTER TABLE `mappeds-area` ADD CONSTRAINT `mappeds-area_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantations` ADD CONSTRAINT `plantations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantations` ADD CONSTRAINT `plantations_cultivationId_fkey` FOREIGN KEY (`cultivationId`) REFERENCES `cultivations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantations` ADD CONSTRAINT `plantations_mappedAreaId_fkey` FOREIGN KEY (`mappedAreaId`) REFERENCES `mappeds-area`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `map-latlng` ADD CONSTRAINT `map-latlng_mappedAreaId_fkey` FOREIGN KEY (`mappedAreaId`) REFERENCES `mappeds-area`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
