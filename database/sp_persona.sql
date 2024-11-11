-- PERSONAS
use db_cmms;

DROP PROCEDURE IF EXISTS sp_add_persona;
DELIMITER $$
CREATE PROCEDURE sp_add_persona
(
	OUT _idpersona INT,
    IN _idtipodoc INT,
    IN _num_doc	VARCHAR(20),
    IN _apellidos VARCHAR(100),
    IN _nombres VARCHAR(100),
    IN _genero	CHAR(1),
    IN _telefono CHAR(15)
)
BEGIN
	DECLARE existe_error INT DEFAULT 0;

	DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
	BEGIN
        SET existe_error = 1;
	END;
    
    INSERT INTO personas (idtipodoc, num_doc, apellidos, nombres, genero, telefono)VALUES
    (_idtipodoc, _num_doc, _apellidos, _nombres, _genero, _telefono);
    
	IF existe_error= 1 THEN
		SET _idpersona = -1;
	ELSE
        SET _idpersona = last_insert_id();
	END IF;
END $$

-- CALL sp_add_persona(@idpersona, 1, '34534233', 'Valdez Saravia', 'Lucas', 'M', '973485344');
-- SELECT @idpersona as idpersona;

DROP PROCEDURE IF EXISTS sp_update_persona;
DELIMITER $$
CREATE PROCEDURE sp_update_persona
(
	IN _idpersona INT,
    IN _idtipodoc INT,
    IN _num_doc	VARCHAR(20),
    IN _apellidos VARCHAR(100),
    IN _nombres VARCHAR(100),
    IN _genero	CHAR(1),
    IN _telefono CHAR(15)
)
BEGIN
	UPDATE personas SET
	idtipodoc = _idtipodoc,
    num_doc = _num_doc,
    apellidos = _apellidos,
    nombres = _nombres,
    genero = _genero,
    telefono = _telefono,
    update_at = NOW()
    WHERE id_persona = _idpersona;
END $$
-- CALL sp_update_persona(4,1,'95858344', 'Valdez Saravia', 'Luka', 'M', '987485783');

DROP PROCEDURE IF EXISTS sp_search_persona_by_id;
DELIMITER $$
CREATE PROCEDURE sp_search_persona_by_id
(
	IN _idpersona INT
)
BEGIN
	SELECT idtipodoc, num_doc, apellidos, nombres, genero, telefono
    FROM personas
    WHERE id_persona = _idpersona;
END $$
-- CALL sp_search_persona_by_id(2);
