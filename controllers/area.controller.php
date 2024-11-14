<?php
require_once '../models/Area.php';

$area = new Area();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'getAll':
      echo json_encode($area->getAreas());
      break;
    case 'getAreaById':
      echo json_encode($area->getAreaById(['idarea'=>$_GET['idarea']]));
      break;
  }
}