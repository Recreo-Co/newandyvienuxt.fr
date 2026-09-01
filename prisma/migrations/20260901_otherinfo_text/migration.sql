-- AlterTable: otherInfo accumule les notes de renouvellement, VARCHAR(191) est trop court
ALTER TABLE `dancers` MODIFY `otherInfo` TEXT NULL;
