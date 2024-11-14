<?php

require_once 'ExecQuery.php';

class NotificacionTarea extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_notificacion_tarea(@idnotif,?,?)");
      $cmd->execute(
        array(
          $params['idtarea'],
          $params['mensaje'],
        )
      );
      $respuesta = $pdo->query("SELECT @idnotif AS idnotif")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idnotif'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function listarNof_Tarea($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_listar_notificacion_tarea(?)");
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

  public function detalleNof_Tarea($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_detalle_notificacion_tarea(?)");
      $cmd->execute(
        array(
          $params['idnotificacion']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function updateVisto($params=[]):bool{
    try{
      $estado = false;
      $cmd = parent::execQ("CALL sp_update_visto_tarea(?,?)");
      $estado = $cmd->execute(
        array(
          $params['idnotificacion'],
          $params['visto']
        )
      );
      return $estado;
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return false;
    }
  }
}