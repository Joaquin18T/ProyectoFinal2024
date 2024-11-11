USE db_cmms;

-- ALTER TABLE usuarios AUTO_INCREMENT = 1;
INSERT INTO modulos (modulo) VALUES
	('usuarios'),
	('activos'),
	('asignaciones'),
	('bajas'),
    ('reportes'),
    ('configuracion'); -- ONLY ADMIN
SELECT*FROM modulos;
INSERT INTO vistas(idmodulo, ruta, isVisible, texto, icono) VALUES
	(null, 'home',1,'Inicio',''),
    
    -- USUARIOS
	(1,'listar-usuario', '1', 'Usuario', ''),
    
    -- ACTIVOS
	(2, 'listar-activo', '1', 'Activo', ''),
    
    -- ASIGNACIONES
    (3, 'listar-asignacion', '1', 'Asignacion', ''),
    
    -- BAJAS
    (4, 'listar-activo-baja', '1', 'Baja', ''),
    
	(5, 'reporte-activo','1','reporte de Activos',''), -- FILTRADO POR ESTADO, FECHA REGISTRO, ETC.
    -- (5, 'reporte-area','0','reporte de Areas',''); -- FILTRADO DE ACTIVOS EN CADA AREA, ESTADO.
    
	-- Configuracion (se registrara nuevas categorias, subcategorias, marcas, areas, etc.)
	(6,'gestion-data', '1', 'Gestion', '');
    -- REPORTES
    -- REPORTE - ACTIVOS


	
    
INSERT INTO perfiles (perfil, nombrecorto) VALUES
	('Administrador', 'ADM'),
	('Usuario', 'USR'),
	('Tecnico', 'TNC');
    
    
INSERT INTO permisos(idperfil, idvista) VALUES
-- ADMINISTRADOR
	(1,1),
	(1,2),
	(1,3),
	(1,4),
	(1,5),
    (1,6),
    (1,7),
-- USUARIOS
	(2,1),
	(2,6);
SELECT*FROM vistas;
INSERT INTO tipo_doc(tipodoc) VALUES
	('dni'),
    ('Carnet de extranjeria');
    
INSERT INTO areas (area) VALUES
('Lugar 1'),
('Lugar 2'),
('Lugar 3');

INSERT INTO tipo_estados(tipo_estado) VALUES
	('usuario');

INSERT INTO estados (idtipo_estado, nom_estado) VALUES
	(1,'activo'),
	(1,'inactivo');

-- Insertando en la tabla PERSONAS
INSERT INTO PERSONAS (idtipodoc, num_doc, apellidos, nombres, genero, telefono)VALUES 
(1, '1234567890', 'Gonzalez', 'Juan', 'M', '555-1234'),

(1, '2345678901', 'Martinez', 'Ana', 'F', '555-5678'),

(1, '3456789012', 'Ramirez', 'Luis', 'M', '555-8765');


-- Insertando en la tabla USUARIOS
-- ALTER TABLE usuarios AUTO_INCREMENT = 1;
INSERT INTO USUARIOS (idpersona, nom_usuario, claveacceso, perfil, idperfil, idarea, responsable_area)VALUES 
(1, 'juan.gonzalez','1234', 'ADM', 1, 1, 0),
(2, 'ana.martinez', '4567' , 'USR', 2, 2, 1),
 (3, 'luis.ramirez', '78910',  'TNC', 3, 3, 0);
 
-- SELECT*FROM usuarios


