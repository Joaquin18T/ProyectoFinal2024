USE db_cmms;

DROP PROCEDURE IF EXISTS sp_add_notificacion_usuario;
DELIMITER $$
CREATE PROCEDURE sp_add_notificacion_usuario
(
	OUT _idnotificacion INT,
    IN _idusuario INT,
    IN _idarea INT,
    IN _tipo VARCHAR(50),
    IN _mensaje VARCHAR (250)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
	INSERT INTO notificaciones_usuarios (idusuario, idarea, tipo, mensaje) VALUES
		(_idusuario, _idarea, _tipo, _mensaje);
        
	IF existe_error= 1 THEN
		SET _idnotificacion = -1;
	ELSE
        SET _idnotificacion = last_insert_id();
	END IF;
END $$

-- CALL sp_add_notificacion_usuario (@idnotf,25, 'Asignacion a un area', 'Han asignado a un usuario');
-- SELECT @idnotf;

DROP PROCEDURE IF EXISTS sp_listar_notificacion_usuario;
DELIMITER $$
CREATE PROCEDURE sp_listar_notificacion_usuario
(
	IN _idusuario INT,
	IN _idarea INT
)
BEGIN
	SELECT
		NU.idnotificacion_usuario,NU.mensaje, NU.fecha_creacion, NU.tipo, NU.visto
        FROM notificaciones_usuarios NU
        INNER JOIN usuarios U ON NU.idarea = U.idarea
        WHERE NU.idarea = _idarea AND U.idusuario = _idusuario AND U.responsable_area = 1
        ORDER BY NU.fecha_creacion DESC;
END $$

-- CALL sp_listar_notificacion_usuario(20)

DROP PROCEDURE IF EXISTS sp_detalle_notificacion_usuario;
DELIMITER $$
CREATE PROCEDURE sp_detalle_notificacion_usuario
(
	IN _idnotificacion INT
)
BEGIN
	SELECT
		NU.fecha_creacion,
		U.nom_usuario, P.apellidos, P.nombres, P.telefono,
		PER.perfil
		FROM notificaciones_usuarios NU
        INNER JOIN usuarios U ON NU.idusuario = U.idusuario
        INNER JOIN personas P ON U.idusuario = P.id_persona
        INNER JOIN perfiles PER ON U.idperfil = PER.idperfil
        WHERE NU.idnotificacion_usuario = _idnotificacion;
END $$

-- CALL sp_detalle_notificacion_usuario(1)