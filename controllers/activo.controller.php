<?php

require_once '../models/Activo.php';

$activo = new Activo();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'filtradoActivos':
      $cleanData=[
        'idestado'=>$_GET['idestado']==""?null:$activo->limpiarCadena($_GET['idestado']),
        'idcategoria'=>$_GET['idcategoria']==""?null:$activo->limpiarCadena($_GET['idcategoria']),
        'idsubcategoria'=>$_GET['idsubcategoria']==""?null:$activo->limpiarCadena($_GET['idsubcategoria']),
        'idmarca'=>$_GET['idmarca']==""?null:$activo->limpiarCadena($_GET['idmarca']),
        'modelo'=>$_GET['modelo']==""?null:$activo->limpiarCadena($_GET['modelo']),
        'cod_identificacion'=>$_GET['cod_identificacion']==""?null:$activo->limpiarCadena($_GET['cod_identificacion']),
        'idarea'=>$_GET['idarea']==""?null:$activo->limpiarCadena($_GET['idarea']),
        'fecha_adquisicion'=>$_GET['fecha_adquisicion']==""?null:$activo->limpiarCadena($_GET['fecha_adquisicion']),
        'fecha_adquisicion_fin'=>$_GET['fecha_adquisicion_fin']==""?null:$activo->limpiarCadena($_GET['fecha_adquisicion_fin'])
      ];

      echo json_encode($activo->listOfFilters($cleanData));
      break;
    case 'getById':
      echo json_encode($activo->getByIdActivo(['idactivo'=>$_GET['idactivo']]));
      break;
  }
}

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addActivo':
      $cleanData=[
        'idsubcategoria'=>$activo->limpiarCadena($_POST['idsubcategoria']),
        'idmarca'=>$activo->limpiarCadena($_POST['idmarca']),
        'modelo'=>$_POST['modelo']==""?null:$activo->limpiarCadena($_POST['modelo']),
        'cod_identificacion'=>$activo->limpiarCadena($_POST['cod_identificacion']),
        'descripcion'=>$_POST['descripcion']==""?null:$activo->limpiarCadena($_POST['descripcion']),
        'especificaciones'=>$activo->limpiarCadena($_POST['especificaciones'])
      ];

      $respuesta = ['idactivo'=>-1];

      $idactivo = $activo->add($cleanData);
      if($idactivo>0){
        $respuesta['idactivo'] = $idactivo;
      }
      echo json_encode($respuesta);
      break;
    case 'updateActivo':
      $cleanData=[
        'idactivo'=>$activo->limpiarCadena($_POST['idactivo']),
        'modelo'=>$activo->limpiarCadena($_POST['modelo']),
        'descripcion'=>$activo->limpiarCadena($_POST['descripcion']),
        'especificaciones'=>$activo->limpiarCadena($_POST['especificaciones'])
      ];

      $respuesta = ['update'=>false];

      $update = $activo->updateActivo($cleanData);
      if($update){
        $respuesta['update'] = true;
      }
      echo json_encode($respuesta);
      break;
    case 'updateEstado':
      $cleanData =[
        'idactivo'=>$activo->limpiarCadena($_POST['idactivo']),
        'idestado'=>$activo->limpiarCadena($_POST['idestado'])
      ];

      $respuesta = ['update'=>false];

      $update = $activo->updateEstado($cleanData);
      if($update){
        $respuesta['update'] = true;
      }
      echo json_encode($respuesta);
      break;
  }
}