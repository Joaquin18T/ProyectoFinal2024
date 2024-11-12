<?php

require_once 'ExecQuery.php';

class HistorialAsignacion extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_historial_asignacion(@idhistorial,?,?,?)");
      $cmd->execute(
        array(
          $params['idactivo_asig'],
          $params['idresponsable'],
          $params['coment_adicional']
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

// $HistorialAsg = new HistorialAsignacion();

// $id = $HistorialAsg->add([
//   'idactivo_asig'=>4,
//   'idresponsable'=>1,
//   'coment_adicional'=>'Asignado para el uso de una tarea'
// ]);

// echo $id;