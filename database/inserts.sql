USE db_cmms;

-- ALTER TABLE usuarios AUTO_INCREMENT = 1;
INSERT INTO modulos (modulo) VALUES
	('usuarios'),
	('activos'),
	('asignaciones'),
	('bajas'),
    ('reportes'),
    ('configuracion'); -- ONLY ADMIN

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
    
        -- REPORTES
	(5, 'reporte','1','Reportes',''), -- FILTRADO POR ESTADO, FECHA REGISTRO, ETC.
	(5, 'reporte-activo','0','R. de activos',''),
	(5, 'reporte-mantenimiento','0','R. de mantenimiento',''),

	-- Configuracion (se registrara nuevas categorias, subcategorias, marcas, areas, etc.)
	(6,'gestion-data', '1', 'Gestion', '');


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
    (1,8),
    (1,9),
-- USUARIOS
	(2,1),
	(2,6),
	(2,7),
	(2,8);

INSERT INTO tipo_doc(tipodoc) VALUES
	('dni'),
    ('Carnet de extranjeria');
    
INSERT INTO areas (area) VALUES
('Lugar 1'),
('Lugar 2'),
('Lugar 3');

INSERT INTO tipo_estados(tipo_estado) VALUES
	('usuario'),
    ('activo'),
    ('responsable'),
    ('tarea'),
    ('ubicacion');

INSERT INTO estados (idtipo_estado, nom_estado) VALUES
	(1,'Habilitado'),
	(1,'Inhabilitado'),
	(2, 'Activo'),
	(2, 'En Mantenimiento'),
	(2, 'Fuera de Servicio'),
	(2, 'Absoleto'),
	(2, 'Baja'),
	(3, 'Asignado'),
	(3, 'No Asignado'),
	(4, 'pendiente'),
	(4, 'proceso'),
	(4, 'revision'),
	(4, 'finalizado'),
    (5, 'ubicacion actual'),
    (5, 'cambio de ubicacion');

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
 
-- SELECT*FROM USUARIOS
update usuarios set claveacceso = '$2y$10$5ImJFOxfRveSsORgTQNs5eFxQKLiP5lK9SgLdkRWKxiAViBF7dx9u' where idusuario = 1; -- clave: 1234
update usuarios set claveacceso = '$2y$10$5ImJFOxfRveSsORgTQNs5eFxQKLiP5lK9SgLdkRWKxiAViBF7dx9u' where idusuario = 2; -- clave: 1234
update usuarios set claveacceso = '$2y$10$5ImJFOxfRveSsORgTQNs5eFxQKLiP5lK9SgLdkRWKxiAViBF7dx9u' where idusuario = 3; -- clave: 1234

INSERT INTO categorias(categoria)
	VALUES
	('Equipos de computo'),
    ('Vehiculos'),
    ('Inmobiliario de oficina'),
    ('Equipos de redes y conectividad');

INSERT INTO subcategorias(idcategoria, subcategoria)
	VALUES
		(1, 'Cpu'),
		(1, 'Laptops'),
        (1, 'Impresoras'),
        (1, 'Monitores'),
		(1, 'Teclados'),
		(2, 'Camiones'),
        (2, 'Camionetas'),
        (2,	'Motocicletas'),
        (3, 'Asientos ergonomicos'),
        (3, 'Mamparas'),
        (3, 'Muebles'),
        (4, 'Medidores de cableado'),
		(4, 'Routers'),
        (4, 'Switches');        
        

INSERT INTO marcas(marca)
VALUES
    ('Dell'),             -- Relacionado con laptops, monitores y estaciones de trabajo.
    ('HP'),               -- Relacionado con computadoras de escritorio, impresoras y estaciones de trabajo.
    ('Logitech'),         -- Relacionado con teclados y ratones.
    ('Lenovo'),           -- Relacionado con laptops y estaciones de trabajo.
    ('Samsung'),          -- Relacionado con monitores y pantallas.
    ('Canon'),            -- Relacionado con impresoras.
    ('Toyota'),           -- Relacionado con vehículos de transporte.
    ('Ford'),             -- Relacionado con camionetas y vehículos de transporte.
    ('Cisco'),            -- Relacionado con equipos de redes y conectividad.
    ('TP-Link'),          -- Relacionado con routers y switches.
    ('Herman Miller'),    -- Relacionado con mobiliario de oficina (sillas y escritorios).
    ('IKEA'),             -- Relacionado con mobiliario de oficina (escritorios, sillas, y estanterías).
    ('Steelcase')         -- Relacionado con mobiliario de oficina (escritorios y estaciones de trabajo).
;

INSERT INTO detalles_marca_subcategoria (idsubcategoria, idmarca)
VALUES
    -- Equipos de Computo
    (1, 1),   -- Laptop - Dell
    (1, 2),   -- Laptop - HP
    (1, 4),   -- Laptop - Lenovo
    (2, 2),   -- Computadora de Escritorio - HP
    (2, 1),   -- Computadora de Escritorio - Dell
    (2, 4),   -- Computadora de Escritorio - Lenovo
    (3, 3),   -- Teclado - Logitech
    (3, 5),   -- Monitor - Samsung
    (4, 5),   -- Monitor - Samsung
    (4, 1),   -- Monitor - Dell
    (4, 4),   -- Monitor - Lenovo
    (5, 2),   -- Impresora - HP
    (5, 6),   -- Impresora - Canon

    -- Vehículos
    (6, 7),   -- Camión - Toyota
    (7, 8),   -- Camioneta - Ford
    (7, 7),   -- Camioneta - Toyota

    -- Equipos de Redes y Conectividad
    (8, 9),   -- Router - Cisco
    (8, 10),  -- Router - TP-Link
    (9, 9),   -- Switch - Cisco
    (9, 10),  -- Switch - TP-Link

    -- Mobiliario de Oficina
    (10, 11), -- Escritorio - Herman Miller
    (10, 12), -- Escritorio - IKEA
    (11, 11), -- Silla - Herman Miller
    (11, 13), -- Silla - Steelcase
    (12, 12), -- Estantería - IKEA
    (12, 13); -- Estantería - Steelcase
    
    
INSERT INTO activos(idsubcategoria, idmarca, modelo, cod_identificacion, fecha_adquisicion, descripcion, especificaciones, idestado)
VALUES
    (1, 1, 'Dell Optiplex 3020', 'EQ-001', '2022-01-15', 'CPU de oficina', '{"procesador":"Intel i5", "ram":"8GB", "disco":"256GB SSD"}', 3),
    (1, 2, 'HP ProDesk 400', 'EQ-002', '2023-05-22', 'CPU para uso administrativo', '{"procesador":"Intel i3", "ram":"4GB", "disco":"500GB HDD"}', 3),
    (2, 3, 'MacBook Air M1', 'EQ-003', '2023-02-10', 'Laptop para diseño', '{"procesador":"Apple M1", "ram":"8GB", "disco":"256GB SSD"}', 3),
    (2, 1, 'Dell Latitude 5510', 'EQ-004', '2022-12-01', 'Laptop para oficina', '{"procesador":"Intel i7", "ram":"16GB", "disco":"512GB SSD"}', 3),
    (3, 2, 'HP LaserJet Pro MFP M428', 'EQ-005', '2021-11-17', 'Impresora multifunción', '{"tipo":"Blanco y negro", "conectividad":"red, WiFi"}', 3),
    (4, 4, 'Samsung Odyssey G5', 'EQ-006', '2022-08-30', 'Monitor de alta resolución', '{"tamano":"32 pulgadas", "resolucion":"2560x1440", "frecuencia":"144Hz"}', 3),
    (5, 5, 'Logitech MK345', 'EQ-007', '2023-03-25', 'Teclado y mouse inalámbrico', '{"conectividad":"USB"}', 3),
    (6, 3, 'Ford F-150', 'VE-001', '2021-10-10', 'Camión para transporte de carga', '{"motor":"V6", "capacidad_asientos":"5"}', 3),
    (7, 2, 'Toyota Hilux', 'VE-002', '2020-07-15', 'Camioneta para trabajo pesado', '{"motor":"diésel 2.8L", "capacidad_asientos":"5"}', 3),
    (8, 1, 'Yamaha MT-07', 'VE-003', '2022-03-12', 'Motocicleta para patrullaje', '{"motor":"689cc", "transmision":"manual"}', 3),
    (9, 5, 'Silla Ergonomica A12', 'OF-001', '2023-06-18', 'Asiento ergonómico para oficina', '{"ajustes":"altura, respaldo lumbar"}', 3),
    (10, 4, 'Mampara Divisora 200', 'OF-002', '2022-09-05', 'Mampara para división de espacios', '{"material":"Aluminio y vidrio templado"}', 3),
    (11, 2, 'Mesa de Trabajo Madera', 'OF-003', '2023-04-01', 'Mueble de oficina', '{"dimensiones":"120x60 cm", "acabado":"madera"}', 3),
    (12, 6, 'Tester de Cableado', 'RD-001', '2021-01-10', 'Medidor de redes para cableado estructurado', '{"funcionalidad":"multifuncional", "pantalla":"LCD"}', 3),
    (13, 2, 'Cisco RV340', 'RD-002', '2022-02-22', 'Router empresarial', '{"puertos_wan":"2", "puertos_lan":"4"}', 3),
    (14, 3, 'Netgear GS308', 'RD-003', '2022-12-15', 'Switch de 8 puertos', '{"velocidad":"1Gbps"}', 3),
    (4, 1, 'LG UltraGear', 'EQ-008', '2021-06-21', 'Monitor de alta definición', '{"tamano":"27 pulgadas", "resolucion":"1920x1080", "frecuencia":"144Hz"}', 3),
    (5, 2, 'Razer BlackWidow', 'EQ-009', '2023-01-10', 'Teclado mecánico para oficina', '{"tipo":"mecánico", "iluminacion":"RGB"}', 3),
    (3, 4, 'Canon ImageClass MF264dw', 'EQ-010', '2023-02-28', 'Impresora multifunción', '{"tecnologia":"laser", "funciones":"escaneo, copia"}', 3),
    (6, 5, 'Mack Anthem', 'VE-004', '2022-05-19', 'Camión de carga pesada', '{"motor":"diesel", "cabina":"extendida"}', 3),
    (9, 1, 'Silla Executiva A3', 'OF-004', '2023-03-18', 'Silla ejecutiva de oficina', '{"ajuste":"lumbar", "material":"cuero sintético"}', 3),
    (10, 3, 'Panel Divisor', 'OF-005', '2023-05-20', 'Mampara para oficina', '{"color":"gris", "material":"madera y acero"}', 3),
    (11, 2, 'Escritorio Esquinero', 'OF-006', '2023-04-25', 'Mueble para oficina', '{"dimensiones":"150x150 cm", "acabado":"roble"}', 3),
    (8, 4, 'Ducati Monster 821', 'VE-005', '2022-02-10', 'Motocicleta para patrullaje', '{"motor":"821cc", "transmision":"manual"}', 3),
    (2, 3, 'HP Pavilion', 'EQ-011', '2023-06-15', 'Laptop para diseño', '{"procesador":"Intel i5", "ram":"16GB", "disco":"512GB SSD"}', 3),
    (1, 2, 'Lenovo ThinkCentre M710', 'EQ-012', '2022-07-10', 'CPU para uso administrativo', '{"procesador":"Intel i7", "ram":"8GB", "disco":"500GB HDD"}', 3),
    (13, 5, 'Huawei AR1220', 'RD-004', '2023-03-30', 'Router de oficina', '{"seguridad":"integrada", "puertos":"4"}', 3),
    (14, 4, 'D-Link DGS-1016D', 'RD-005', '2022-10-01', 'Switch de 16 puertos', '{"puertos":"16", "velocidad":"1Gbps"}', 3),
    (12, 3, 'Fluke DTX-1800', 'RD-006', '2023-01-10', 'Medidor de cableado para redes', '{"capacidad":"hasta Cat 6A"}', 3),
    (6, 4, 'Chevrolet Silverado', 'VE-006', '2021-12-11', 'Camioneta para trabajo', '{"motor":"V8", "capacidad_asientos":"6"}', 6),
    (3,3, 'Teclado Logitech D4', 'FR5-345K', '2023-08-10', 'Teclado para empleados', '{"tipo":"mecanico"}', 6);
    

INSERT INTO activos_asignados (idarea, idactivo, condicion_asig, imagenes, idestado)
VALUES
    (1, 1, 'Asignado para uso general en el departamento de TI', '{"img1": "imagen1.jpg"}', 14),
    (2, 2, 'Asignado para el área administrativa', '{"img2": "imagen2.jpg"}', 14),
    (3, 3, 'En mantenimiento preventivo', '{"img3": "imagen3.jpg"}', 14);

INSERT INTO historial_asignaciones_activos (idactivo_asig, idresponsable, coment_adicional)
VALUES
    (1, 1, 'Inicialmente asignado al área de TI para soporte técnico'),
    (2, 1, 'Reasignado para trabajos administrativos'),
    (3, 1, 'Enviado a mantenimiento preventivo');

INSERT INTO notificaciones_asignaciones (idactivo_asig, tipo, mensaje)
VALUES
    (1, 'Asignación', 'Activo asignado a departamento de TI'),
    (2, 'Reasignación', 'Activo movido a área administrativa'),
    (3, 'Mantenimiento', 'Activo enviado a mantenimiento preventivo');

INSERT INTO bajas_activo (idactivo, motivo, coment_adicionales, ruta_doc, idusuario_aprobacion)
VALUES
    (1, 'Obsolescencia', 'Activo reemplazado por equipo más moderno', 'docs/baja_activo1.pdf', 1),
    (2, 'Daño irreparable', 'Activo dañado sin posibilidad de reparación', 'docs/baja_activo2.pdf', 1),
    (3, 'Fin de vida útil', 'Activo retirado por antigüedad', 'docs/baja_activo3.pdf', 1);
