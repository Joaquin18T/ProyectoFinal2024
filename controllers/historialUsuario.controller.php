<?php

require_once '../models/HistorialUsuario.php';

$historialUser = new HistorialUsuario();

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addHisUser':
      $cleanData = [
        'idusuario'=>$historialUser->limpiarCadena($_POST['idusuario']),
        'idarea'=>$historialUser->limpiarCadena($_POST['idarea']),
        'comentario'=>$historialUser->limpiarCadena($_POST['comentario'])
      ];

      $respuesta = ['idhis_user'=>-1];

      $idhisUser = $historialUser->add($cleanData);
      if($idhisUser>0){
        $respuesta['idhis_user']= $idhisUser;
      }
      echo json_encode($respuesta);
      break;
  }
}