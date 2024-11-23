/*
  Warnings:

  - Added the required column `position` to the `map-latlng` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `map-latlng` ADD COLUMN `position` INTEGER NOT NULL;
