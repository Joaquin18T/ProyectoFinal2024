use db_cmms;

DROP PROCEDURE IF EXISTS `sp_registrar_resp_tarea`;
DELIMITER $$
CREATE PROCEDURE `sp_registrar_resp_tarea` (
    IN _idusuario     INT,
    IN _idtarea		  INT
)
BEGIN
    INSERT INTO responsables_tarea (idusuario, idtarea) values (_idusuario, _idtarea);
END $$

call sp_registrar_resp_tarea(6,22);