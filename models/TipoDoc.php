<?php

require_once 'ExecQuery.php';

class TipoDoc extends ExecQuery{
  public function getAll():array{
    try{
      $cmd = parent::execQ("SELECT idtipodoc, tipodoc FROM tipo_doc");
      $cmd->execute();
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }
}

// $td = new TipoDoc();

// echo json_encode($td->getAll());

