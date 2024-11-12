<?php

require_once 'ExecQuery.php';

class HistorialUsuario extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_historial_usuarios(@idhistorial,?,?,?)");
      $cmd->execute(
        array(
          $params['idusuario'],
          $params['idarea'],
          $params['comentario']
        )
      );
      $respuesta = $pdo->query("SELECT @idhistorial AS idhistorial")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idhistorial'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }
}

// $historial = new HistorialUsuario();
// $id = $historial->add([
//   'idusuario'=>2,
//   'idarea'=>2,
//   'comentario'=>'Asignado para que sea responsable'
// ]);

// echo $id;