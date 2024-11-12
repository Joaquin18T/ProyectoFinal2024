<?php

require_once '../models/Estado.php';

$estado = new Estado();

header("Content-type: application/json; charset=utf-8");

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'estadoByRange':
      $params=[
        'idestado'=>$estado->limpiarCadena($_GET['idestado']),
        'min'=>$estado->limpiarCadena($_GET['menor']),
        'max'=>$estado->limpiarCadena($_GET['mayor'])
      ];
      echo json_encode($estado->filtrarEstados($params));
      break;
  }
}