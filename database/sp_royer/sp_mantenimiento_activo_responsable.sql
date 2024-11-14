use db_cmms;


DROP PROCEDURE IF EXISTS `registrar_mar`
DELIMITER //
CREATE PROCEDURE `registrar_mar`(
	IN _idtm				INT,
    IN _idactivo			INT,
    IN _idusuario			INT
)	
BEGIN
    
    INSERT INTO mantenimiento_activos_responsables (idtm, idtarea, idusuario)
    VALUES (_idtm, _idactivo, _idusuario);

END //

