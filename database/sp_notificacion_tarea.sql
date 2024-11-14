use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_notificacion_tarea;
DELIMITER $$
CREATE PROCEDURE sp_add_notificacion_tarea
(
	OUT _idnotificacion_tarea INT,
    IN _idtarea INT,
    IN _mensaje VARCHAR(250)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO notificaciones_tareas(idtarea, mensaje) VALUES
    (_idtarea, _mensaje);
    
	IF existe_error= 1 THEN
		SET _idnotificacion_tarea = -1;
	ELSE
        SET _idnotificacion_tarea = last_insert_id();
	END IF;
END $$

-- call sp_add_notificacion_tarea(@idnotif, 7, "wtf");
-- SELECT @idnotif AS idnotif

DROP PROCEDURE IF EXISTS sp_listar_notificacion_tarea;
DELIMITER $$
CREATE PROCEDURE sp_listar_notificacion_tarea
(
	IN _idusuario INT
)
BEGIN
	SELECT
		N.idnotificacion_tarea, N.mensaje, N.visto, N.create_at,
		TM.descripcion
        FROM notificaciones_tareas N
        INNER JOIN tareas T ON N.idtarea = T.idtarea 
        INNER JOIN tareas_mantenimiento TM ON T.idtarea = TM.idtarea
        WHERE T.idusuario = _idusuario
        ORDER BY N.create_at DESC;
END $$

DROP PROCEDURE IF EXISTS sp_detalle_notificacion_tarea;
DELIMITER $$
CREATE PROCEDURE sp_detalle_notificacion_tarea
(
	IN _idnotificacion INT
)
BEGIN
	SELECT
		TM.fecha_inicio, TM.hora_inicio, TM.descripcion,
        ACT.descripcion, ACT.cod_identificacion,
        T.fecha_inicio, T.hora_inicio
        FROM tareas T
        INNER JOIN notificaciones_tareas NT ON T.idtarea = NT.idtarea
        INNER JOIN tareas_mantenimiento TM ON T.idtarea = TM.idtarea
        INNER JOIN activos_tarea ACTT ON T.idtarea = ACTT.idtarea
        INNER JOIN activos ACT ON ACTT.idactivo = ACT.idactivo
        WHERE NT.idnotificacion_tarea = _idnotificacion;
END $$

DROP PROCEDURE IF EXISTS sp_update_visto_tarea;
DELIMITER $$
CREATE PROCEDURE sp_update_visto_tarea
(
	IN _idnotificacion INT,
    IN _visto TINYINT
)
BEGIN
	UPDATE notificaciones_tareas SET
	visto = _visto,
    update_at = NOW()
    WHERE idnotificacion_tarea = _idnotificacion;
END $$