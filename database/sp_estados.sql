use db_cmms;

DROP PROCEDURE IF EXISTS sp_filter_estados;
DELIMITER $$
CREATE PROCEDURE sp_filter_estados
(
	IN _idestado INT,
	IN _min INT,
	IN _max INT
)
BEGIN
	SELECT idestado, nom_estado FROM estados
    WHERE (idestado != _idestado OR _idestado IS NULL) AND (idestado>_min AND idestado<_max);
END $$

-- CALL sp_filter_estados (null, 2,7);