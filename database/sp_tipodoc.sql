-- CREAR NUEVOS TIPOS DE DOCUMENTOS
use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_tipo_documento;
DELIMITER $$
CREATE PROCEDURE sp_add_tipo_documento
(
	OUT _idtipodoc INT,
    IN _tipodoc VARCHAR(50)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO tipo_doc (tipodoc) VALUES
    (_tipodoc);
    
	IF existe_error= 1 THEN
		SET _idtipodoc = -1;
	ELSE
        SET _idtipodoc = last_insert_id();
	END IF;
END $$

-- CALL sp_add_tipo_documento(@idtipodoc,'Carnet de Extranjería');
-- select @idtipodoc as tipodoc