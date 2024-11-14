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
	SELECT * FROM tareas where idestado = _idestado;
END //

call obtenerTareasPorEstado(10);
