<?php

require_once '../models/HistorialUsuario.php';

$historialUser = new HistorialUsuario();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'verificarHisUser':
      echo json_encode($historialUser->verificarHisUser(['idusuario'=>$_GET['idusuario']]));
      break;
  }
}

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addHisUser':
      $cleanData = [
        'idusuario'=>$historialUser->limpiarCadena($_POST['idusuario']),
        'idarea'=>$historialUser->limpiarCadena($_POST['idarea']),
        'comentario'=>$_POST['comentario']==""?null:$historialUser->limpiarCadena($_POST['comentario']),
        'es_responsable'=>$historialUser->limpiarCadena($_POST['es_responsable'])
      ];

      $respuesta = ['idhis_user'=>-1];

      $idhisUser = $historialUser->add($cleanData);
      if($idhisUser>0){
        $respuesta['idhis_user']= $idhisUser;
      }
      echo json_encode($respuesta);
      break;
    case 'updateFechaFinByUser':
      $cleanData = [
        'idusuario'=>$historialUser->limpiarCadena($_POST['idusuario'])
      ];

      $respuesta = ['update'=>false];

      $update = $historialUser->updateFechaFin($cleanData);
      if($update){
        $respuesta['update']=true;
      }
      echo json_encode($respuesta);
      break;
  }
}