<?php

require_once '../models/BajaActivo.php';

$baja = new BajaActivo();

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addBaja':
      $cleanData=[
        'idactivo'=>$baja->limpiarCadena($_POST['idactivo']),
        'motivo'=>$baja->limpiarCadena($_POST['motivo']),
        'coment_adicional'=>$baja->limpiarCadena($_POST['coment_adicional']),
        'ruta_doc'=>$baja->limpiarCadena($_POST['ruta_doc']),
        'idusuario_responsable'=>$baja->limpiarCadena($_POST['idusuario_responsable'])
      ];
      $respuesta = ['idbaja'=>-1];

      $idbaja = $baja->add($cleanData);
      if($idbaja>0){
        $respuesta['idbaja']=$idbaja;
      }
      echo json_encode($respuesta);
      break;
  }
}