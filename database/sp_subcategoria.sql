use db_cmms;

DROP PROCEDURE IF EXISTS sp_filter_marcas_by_subcategoria;
DELIMITER $$
CREATE PROCEDURE sp_filter_marcas_by_subcategoria
(
	IN _idsubcategoria INT
)
BEGIN
	SELECT M.idmarca, M.marca
    FROM marcas M
    INNER JOIN detalles_marca_subcategoria MS ON M.idmarca = MS.idmarca
    WHERE MS.idsubcategoria = _idsubcategoria
    ORDER BY M.idmarca DESC;
END $$

-- CALL sp_filter_marcas_by_subcategoria(3);

-- CATEGORIAS
DROP PROCEDURE IF EXISTS sp_filtrar_subcategorias_by_categorias;
DELIMITER $$
CREATE PROCEDURE sp_filtrar_subcategorias_by_categorias
(
	IN _idcategoria INT
)
BEGIN
	SELECT
		S.subcategoria, S.idsubcategoria
		FROM categorias C
		INNER JOIN subcategorias S ON C.idcategoria = S.idcategoria
		WHERE C.idcategoria = _idcategoria
        ORDER BY C.idcategoria DESC;
END $$
