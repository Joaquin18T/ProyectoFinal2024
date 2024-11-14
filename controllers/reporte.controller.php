<?php

require_once '../models/Reporte.php';

$reporte = new Reporte();

if (isset($_GET['operation'])) {
    switch ($_GET['operation']) {
        case 'filtrarMantenimientosActivos':
            $valoresBuscar = [
                'idactivo' => $_GET['idactivo'] == "" ? null : $reporte->limpiarCadena($_GET['idactivo']),
                'fechainicio' => $_GET['fechainicio'] == "" ? null : $reporte->limpiarCadena($_GET['fechainicio']),
                'fechafin' => $_GET['fechafin'] == "" ? null : $reporte->limpiarCadena($_GET['fechafin'])
            ];
            echo json_encode($reporte->filtrarMantenimientosActivos($valoresBuscar));
            break;
    }
}
