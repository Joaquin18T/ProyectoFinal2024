<?php

require_once '../models/ResponsablesTarea.php';

$responsablestarea = new ResponsablesTarea();


/* if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'obtenerTareasPorEstado':
            echo json_encode($responsablestarea->(['idestado' => $_GET['idestado']]));
            break;
        }
} */


if (isset($_POST['operation'])) {
    switch ($_POST['operation']) {
        case 'registrarResponsableTarea':
            $id = -1;
            $datosEnviar = [
                "idusuario"          => $_POST["idusuario"],
                "idtarea"               => $_POST["idtarea"]
            ];

            $registrado = $responsablestarea->registrarResponsableTarea($datosEnviar);
            echo json_encode(["registrado" => $registrado]);
            break;        
    }
}
