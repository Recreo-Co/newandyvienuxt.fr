-- Les tables métier avaient été importées en MyISAM, moteur qui ignore
-- silencieusement les clauses FOREIGN KEY : aucune contrainte n'existait
-- réellement, et aucune transaction n'était possible.
-- Prisma ne gère pas le moteur de stockage, cette migration est donc écrite à la main.
-- Chaque étape est conditionnelle pour rester rejouable sans erreur.

-- 1. Conversion des moteurs vers InnoDB
SET @s := (SELECT IF((SELECT engine FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name='users')='InnoDB','SELECT 1','ALTER TABLE `users` ENGINE=InnoDB'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT engine FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name='dance_groups')='InnoDB','SELECT 1','ALTER TABLE `dance_groups` ENGINE=InnoDB'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT engine FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name='dancers')='InnoDB','SELECT 1','ALTER TABLE `dancers` ENGINE=InnoDB'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT engine FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name='guardians')='InnoDB','SELECT 1','ALTER TABLE `guardians` ENGINE=InnoDB'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT engine FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name='emergency_contacts')='InnoDB','SELECT 1','ALTER TABLE `emergency_contacts` ENGINE=InnoDB'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT engine FROM information_schema.tables WHERE table_schema=DATABASE() AND table_name='registrations')='InnoDB','SELECT 1','ALTER TABLE `registrations` ENGINE=InnoDB'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

-- 2. Contraintes de clés étrangères, alignées sur les règles générées par Prisma
SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='dancers_userId_fkey')>0,'SELECT 1','ALTER TABLE `dancers` ADD CONSTRAINT `dancers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='emergency_contacts_dancerId_fkey')>0,'SELECT 1','ALTER TABLE `emergency_contacts` ADD CONSTRAINT `emergency_contacts_dancerId_fkey` FOREIGN KEY (`dancerId`) REFERENCES `dancers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='guardians_dancerId_fkey')>0,'SELECT 1','ALTER TABLE `guardians` ADD CONSTRAINT `guardians_dancerId_fkey` FOREIGN KEY (`dancerId`) REFERENCES `dancers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='registrations_dancerId_fkey')>0,'SELECT 1','ALTER TABLE `registrations` ADD CONSTRAINT `registrations_dancerId_fkey` FOREIGN KEY (`dancerId`) REFERENCES `dancers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='registrations_danceGroupId_fkey')>0,'SELECT 1','ALTER TABLE `registrations` ADD CONSTRAINT `registrations_danceGroupId_fkey` FOREIGN KEY (`danceGroupId`) REFERENCES `dance_groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;

SET @s := (SELECT IF((SELECT COUNT(*) FROM information_schema.referential_constraints WHERE constraint_schema=DATABASE() AND constraint_name='registrations_reviewedBy_fkey')>0,'SELECT 1','ALTER TABLE `registrations` ADD CONSTRAINT `registrations_reviewedBy_fkey` FOREIGN KEY (`reviewedBy`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE'));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;
