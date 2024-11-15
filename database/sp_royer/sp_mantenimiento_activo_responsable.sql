use db_cmms;


DROP PROCEDURE IF EXISTS `registrar_mar`
DELIMITER //
CREATE PROCEDURE `registrar_mar`(
	IN _idtm				INT,
    IN _idactivo			INT,
    IN _idusuario			INT
)	
BEGIN
    
    INSERT INTO mantenimiento_activos_responsables (idtm, idactivo, idusuario)
    VALUES (_idtm, _idactivo, _idusuario);

END //


DROP PROCEDURE IF EXISTS obtenerDetallesMantenimientoActivo;
DELIMITER $$
CREATE PROCEDURE obtenerDetallesMantenimientoActivo
(
	IN _idactivo INT
)
BEGIN
	SELECT
		*
	FROM mantenimiento_activos_responsables MAR
    LEFT JOIN tareas_mantenimiento TM ON MAR.idtm = TM.idtm
    LEFT JOIN tareas TAR ON TM.idtarea = TAR.idtarea
    WHERE MAR.idactivo = _idactivo ;
END $$
