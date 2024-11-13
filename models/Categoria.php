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
}

// $test = new Categoria();

// echo json_encode($test->getAll());