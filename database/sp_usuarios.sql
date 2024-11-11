DROP PROCEDURE IF EXISTS sp_user_login;
DELIMITER $$
CREATE PROCEDURE sp_user_login
(
	IN _usuario VARCHAR(120)
)
BEGIN
	SELECT
		US.idusuario,
        PE.apellidos, PE.nombres,
        US.nom_usuario,
        US.claveacceso,
        US.perfil,
        US.idperfil
		FROM usuarios US
        INNER JOIN personas PE ON PE.id_persona = US.idpersona
        WHERE US.nom_usuario = _usuario;
END $$

CALL sp_user_login('ana.martinez');


select * from personas