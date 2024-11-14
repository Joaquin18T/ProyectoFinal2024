use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_historial_usuarios;
DELIMITER $$
CREATE PROCEDURE sp_add_historial_usuarios
(
	OUT _idhistorial_usuario INT,
    IN _idusuario INT,
    IN _idarea INT,
	IN _comentario VARCHAR(500),
    IN _es_responsable TINYINT
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO historial_areas_usuarios(idusuario, idarea, comentario, es_responsable) VALUES
    (_idusuario, _idarea, _comentario, _es_responsable);
    
	IF existe_error= 1 THEN
		SET _idhistorial_usuario = -1;
	ELSE
        SET _idhistorial_usuario = last_insert_id();
	END IF;
END $$

-- CALL sp_add_historial_usuarios(@idhistorial, 1, 1,'');
-- SELECT @idhistorial as idhistorial;

DROP PROCEDURE IF EXISTS sp_verificar_historial_usuario;
DELIMITER $$
CREATE PROCEDURE sp_verificar_historial_usuario
(
	IN _idusuario INT
)
BEGIN
	SELECT fecha_inicio FROM historial_areas_usuarios
    WHERE idusuario = _idusuario
    ORDER BY fecha_inicio ASC
    LIMIT 1;
END $$

-- CALL sp_verificar_historial_usuario(8);

DROP PROCEDURE IF EXISTS sp_update_fecha_fin;
DELIMITER $$
CREATE PROCEDURE sp_update_fecha_fin
(	
	IN _idusuario INT
)
BEGIN
	UPDATE historial_areas_usuarios SET
		fecha_fin = NOW()
	WHERE idusuario = _idusuario AND
    idhistorial_usuario = (
		SELECT MAX(idhistorial_usuario)
        FROM historial_areas_usuarios
        WHERE idusuario = _idusuario
    );
END $$
-- CALL sp_update_fecha_fin(8);
