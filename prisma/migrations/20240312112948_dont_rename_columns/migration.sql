/*
  Warnings:

  - The primary key for the `verificationtoken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `my_row_id` on the `verificationtoken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `verificationtoken` DROP PRIMARY KEY,
    DROP COLUMN `my_row_id`;
