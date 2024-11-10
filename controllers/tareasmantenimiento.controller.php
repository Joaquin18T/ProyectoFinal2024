<?php

require_once '../models/TareasMantenimiento.php';

$tm = new TareasMantenimiento();


if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'obtenerMantenimientosActivo':
            echo json_encode($tm->obtenerMantenimientosActivo(['idactivo' => $_GET['idactivo']]));
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
    }
}
