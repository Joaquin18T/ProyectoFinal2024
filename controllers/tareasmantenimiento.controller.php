<?php

require_once '../models/TareasMantenimiento.php';

$tm = new TareasMantenimiento();


if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'obtenerMantenimientosActivo':
            echo json_encode($tm->obtenerMantenimientosActivo(['idactivo' => $_GET['idactivo']]));
            break;

        case 'obtenerMantenimientoPorId':
            echo json_encode($tm->obtenerMantenimientoPorId(['idtm' => $_GET['idtm']]));
            break;

        case 'verificarMantenimientoEjecutado':
            echo json_encode($tm->verificarMantenimientoEjecutado(['idactivo' => $_GET['idactivo']]));
            break;
    }
}


if (isset($_POST['operation'])) {
    switch ($_POST['operation']) {
        case 'registrarTareaMantenimiento':
            $id = -1;
            $datosEnviar = [
                "idtarea"               => $_POST["idtarea"],
                "descripcion"           => $_POST["descripcion"]
            ];

            $id = $tm->registrarTareaMantenimiento($datosEnviar);
            echo json_encode(["id" => $id]);
            break;

        case 'registrar_mar': // manteinimiento activo responsable
            $datosEnviar = [
                "idtm"               => $_POST["idtm"],
                "idactivo"           => $_POST["idactivo"],
                "idusuario"           => $_POST["idusuario"]
            ];

            $registrado = $tm->registrar_mar($datosEnviar);
            echo json_encode(["registrado" => $registrado]);
            break;
            
        case 'actualizarMantenimiento':
            $datosEnviar = [
                "idtm"               => $_POST["idtm"],
                "descripcion"           => $_POST["descripcion"],
                "fechafinalizado"           => $_POST["fechafinalizado"],
                "horafinalizado"           => $_POST["horafinalizado"],
                "tiempoejecutado"           => $_POST["tiempoejecutado"]
            ];

            $actualizado = $tm->actualizarMantenimiento($datosEnviar);
            echo json_encode(["actualizado" => $actualizado]);
            break;
            
    }
}
