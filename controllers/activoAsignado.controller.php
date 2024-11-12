<?php

require_once '../models/ActivosAsignados.php';

$activo_asig = new ActivosAsignados();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'contarCambiosUbicacion':
      echo json_encode($activo_asig->contarCambiosUbicacion(['idactivo'=>$_GET['idactivo']]));
      break;
  }
}

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addAsig':
      $cleanData=[
        'idarea'=>$activo_asig->limpiarCadena($_POST['idarea']),
        'idactivo'=>$activo_asig->limpiarCadena($_POST['idactivo']),
        'condicion_asig'=>$activo_asig->limpiarCadena($_POST['condicion_asig']),
        'imagenes'=>$activo_asig->limpiarCadena($_POST['imagenes']),
        'idestado'=>$activo_asig->limpiarCadena($_POST['idestado'])
      ];
      $respuesta = ['idactivo_asig'=>-1];

      $idativo_asig = $activo_asig->add($cleanData);

      if($idativo_asig>0){
        $respuesta['idactivo_asig']=$idativo_asig;
      }
      echo json_encode($respuesta);
      break;
    case 'validarCambioArea':
      $cleanData = [
        'idactivo'=>$activo_asig->limpiarCadena($_POST['idactivo']),
        'idestado'=>$activo_asig->limpiarCadena($_POST['idestado'])
      ];
      $respuesta=['update'=>false];

      $update = $activo_asig->validarCambioArea($cleanData);
      if($update){
        $respuesta['update']=true;
      }
      echo json_encode($respuesta);
      break;
  }
}