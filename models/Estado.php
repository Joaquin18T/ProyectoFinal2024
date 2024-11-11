<?php

require_once 'ExecQuery.php';

class Estado extends ExecQuery{
  public function filtrarEstados($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_filter_estados(?,?,?)");
      $cmd->execute(
        array(
          $params['idestado'],
          $params['min'],
          $params['max']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }
}

// $est = new Estado();

// echo json_encode($est->filtrarEstados(['idestado'=>null, 'min'=>2, 'max'=>6]));