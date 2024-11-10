<?php

require_once 'ExecQuery.php';

class Vista extends ExecQuery{
  public function getAll():array{
    return parent::getData("sp_listar_vistas");
  }
}

// $vista=new Vista;

// echo json_encode($vista->getAll());