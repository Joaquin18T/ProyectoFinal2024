<?php

require_once '../models/Vista.php';

$vista = new Vista();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'getPerfiles':
      echo json_encode($vista->getPerfiles());
      break;
    case 'getPerfilById':
      echo json_encode($vista->getPerfilById(['idperfil'=>$_GET['idperfil']]));
  }
}