<?php

require_once '../models/HistorialAsignaciones.php';

$historialAsig = new HistorialAsignacion();

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addHistorialAsig':
      $cleanData = [
        'idactivo_asig'=>$historialAsig->limpiarCadena($_POST['idactivo_asig']),
        'idresponsable'=>$historialAsig->limpiarCadena($_POST['idresponsable']),
        'coment_adicional'=>$historialAsig->limpiarCadena($_POST['coment_adicional'])
      ];

      $respuesta =['idhis_asig'=>-1];

      $idhistorial_asig = $historialAsig->add($cleanData);
      if($idhistorial_asig>0){
        $respuesta['idhis_asig'] = $idhistorial_asig;
      }
      echo json_encode($respuesta);
      break;
  }
}