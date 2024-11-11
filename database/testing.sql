-- PRUEBAS

-- UPDATE usuarios SET claveacceso = '$2y$10$M9oVu51MvWQfjA0Lr6lRZOqHK3lWlz9SPMT/FvG8UfkezBctOpWNK' WHERE idusuario = 2;

SELECT*FROM perfiles;
SELECT*FROM modulos;
SELECT*FROM vistas;
select*from permisos;

-- ALTER TABLE vistas auto_increment = 1;
-- delete from permisos where idpermiso>=1;
-- delete from vistas where idvista>=1;
-- delete from modulos where idmodulo>=1;