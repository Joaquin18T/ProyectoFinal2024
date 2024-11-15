use db_cmms;

DROP PROCEDURE IF EXISTS `sp_filtrar_activos_registrados`;
DELIMITER $$
CREATE PROCEDURE `sp_filtrar_activos_registrados` (
	IN _idarea 		INT,
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
      AND (_fecha_fin IS NULL OR ACTSIG.fecha_asignacion <= _fecha_fin)
      AND (_idarea IS NULL OR AR.idarea = _idarea);
END $$

-- call sp_filtrar_activos_registrados(1 ,null, null);

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
-- este sp muestra todas las areas en la que estuvo un activo
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
        MAR.idatm AS id_mantenimiento_activo,
        MAR.idactivo,
        MAR.idtm AS id_tarea_mantenimiento,
        ACT.descripcion AS activo,
        TM.descripcion AS descripcion_mantenimiento,
        TM.tiempo_ejecutado,
        TM.fecha_inicio,
        TM.fecha_finalizado,
        U.idusuario,
        P.nombres AS nombre_responsable,
        P.apellidos AS apellido_responsable,
        P.telefono AS telefono_responsable
    FROM mantenimiento_activos_responsables MAR
    INNER JOIN activos ACT ON ACT.idactivo = MAR.idactivo
    INNER JOIN tareas_mantenimiento TM ON TM.idtm = MAR.idtm
    INNER JOIN usuarios U ON U.idusuario = MAR.idusuario
    INNER JOIN personas P ON P.id_persona = U.idpersona
    WHERE (_idactivo IS NULL OR MAR.idactivo = _idactivo)
      AND (_fecha_inicio IS NULL OR TM.fecha_inicio >= _fecha_inicio)
      AND (_fecha_fin IS NULL OR TM.fecha_finalizado <= _fecha_fin);
END $$
DELIMITER ;


select * from tareas_mantenimiento;
-- call sp_filtrar_mantenimientos_activos(14,'2024-11-04',null)
