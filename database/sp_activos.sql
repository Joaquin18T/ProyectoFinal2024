use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_activo;
DELIMITER $$
CREATE PROCEDURE sp_add_activo
(
	OUT _idactivo	INT,
	IN _idsubcategoria INT,
	IN _idmarca INT,
    IN _modelo VARCHAR(60),
    IN _cod_identificacion CHAR(40),
    IN _descripcion VARCHAR(200),
    IN _especificaciones JSON
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
	INSERT INTO activos(idsubcategoria, idmarca, modelo, cod_identificacion, descripcion, especificaciones) VALUES
		(_idsubcategoria, _idmarca, _modelo, _cod_identificacion, _descripcion, _especificaciones);
        
	IF existe_error= 1 THEN
		SET _idactivo = -1;
	ELSE
        SET _idactivo = last_insert_id();
	END IF;
END $$

-- CALL sp_add_activo (@idactivo,1, 5, 'DR 5', 'D435K-344-FF3', NOW(), 'Impresora HP DR5', '{"conexion": "wifi"}');
-- select @idactivo as idactivo;

DROP PROCEDURE IF EXISTS sp_update_activo;
DELIMITER $$
CREATE PROCEDURE sp_update_activo
(
	IN _idactivo	INT,
    IN _modelo VARCHAR(60),
    IN _descripcion VARCHAR(200),
    IN _especificaciones JSON
)
BEGIN
	UPDATE activos SET
    modelo = _modelo,
    descripcion = _descripcion,
    especificaciones = _especificaciones,
    update_at = NOW()
    WHERE idactivo = _idactivo;
END $$

-- CALL sp_update_activo (1, 'DR 7', 'Impresora HP DR 7','{"conexion": "wifi"}');

DROP PROCEDURE IF EXISTS sp_filtrar_activos;
DELIMITER $$
CREATE PROCEDURE sp_filtrar_activos
(
	IN _idestado INT,
    IN _idcategoria INT,
    IN _idsubcategoria INT,
    IN _idmarca INT,
    IN _modelo VARCHAR(60),
    IN _cod_identificacion VARCHAR(40),
    IN _idarea INT,
	IN _fecha_adquisicion DATE,
    IN _fecha_adquisicion_fin DATE
)
BEGIN
	SELECT
    A.idactivo,
    C.categoria,
    S.subcategoria,
    M.marca,
    A.modelo, A.cod_identificacion, A.fecha_adquisicion, A.especificaciones,
    E.nom_estado,
    AR.area
    FROM activos_asignados AA
    INNER JOIN areas AR ON AA.idarea = AR.idarea
    INNER JOIN activos A ON AA.idactivo = A.idactivo
    INNER JOIN marcas M ON A.idmarca = M.idmarca
    INNER JOIN estados E ON A.idestado = E.idestado
    INNER JOIN subcategorias S ON A.idsubcategoria = S.idsubcategoria
    INNER JOIN categorias C ON S.idcategoria = C.idcategoria
    WHERE AA.idestado = 14
    AND (E.idestado = _idestado OR _idestado IS NULL)
    AND (C.idcategoria = _idcategoria OR _idcategoria IS NULL)
    AND (S.idsubcategoria = _idsubcategoria OR _idsubcategoria IS NULL)
    AND (M.idmarca = _idmarca OR _idmarca IS NULL)
    AND (A.modelo LIKE CONCAT('%', _modelo, '%') OR _modelo IS NULL)
    AND (A.cod_identificacion LIKE CONCAT('%', _cod_identificacion, '%') OR _cod_identificacion IS NULL)
    AND (AR.idarea = _idarea OR _idarea IS NULL)
    AND (A.fecha_adquisicion>=_fecha_adquisicion AND A.fecha_adquisicion<=_fecha_adquisicion_fin OR _fecha_adquisicion IS NULL OR _fecha_adquisicion_fin IS NULL)
    ORDER BY A.create_at ASC;
END $$

-- CALL sp_filtrar_activos(null,null,null,null,NULL,null,null,null,null);

DROP PROCEDURE IF EXISTS sp_get_activo_by_id;
DELIMITER $$
CREATE PROCEDURE sp_get_activo_by_id
(
	IN _idactivo INT
)
BEGIN
	SELECT
    C.categoria,
    S.subcategoria,
    M.marca,
    A.modelo, A.cod_identificacion, A.fecha_adquisicion, A.especificaciones,
    E.nom_estado
    FROM activos A
    INNER JOIN marcas M ON A.idmarca = M.idmarca
    INNER JOIN estados E ON A.idestado = E.idestado
    INNER JOIN subcategorias S ON A.idsubcategoria = S.idsubcategoria
    INNER JOIN categorias C ON S.idcategoria = C.idcategoria
    WHERE A.idactivo = _idactivo;
END $$

CALL sp_get_activo_by_id(1);

DROP PROCEDURE IF EXISTS sp_update_estado_activo;
DELIMITER $$
CREATE PROCEDURE sp_update_estado_activo
(
	IN _idactivo INT,
    IN _idestado INT
)
BEGIN
	UPDATE activos SET
    idestado = _idestado
    WHERE idactivo = _idactivo;
END $$

-- CALL sp_update_estado_activo(1,5);