use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_historial_asignacion;
DELIMITER $$
CREATE PROCEDURE sp_add_historial_asignacion
(
	OUT _idhistorial_activo INT,
    IN _idactivo_asig INT,
    IN _idresponsable INT,
    IN _coment_adicional VARCHAR(500)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO historial_asignaciones_activos (idactivo_asig, idresponsable, coment_adicional) VALUES
    (_idactivo_asig, _idresponsable, _coment_adicional);
    
	IF existe_error= 1 THEN
		SET _idhistorial_activo = -1;
	ELSE
        SET _idhistorial_activo = last_insert_id();
	END IF;
END $$

-- CALL sp_add_historial_asignacion(@idhistorial, 1, 1, 'Asignado al area 2 por uso necesario');
-- SELECT @idhistorial as idhistorial;