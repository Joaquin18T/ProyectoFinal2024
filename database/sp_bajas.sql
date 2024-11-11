USE db_cmms;

DROP PROCEDURE IF EXISTS sp_add_baja;
DELIMITER $$
CREATE PROCEDURE sp_add_baja
(
	OUT _idbaja INT,
    IN _idactivo INT,
    IN _motivo VARCHAR(250),
    IN _coment_adicional VARCHAR(250),
    IN _ruta_doc VARCHAR(250),
    IN _idusuario_aprobacion INT
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO bajas_activo (idactivo, motivo, coment_adicionales, ruta_doc, idusuario_aprobacion) VALUES
    (_idactivo, _motivo, NULLIF(_coment_adicional, ''), _ruta_doc, _idusuario_aprobacion);
    
	IF existe_error= 1 THEN
		SET _idbaja = -1;
	ELSE
        SET _idbaja = last_insert_id();
	END IF;
END $$

-- CALL sp_add_baja(@idbaja, 2, 'Problemas con su motor', null, 'doc/pdf_baja.pdf',1);
-- SELECT @idbaja as idbaja;