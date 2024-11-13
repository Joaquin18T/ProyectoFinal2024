<?php

require_once '../models/Tarea.php';

$tarea = new Tarea();


if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'obtenerTareasPorEstado':
            echo json_encode($tarea->obtenerTareasPorEstado(['idestado' => $_GET['idestado']]));
            break;
        }
}


if (isset($_POST['operation'])) {
    switch ($_POST['operation']) {
        case 'registrarTarea':
            $id = -1;
            $datosEnviar = [
                "idusuario"               => $_POST["idusuario"],
                "fecha_programada"          => $_POST["fecha_programada"],
                "hora_programada"               => $_POST["hora_programada"]
            ];

            $id = $tarea->registrarTarea($datosEnviar);
            echo json_encode(["id" => $id]);
            break;        
    }
}
