<?php

require_once '../models/ActivosTarea.php';

$activostarea = new ActivosTarea();

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
