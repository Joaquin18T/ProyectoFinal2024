<?php

require_once '../models/Evidencias.php';

$evidencias = new Evidencias();


if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'obtenerEvidencias':
            echo json_encode($evidencias->obtenerEvidencias(['idtm' => $_GET['idtm']]));
            break;
        }
}


if (isset($_POST['operation'])) {
    switch ($_POST['operation']) {
        case 'registrarEvidencia':
            $id = -1;
            $datosEnviar = [
                "idtm"               => $_POST["idtm"],
                "evidencia"          => $_POST["evidencia"]
            ];

            $id = $evidencias->registrarEvidencia($datosEnviar);
            echo json_encode(["id" => $id]);
            break;        
    }
}
