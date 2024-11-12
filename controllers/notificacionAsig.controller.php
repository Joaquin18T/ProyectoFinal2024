<?php

require_once '../models/NotificacionAsig.php';

$notifyAsig = new NotificacionAsig();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'listNotfAsig':
      echo json_encode($notifyAsig->listarNotificacion(['idusuario'=>$_GET['idusuario']]));
      break;
    case 'detalleNotfAsig':
      echo json_encode($notifyAsig->detalleNotificacion(['idnotificacion'=>$_GET['idnotificacion']]));
      break;
  }
}

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addNotifAsig':
      $cleanData=[
        'idactivo_asig'=>$notifyAsig->limpiarCadena($_POST['idactivo_asig']),
        'mensaje'=>$notifyAsig->limpiarCadena($_POST['mensaje']),
      ];

      $respuesta = ['idnotf'=>-1];

      $idnotf = $notifyAsig->add($cleanData);
      if($idnotf>0){
        $respuesta['idnotf']=$idnotf;
      }
      echo json_encode($respuesta);
      break;
    case 'updateVisto':
      $cleanData=[
        'idnotificacion'=>$notifyAsig->limpiarCadena($_POST['idnotificacion']),
        'visto'=>$notifyAsig->limpiarCadena($_POST['visto']),
      ];
      $respuesta = ['update'=>false];

      $update = $notifyAsig->updateVisto($cleanData);
      if($update){
        $respuesta['update'] = true;
      }

      echo json_encode($respuesta);
      break;
  }
}