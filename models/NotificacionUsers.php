<?php

require_once 'ExecQuery.php';

class NotificacionUsers extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_notificacion_usuario(@idnotuser,?,?,?,?)");
      $cmd->execute(
        array(
          $params['idusuario'],
          $params['idarea'],
          $params['tipo'],
          $params['mensaje']
        )
      );
      $respuesta = $pdo->query("SELECT @idnotuser AS idnotuser")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idnotuser'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function listarNotfsUsers($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_listar_notificacion_usuario(?,?)");
      $cmd->execute(
        array(
          $params['idusuario'],
          $params['idarea']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function detalleNotfUsers($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_detalle_notificacion_usuario(?)");
      $cmd->execute(
        array(
          $params['idnotificacion']
        )
      );
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }
}