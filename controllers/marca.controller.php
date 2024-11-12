<?php

require_once '../models/Marca.php';

$marca = new Marca();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'getAll':
      echo json_encode($marca->getAll());
      break;
    case 'getIdByMarca':
      echo json_encode($marca->getMarcaById(['idmarca'=>$_GET['idmarca']]));
      break;
  }
}  

