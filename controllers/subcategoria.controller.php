<?php

require_once '../models/SubCategoria.php';

$sub = new SubCategoria();

if (isset($_GET['operation'])) {
  switch ($_GET['operation']) {
    case 'getSubCategoria':
      echo json_encode($sub->getAll());
      break;
    case 'getMarcasBySubcategoria':
      echo json_encode($sub->getMarcasBySubcategoria(['idsubcategoria' => $_GET['idsubcategoria']]));
      break;
    case 'getByIdSubcategoria':
      echo json_encode($sub->getSubcategoriaById(['idsubcategoria' => $_GET['idsubcategoria']]));
      break;

    case 'getSubcategoriaByCategoria':
      echo json_encode($sub->getSubcategoriaByCategoria(['idcategoria' => $_GET['idcategoria']]));
      break;
      
  }
}