use db_cmms;

DROP PROCEDURE IF EXISTS `registrarEvidencia`
DELIMITER //
CREATE PROCEDURE `registrarEvidencia`(
    IN _idtm			INT,
	IN _evidencia		varchar(30)
)	
BEGIN
    INSERT INTO evidencias (idtm, evidencia)
    VALUES (_idtm, _evidencia);
END //


-- Obtiene las evidencias de de una tarea mantenimiento
DROP PROCEDURE IF EXISTS `obtenerEvidencias` 
DELIMITER //
CREATE PROCEDURE `obtenerEvidencias`(
	IN _idtm	INT
)
BEGIN
	SELECT * FROM evidencias EV
	INNER JOIN tareas_mantenimiento TM ON TM.idtm = EV.idtm    
    where TM.idtm = _idtm;
END //

