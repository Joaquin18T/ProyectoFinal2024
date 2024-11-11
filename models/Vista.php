<?php

require_once 'ExecQuery.php';

class Vista extends ExecQuery{
  public function getAll():array{
    return parent::getData("sp_listar_vistas");
  }

  public function getPerfiles():array{
    try{
      $cmd = parent::execQ("SELECT idperfil, perfil FROM perfiles");
      $cmd->execute();
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }
}

//  $vista=new Vista;

// echo json_encode($vista->getPerfiles());