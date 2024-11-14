<?php

require_once '../models/NotificacionUsers.php';

$notfUsers = new NotificacionUsers();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'listNotfUsers':
      echo json_encode($notfUsers->listarNotfsUsers([
        'idusuario'=>$_GET['idusuario'],
        'idarea'=>$_GET['idarea']
      ]));
      break;
    case 'detalleNotfUsers':
      echo json_encode($notfUsers->detalleNotfUsers(['idnotificacion'=>$_GET['idnotificacion']]));
      break;
  }
}

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addNotfUsers':
      $cleanData=[
        'idusuario'=>$notfUsers->limpiarCadena($_POST['idusuario']),
        'idarea'=>$notfUsers->limpiarCadena($_POST['idarea']),
        'tipo'=>$notfUsers->limpiarCadena($_POST['tipo']),
        'mensaje'=>$notfUsers->limpiarCadena($_POST['mensaje'])
      ];
      $respuesta = ['idnotf'=>0];
      $idnotf = $notfUsers->add($cleanData);

      if($idnotf>0){
        $respuesta['idnotf']=$idnotf;
      }
      echo json_encode($respuesta);
      break;
  }
}