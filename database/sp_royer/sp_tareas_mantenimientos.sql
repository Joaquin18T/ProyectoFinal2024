use db_cmms;

DROP PROCEDURE IF EXISTS `registrarTareaMantenimiento`
DELIMITER //
CREATE PROCEDURE `registrarTareaMantenimiento`(
	OUT _idtm		 	INT,
	IN _idtarea				INT,
    IN _descripcion			VARCHAR(300)
)	
BEGIN
    DECLARE existe_error INT DEFAULT 0;
    
    -- Manejador de excepciones
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO tareas_mantenimiento (idtarea, descripcion)
    VALUES (_idtarea, _descripcion);

    IF existe_error = 1 THEN
		SET _idtm = -1;
	ELSE
        SET _idtm = LAST_INSERT_ID();
    END IF;
END //


-- Obtiene los mantenimientos de un activo

DROP PROCEDURE IF EXISTS `obtenerMantenimientosActivo` 
DELIMITER //
CREATE PROCEDURE `obtenerMantenimientosActivo`(
	IN _idactivo	INT
)
BEGIN
	SELECT * FROM tareas_mantenimiento TM
	INNER JOIN tareas TAR ON TM.idtarea = TAR.idtarea
    INNER JOIN activos_tarea ACT ON TAR.idtarea = ACT.idtarea
    where ACT.idactivo = _idactivo;
END //

call obtenerMantenimientosActivo(1);

DROP PROCEDURE IF EXISTS `obtenerMantenimientosActivosPorFecha`
DELIMITER //
CREATE PROCEDURE `obtenerMantenimientosActivosPorFecha`(
	IN _idactivo	INT
)
BEGIN
	SELECT * FROM tareas_mantenimiento TM
	INNER JOIN tareas TAR ON TM.idtarea = TAR.idtarea
    INNER JOIN activos_tarea ACT ON TAR.idtarea = ACT.idtarea
    where ACT.idactivo = _idactivo;
END //


-- OBTENER mantenimmientos de un activo por intervalo de fechas
DELIMITER $$
CREATE PROCEDURE obtenerMantenimientosPorFecha (
    IN _idactivo INT,
    IN _fecha_inicio DATE,
    IN _fecha_finalizado DATE
)
BEGIN
    SELECT 
        tm.idtarea_mantenimiento,
        tm.descripcion,
        tm.fecha_inicio,
        tm.fecha_final,
        t.descripcion AS tarea_descripcion
    FROM 
        tarea_mantenimiento tm
    INNER JOIN tareas t ON tm.idtarea = t.idtarea
	INNER JOIN activos_tarea ACT ON t.idtarea = ACT.idtarea
    WHERE 
        ACT.idactivo = _idactivo
        AND tm.fecha_inicio >= _fecha_inicio
        AND (tm.fecha_finalizado <= _fecha_finalizado OR tm.fecha_finalizado IS NULL)
    ORDER BY 
        tm.fecha_inicio ASC;
END $$

DELIMITER ;


DROP PROCEDURE IF EXISTS `actualizarMantenimiento`
DELIMITER //
CREATE PROCEDURE `actualizarMantenimiento`(
	IN _idtm	INT,
    IN _descripcion 	VARCHAR(300),
    IN _fecha_finalizado DATE,
    IN _hora_finalizado TIME,
    IN _tiempo_ejecutado	TIME
)
BEGIN
	UPDATE tareas_mantenimiento SET
		descripcion = _descripcion,
		fecha_finalizado = _fecha_finalizado,
        hora_finalizado = _hora_finalizado,
        tiempo_ejecutado = _tiempo_ejecutado
		where idtm = _idtm;
END //

DROP PROCEDURE IF EXISTS `verificarMantenimientoEjecutado`
DELIMITER //
CREATE PROCEDURE `verificarMantenimientoEjecutado`(
	IN _idactivo	INT
)
BEGIN  
	SELECT 
		MAR.idatm,
        MAR.idactivo,
        MAR.idtm,
        TM.idtarea,
        TM.fecha_inicio,
        TM.hora_inicio,
        TM.fecha_finalizado,
        TM.hora_finalizado,
        TM.tiempo_ejecutado,
        TM.descripcion
    FROM mantenimiento_activos_responsables MAR
    INNER JOIN tareas_mantenimiento TM ON TM.idtm = MAR.idtm
	INNER JOIN tareas TAR ON TM.idtarea = TAR.idtarea
    INNER JOIN activos ACTI ON ACTI.idactivo = MAR.idactivo
    where MAR.idactivo = _idactivo;
END //

call verificarMantenimientoEjecutado(14)