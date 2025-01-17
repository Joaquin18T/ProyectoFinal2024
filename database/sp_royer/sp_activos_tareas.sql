use db_cmms;

DROP PROCEDURE IF EXISTS `registrarActivoTarea`
DELIMITER //
CREATE PROCEDURE `registrarActivoTarea`(
	OUT _idactivos_tarea 	INT,
	IN _idtarea				INT,
    IN _idactivo			INT
)	
BEGIN
    DECLARE existe_error INT DEFAULT 0;
    
    -- Manejador de excepciones
	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
		BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO activos_tarea (idtarea, idactivo)
    VALUES (_idtarea, _idactivo);

    IF existe_error = 1 THEN
		SET _idactivos_tarea = -1;
	ELSE
        SET _idactivos_tarea = LAST_INSERT_ID();
    END IF;
END //

-- call registrarActivoTarea(@idacttar, 18, 15);
-- SELECT @idacttar as idactivos_tarea

DROP PROCEDURE IF EXISTS obtenerActivosPorTarea;
DELIMITER $$
CREATE PROCEDURE obtenerActivosPorTarea
(
	IN _idtarea INT
)
BEGIN
	SELECT
		ACT.idactivos_tarea,
        ACTI.idactivo,
        ACTI.descripcion
        FROM activos_tarea ACT
        LEFT JOIN tareas T ON ACT.idtarea = T.idtarea 
        LEFT JOIN activos ACTI ON ACT.idactivo = ACTI.idactivo
        WHERE T.idtarea = _idtarea
        ORDER BY ACT.idactivos_tarea DESC;
END $$

call obtenerActivosPorTarea(5)
