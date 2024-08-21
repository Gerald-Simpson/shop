/*
  Warnings:

  - Added the required column `inStock` to the `stockListing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockListing` ADD COLUMN `hidden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `inStock` BOOLEAN NOT NULL;
