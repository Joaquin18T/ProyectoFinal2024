<?php

require_once '../models/NotificacionTarea.php';

$notfTarea = new NotificacionTarea();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'listNotfTarea':
      echo json_encode($notfTarea->listarNof_Tarea(['idusuario'=>$_GET['idusuario']]));
      break;
    case 'detalleNotfTarea':
      echo json_encode($notfTarea->detalleNof_Tarea(['idnotificacion'=>$_GET['idnotificacion']]));
      break;
  }
}
if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addNotfTarea':
      $cleanData = [
        'idtarea'=>$notfTarea->limpiarCadena($_POST['idtarea']),
        'mensaje'=>$notfTarea->limpiarCadena($_POST['mensaje'])
      ];

      $respuesta = ['idnotf'=>-1];

      $idnotfT = $notfTarea->add($cleanData);

      if($idnotfT>0){
        $respuesta['idnotf'] = $idnotfT;
      }

      echo json_encode($respuesta);
      break;
    case 'updateVistoTarea':
      $cleanData=[
        'idnotificacion'=>$notfTarea->limpiarCadena($_POST['idnotificacion']),
        'visto'=>$notfTarea->limpiarCadena($_POST['visto']),
      ];
      $respuesta = ['update'=>false];

      $update = $notfTarea->updateVisto($cleanData);
      if($update){
        $respuesta['update'] = true;
      }

      echo json_encode($respuesta);
      break;
  }
}