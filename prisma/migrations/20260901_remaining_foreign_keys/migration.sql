-- Complète 20260901_innodb_and_foreign_keys, qui ne couvrait que les tables
-- générées par Prisma. `password_reset_tokens` et `_TeacherGroups` avaient été
-- créées à la main et n'avaient donc pas leurs clés étrangères, ce qui laissait
-- un écart permanent entre schema.prisma et la base.
-- Même style conditionnel que la migration précédente : rejouable sans erreur.

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='password_reset_tokens_userId_fkey')>0,'SELECT 1','ALTER TABLE `password_reset_tokens` ADD CONSTRAINT `password_reset_tokens_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='_TeacherGroups_A_fkey')>0,'SELECT 1','ALTER TABLE `_TeacherGroups` ADD CONSTRAINT `_TeacherGroups_A_fkey` FOREIGN KEY (`A`) REFERENCES `dance_groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='_TeacherGroups_B_fkey')>0,'SELECT 1','ALTER TABLE `_TeacherGroups` ADD CONSTRAINT `_TeacherGroups_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;
