<?php

require_once 'ExecQuery.php';

class NotificacionAsig extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_notificacion_asignacion(@idnotif,?,?,?)");
      $cmd->execute(
        array(
          $params['idactivo_asig'],
          $params['tipo'],
          $params['mensaje']
        )
      );
      $respuesta = $pdo->query("SELECT @idnotif AS idnotif")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idnotif'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function listarNotificacion($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_listar_notificacion_by_responsable_area(?)");
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

  public function detalleNotificacion($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_detalle_notificacion_asignacion(?)");
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
      $cmd = parent::execQ("CALL sp_update_visto(?,?)");
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

// $notif = new NotificacionAsig();

// $id = $notif->add([
//   'idactivo_asig'=>4,
//   'tipo'=>'Asignacion',
//   'mensaje'=>'Nueva asignacion de un activo al area'
// ]);

// echo $id;