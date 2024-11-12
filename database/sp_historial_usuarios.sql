use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_historial_usuarios;
DELIMITER $$
CREATE PROCEDURE sp_add_historial_usuarios
(
	OUT _idhistorial_usuario INT,
    IN _idusuario INT,
    IN _idarea INT,
	IN _comentario VARCHAR(500)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO historial_areas_usuarios(idusuario, idarea, comentario) VALUES
    (_idusuario, _idarea, nullif(_comentario, ''));
    
	IF existe_error= 1 THEN
		SET _idhistorial_usuario = -1;
	ELSE
        SET _idhistorial_usuario = last_insert_id();
	END IF;
END $$

-- CALL sp_add_historial_usuarios(@idhistorial, 1, 1,'');
-- SELECT @idhistorial as idhistorial;