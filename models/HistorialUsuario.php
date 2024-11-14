<?php

require_once 'ExecQuery.php';

class HistorialUsuario extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_historial_usuarios(@idhistorial,?,?,?,?)");
      $cmd->execute(
        array(
          $params['idusuario'],
          $params['idarea'],
          $params['comentario'],
          $params['es_responsable']
        )
      );
      $respuesta = $pdo->query("SELECT @idhistorial AS idhistorial")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idhistorial'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function verificarHisUser($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_verificar_historial_usuario(?)");
      $cmd->execute(
        array(
          $params['idusuario']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function updateFechaFin($params=[]):bool{
    try{
      $estado = false;
      $cmd=parent::execQ("CALL sp_update_fecha_fin(?)");
      $estado=$cmd->execute(
        array(
          $params['idusuario']
        )
      );
      return $estado;
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return false;
    }
  }
}

//  $historial = new HistorialUsuario();

//  echo json_encode($historial->verificarHisUser(['idusuario'=>3]));

// $up = $historial->updateFechaFin(['idusuario'=>3]);
// echo $up;
// $id = $historial->add([
//   'idusuario'=>2,
//   'idarea'=>2,
//   'comentario'=>'Asignado para que sea responsable'
// ]);

// echo $id;