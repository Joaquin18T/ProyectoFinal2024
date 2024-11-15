<?php

require_once '../models/Categoria.php';

$categoria = new Categoria();

if (isset($_GET['operation'])) {
  switch ($_GET['operation']) {
    case 'getAll':
      echo json_encode($categoria->getAll());
      break;
    case 'obtenerCategoriasPorArea':
      echo json_encode($categoria->obtenerCategoriasPorArea(["idarea" => $_GET['idarea']]));
      break;
    case 'obtenerSubcategoriasByCategoria':
      echo json_encode($categoria->obtenerSubcategoriasPorCategorias(['idcategoria'=>$_GET['idcategoria']]));
      break;
  }
}
