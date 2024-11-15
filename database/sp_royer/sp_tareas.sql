use db_cmms;

DROP PROCEDURE IF EXISTS `registrarTarea`
DELIMITER //
CREATE PROCEDURE `registrarTarea`(
	OUT _idtarea 	INT,
    IN _fecha_programada	DATE,
    IN _hora_programada		TIME
)
BEGIN
    DECLARE existe_error INT DEFAULT 0;
    
    -- Manejador de excepciones
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO tareas ( fecha_programada, hora_programada)
    VALUES ( _fecha_programada, _hora_programada);
    
    IF existe_error = 1 THEN
		SET _idtarea = -1;
	ELSE
        SET _idtarea = LAST_INSERT_ID();
    END IF;
END //




DROP PROCEDURE IF EXISTS `obtenerTareasPorEstado`
DELIMITER //
CREATE PROCEDURE `obtenerTareasPorEstado`(
	IN _idestado	INT
)
BEGIN
	SELECT 
		TAR.idtarea,
		TAR.fecha_programada,
		TAR.hora_programada,
		TAR.idestado,
		GROUP_CONCAT(DISTINCT CONCAT(PER.nombres, ' ', PER.apellidos) ORDER BY PER.nombres) AS nombres_responsables,
		GROUP_CONCAT(DISTINCT ACTI.descripcion ORDER BY ACTI.descripcion) AS descripcion_activos
	FROM tareas TAR
	LEFT JOIN activos_tarea ACT ON ACT.idtarea = TAR.idtarea
	LEFT JOIN responsables_tarea RT ON RT.idtarea = TAR.idtarea
	LEFT JOIN activos ACTI ON ACTI.idactivo = ACT.idactivo
	LEFT JOIN usuarios USU ON USU.idusuario = RT.idusuario
	LEFT JOIN personas PER ON PER.id_persona = USU.idpersona
	WHERE TAR.idestado = _idestado
	GROUP BY TAR.idtarea, TAR.fecha_programada, TAR.hora_programada, TAR.idestado;

END //

call obtenerTareasPorEstado(10);


DROP PROCEDURE IF EXISTS `actualizarEstadoTarea`
DELIMITER $$
CREATE PROCEDURE `actualizarEstadoTarea`(
    IN _idtarea INT,
    IN _idestado INT
)
BEGIN
    UPDATE tareas 
    SET 
		idestado = _idestado
    WHERE idtarea = _idtarea;
    
END $$


