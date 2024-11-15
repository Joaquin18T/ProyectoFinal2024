<?php

require_once 'ExecQuery.php';

class Categoria extends ExecQuery{

  public function getAll():array{
    try{
      $query = "SELECT * FROM categorias";
      $cmd = parent::execQ($query);
      $cmd->execute();
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      die($e->getMessage());
    }
  }
  
  public function obtenerCategoriasPorArea($params):array{
    try{
      $query = "SELECT * FROM categorias where idarea = ?";
      $cmd = parent::execQ($query);
      $cmd->execute(array($params['idarea']));
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      die($e->getMessage());
    }
  }

  public function obtenerSubcategoriasPorCategorias($params=[]):array{
    try{  
      $cmd = parent::execQ("CALL sp_filtrar_subcategorias_by_categorias(?)");
      $cmd->execute(
        array(
          $params['idcategoria']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      die($e->getMessage());
      return [];
    }
  }
}

// $test = new Categoria();

// echo json_encode($test->getAll());