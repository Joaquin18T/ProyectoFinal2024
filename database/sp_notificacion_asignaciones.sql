use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_notificacion_asignacion;
DELIMITER $$
CREATE PROCEDURE sp_add_notificacion_asignacion
(
	OUT _idnotificacion INT,
    IN _idactivo_asig INT,
    IN _tipo VARCHAR(50),
    IN _mensaje VARCHAR (250)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO notificaciones_asignaciones(idactivo_asig, tipo,mensaje) VALUES
    (_idactivo_asig,_tipo, _mensaje);
    
	IF existe_error= 1 THEN
		SET _idnotificacion = -1;
	ELSE
        SET _idnotificacion = last_insert_id();
	END IF;
END $$

-- CALL sp_add_notificacion_asignacion(@idnof, 1, 'Asignacion a un area', 'Se ha asignado un activo a un area que eres responsable');
-- SELECT @idnof as idnof;

DROP PROCEDURE IF EXISTS sp_listar_notificacion_by_responsable_area;
DELIMITER $$
CREATE PROCEDURE sp_listar_notificacion_by_responsable_area
(
	IN _idusuario INT
)
BEGIN 
	SELECT 
		N.idnotificacion_activo, N.mensaje, N.tipo, N.fecha_creacion, N.visto,
        A.descripcion
        FROM notificaciones_asignaciones N
        INNER JOIN activos_asignados AA ON N.idactivo_asig = AA.idactivo_asig
        INNER JOIN activos A ON AA.idactivo = A.idactivo
        INNER JOIN areas AR ON AA.idarea = AR.idarea
        INNER JOIN usuarios U ON AR.idarea = U.idarea
        WHERE U.responsable_area = 1 AND U.idusuario = 20 
        ORDER BY N.fecha_creacion DESC;
END $$

DROP PROCEDURE IF EXISTS sp_detalle_notificacion_asignacion;
DELIMITER $$
CREATE PROCEDURE sp_detalle_notificacion_asignacion
(
	IN _idnotificacion INT
)
BEGIN
	SELECT
		N.fecha_creacion,
		C.categoria,
		S.subcategoria,
		M.marca,
		A.modelo, A.cod_identificacion, A.fecha_adquisicion, A.especificaciones,
		E.nom_estado,
        AA.condicion_asig,
        HA.coment_adicional, HA.idresponsable, HA.fecha_movimiento
        FROM historial_asignaciones_activos HA
        INNER JOIN activos_asignados AA ON HA.idactivo_asig = AA.idactivo_asig
        INNER JOIN notificaciones_asignaciones N ON AA.idactivo_asig = N.idactivo_asig
		INNER JOIN activos A ON AA.idactivo = A.idactivo
		INNER JOIN marcas M ON A.idmarca = M.idmarca
		INNER JOIN estados E ON A.idestado = E.idestado
		INNER JOIN subcategorias S ON A.idsubcategoria = S.idsubcategoria
		INNER JOIN categorias C ON S.idcategoria = C.idcategoria
        WHERE idnotificacion_asig = _idnotificacion;
END $$

DROP PROCEDURE IF EXISTS sp_update_visto;
DELIMITER $$
CREATE PROCEDURE sp_update_visto
(
	IN _idnotificacion INT,
    IN _visto TINYINT
)
BEGIN
	UPDATE notificaciones_asignaciones SET
	visto = _visto,
    update_at = NOW()
    WHERE idnotificacion_asig = _idnotificacion;
END $$

-- ACTUALIZAR EL CAMPO VISTA