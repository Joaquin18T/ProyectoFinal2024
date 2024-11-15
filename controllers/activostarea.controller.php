<?php

require_once '../models/ActivosTarea.php';

$activostarea = new ActivosTarea();



if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'obtenerActivosPorTarea':
            $datosEnviar = [
                "idtarea"               => $_GET["idtarea"]
            ];

            echo json_encode($activostarea->obtenerActivosPorTarea($datosEnviar));
            break;
    }
}

if (isset($_POST['operation'])) {
    switch ($_POST['operation']) {
        case 'registrarActivoTarea':
            $id = -1;
            $datosEnviar = [
                "idtarea"               => $_POST["idtarea"],
                "idactivo"          => $_POST["idactivo"]
            ];

            $id = $activostarea->registrarActivoTarea($datosEnviar);
            echo json_encode(["id" => $id]);
            break;
    }
}
