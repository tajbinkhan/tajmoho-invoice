/*
  Warnings:

  - You are about to drop the column `proformaInvoiceDate` on the `proformainvoice` table. All the data in the column will be lost.
  - You are about to drop the column `proformaInvoiceDueDate` on the `proformainvoice` table. All the data in the column will be lost.
  - You are about to drop the column `proformaInvoiceNo` on the `proformainvoice` table. All the data in the column will be lost.
  - Added the required column `currency` to the `ProformaInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customTermsAndConditions` to the `ProformaInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customTotalAmount` to the `ProformaInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceDate` to the `ProformaInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `ProformaInvoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAndConditions` to the `ProformaInvoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proformainvoice` DROP COLUMN `proformaInvoiceDate`,
    DROP COLUMN `proformaInvoiceDueDate`,
    DROP COLUMN `proformaInvoiceNo`,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL,
    ADD COLUMN `customTermsAndConditions` BOOLEAN NOT NULL,
    ADD COLUMN `customTotalAmount` BOOLEAN NOT NULL,
    ADD COLUMN `invoiceDate` DATETIME(3) NOT NULL,
    ADD COLUMN `invoiceNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `termsAndConditions` LONGTEXT NOT NULL;
