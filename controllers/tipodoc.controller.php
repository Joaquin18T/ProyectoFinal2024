<?php

require_once '../models/tipoDoc.php';

$tipodoc = new TipoDoc();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'getAll':
      echo json_encode($tipodoc->getAll());
      break;

  }
}