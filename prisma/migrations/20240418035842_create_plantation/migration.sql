-- CreateTable
CREATE TABLE `plantations` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `planting_date` DATETIME(3) NOT NULL,
    `previous_culture` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,
    `cultivationId` VARCHAR(191) NOT NULL,
    `mappedAreaId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `plantations` ADD CONSTRAINT `plantations_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantations` ADD CONSTRAINT `plantations_cultivationId_fkey` FOREIGN KEY (`cultivationId`) REFERENCES `cultivations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `plantations` ADD CONSTRAINT `plantations_mappedAreaId_fkey` FOREIGN KEY (`mappedAreaId`) REFERENCES `mappeds-area`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
