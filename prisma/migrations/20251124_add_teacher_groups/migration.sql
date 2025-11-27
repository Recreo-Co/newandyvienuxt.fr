-- CreateTable
CREATE TABLE IF NOT EXISTS `_TeacherGroups` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeacherGroups_AB_unique`(`A`, `B`),
    INDEX `_TeacherGroups_B_index`(`B`),
    CONSTRAINT `_TeacherGroups_A_fkey` FOREIGN KEY (`A`) REFERENCES `dance_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `_TeacherGroups_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

