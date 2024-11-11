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
    WHERE MS.idsubcategoria = _idsubcategoria;
END $$

-- CALL sp_filter_marcas_by_subcategoria(3);