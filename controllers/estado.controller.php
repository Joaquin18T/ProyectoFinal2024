<?php

require_once '../models/Estado.php';

$estado = new Estado();

header("Content-type: application/json; charset=utf-8");

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'estadoByRange':
      $params=[
        'idestado'=>$_GET['idestado']==""?null:$estado->limpiarCadena($_GET['idestado']),
        'min'=>$estado->limpiarCadena($_GET['min']),
        'max'=>$estado->limpiarCadena($_GET['max'])
      ];
      echo json_encode($estado->filtrarEstados($params));
      break;
  }
}