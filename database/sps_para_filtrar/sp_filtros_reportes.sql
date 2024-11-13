use db_cmms;

DROP PROCEDURE IF EXISTS `sp_filtrar_activos_registrados`;
DELIMITER $$
CREATE PROCEDURE `sp_filtrar_activos_registrados` (
    IN _fecha_inicio DATE,
    IN _fecha_fin DATE
)
BEGIN
    SELECT 
        ACT.cod_identificacion,
        ACT.descripcion,
        MAR.marca,
        SUBC.subcategoria,
        AR.area,
        ACTSIG.fecha_asignacion
    FROM activos_asignados ACTSIG
    INNER JOIN activos ACT ON ACT.idactivo = ACTSIG.idactivo
    INNER JOIN areas AR ON AR.idarea = ACTSIG.idarea
    INNER JOIN marcas MAR ON MAR.idmarca = ACT.idmarca
    INNER JOIN subcategorias SUBC ON SUBC.idsubcategoria = ACT.idsubcategoria
    WHERE (_fecha_inicio IS NULL OR ACTSIG.fecha_asignacion >= _fecha_inicio)
      AND (_fecha_fin IS NULL OR ACTSIG.fecha_asignacion <= _fecha_fin);
END $$

-- call sp_filtrar_activos_registrados('2022-01-14',null)

DROP PROCEDURE IF EXISTS `sp_filtrar_areas_activo`;
DELIMITER $$
CREATE PROCEDURE `sp_filtrar_areas_activo` (
    IN _fecha_inicio DATE,
    IN _fecha_fin DATE
)
BEGIN
    SELECT 
		HAA.fecha_movimiento,
        AR.area,
        USU.nom_usuario
    FROM historial_asignaciones_activos HAA
    INNER JOIN activos_asignados ACTS ON ACTS.idactivo_asig = HAA.idactivo_asig
    INNER JOIN areas AR ON AR.idarea = ACTS.idarea
    INNER JOIN usuarios USU ON USU.idusuario = HAA.idresponsable
    WHERE (_fecha_inicio IS NULL OR HAA.fecha_movimiento >= _fecha_inicio)
      AND (_fecha_fin IS NULL OR HAA.fecha_movimiento <= _fecha_fin);
END $$

-- call sp_filtrar_areas_activo('2024-11-13',null)

DROP PROCEDURE IF EXISTS `sp_filtrar_areas_usuario`;
DELIMITER $$
CREATE PROCEDURE `sp_filtrar_areas_usuario` (
    IN _fecha_inicio DATE,
    IN _fecha_fin DATE
)
BEGIN
    SELECT 
		HAU.idhistorial_usuario,
        HAU.fecha_inicio,
        AR.area
    FROM historial_areas_usuarios HAU
    INNER JOIN areas AR ON AR.idarea = HAU.idarea
    WHERE (_fecha_inicio IS NULL OR HAU.fecha_inicio >= _fecha_inicio)
      AND (_fecha_fin IS NULL OR HAU.fecha_inicio <= _fecha_fin);
END $$

-- call sp_filtrar_areas_usuario('2024-10-07',null)

DROP PROCEDURE IF EXISTS `sp_filtrar_mantenimientos_activos`;
DELIMITER $$
CREATE PROCEDURE `sp_filtrar_mantenimientos_activos` (
    IN _idactivo     INT,
    IN _fecha_inicio DATE,
    IN _fecha_fin    DATE
)
BEGIN
    SELECT 
        ACTAR.idactivos_tarea,
        ACTAR.idactivo,
        ACTAR.idtarea,
        ACT.descripcion AS activo,
        TARM.descripcion,
        TARM.tiempo_ejecutado,
        TARM.fecha_inicio,
        TARM.fecha_finalizado
    FROM activos_tarea ACTAR
    INNER JOIN activos ACT ON ACT.idactivo = ACTAR.idactivo
    INNER JOIN tareas TAR ON TAR.idtarea = ACTAR.idtarea
    INNER JOIN tareas_mantenimiento TARM ON TARM.idtarea = TAR.idtarea
    WHERE (_idactivo IS NULL OR ACTAR.idactivo = _idactivo)
      AND (_fecha_inicio IS NULL OR TARM.fecha_inicio >= _fecha_inicio)
      AND (_fecha_fin IS NULL OR TARM.fecha_finalizado <= _fecha_fin);
END $$

-- call sp_filtrar_mantenimientos_activos(null,'2024-11-04',null)
