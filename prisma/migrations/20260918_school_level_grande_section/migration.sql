-- Les Grande Section sont acceptées à partir de la saison 2026-2027.
-- Les formulaires proposaient déjà la valeur GS, mais elle n'existait pas dans
-- l'enum : l'inscription la convertissait silencieusement en ADULTE.
-- Ajout en tête d'enum : les valeurs existantes ne sont pas modifiées.
ALTER TABLE `dancers` MODIFY `schoolLevel` ENUM('GS', 'CP', 'CE1', 'CE2', 'CM1', 'CM2', 'SIXIEME', 'CINQUIEME', 'QUATRIEME', 'TROISIEME', 'SECONDE', 'PREMIERE', 'TERMINALE', 'POST_BAC', 'ADULTE') NOT NULL;
