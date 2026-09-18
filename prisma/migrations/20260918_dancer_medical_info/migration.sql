-- La fiche admin propose un champ « Informations médicales » (édition, affichage,
-- impression) depuis sa création, mais la colonne n'a jamais existé : toute
-- sauvegarde avec ce champ rempli échouait en 500 (Unknown argument `medicalInfo`).
-- Ajout purement additif, rejouable sans erreur.
SET @s := (SELECT IF(
  (SELECT COUNT(*) FROM information_schema.columns
    WHERE table_schema = DATABASE() AND table_name = 'dancers' AND column_name = 'medicalInfo') > 0,
  'SELECT 1',
  'ALTER TABLE `dancers` ADD COLUMN `medicalInfo` TEXT NULL AFTER `otherInfo`'
));
PREPARE st FROM @s; EXECUTE st; DEALLOCATE PREPARE st;
