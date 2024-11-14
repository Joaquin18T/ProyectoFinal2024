use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_activo_asignado;
DELIMITER $$
CREATE PROCEDURE sp_add_activo_asignado
(
	OUT _idactivo_asig INT,
    IN _idarea INT ,
    IN _idactivo INT,
    IN _condicion_asig VARCHAR(500),
    IN _imagenes JSON,
    IN _idestado INT
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
	INSERT INTO activos_asignados (idarea, idactivo, condicion_asig, imagenes, idestado) VALUES 
    (_idarea, _idactivo, _condicion_asig, _imagenes, _idestado);
    
	IF existe_error= 1 THEN
		SET _idactivo_asig = -1;
	ELSE
        SET _idactivo_asig = last_insert_id();
	END IF;
END $$
-- CALL sp_add_activo_asignado(@idactivo_asig, 2,2, 'En buen estado', '{"imagen 1":"impresora_estado.png"}', 5);

DELIMITER $$
CREATE PROCEDURE sp_contar_cambios_ubicacion
(
	IN _idactivo INT
)
BEGIN 
	SELECT COUNT(*) as cantidad FROM activos_asignados
    WHERE idactivo = _idactivo;
END $$

DROP PROCEDURE IF EXISTS sp_validar_cambio_area;
DELIMITER $$
CREATE PROCEDURE sp_validar_cambio_area
(
	IN _idactivo INT,
    IN _idestado INT
)
BEGIN 
	UPDATE activos_asignados SET
    idestado = _idestado
    WHERE idactivo= _idactivo;
END $$
-- sp de agg historial
-- validar que si hay asignaciones anteriores de un activo para actualizar la asignacion a 6

DROP PROCEDURE IF EXISTS sp_filtrar_activosAsignados
DELIMITER $$
CREATE PROCEDURE sp_filtrar_activosAsignados
(
    IN _idsubcategoria INT
)
BEGIN 
	select
		ACTAS.idactivo_asig,
        ACT.cod_identificacion,
        ACT.idactivo,
        ACT.descripcion,
        MAR.marca,
        ACT.modelo
	from activos_asignados ACTAS
    INNER JOIN activos ACT ON ACT.idactivo = ACTAS.idactivo
    INNER JOIN subcategorias SUBC ON SUBC.idsubcategoria = ACT.idsubcategoria
    INNER JOIN categorias CAT ON CAT.idcategoria = SUBC.idcategoria
    INNER JOIN marcas MAR ON MAR.idmarca = ACT.idmarca
    WHERE ACT.idsubcategoria = _idsubcategoria AND ACT.idestado = 3;
END $$
call sp_filtrar_activosAsignados(12);
select * from estados;
select * from subcategorias;