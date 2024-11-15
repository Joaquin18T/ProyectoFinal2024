<?php

require_once 'ExecQuery.php';

class ActivosTarea extends ExecQuery
{
  public function registrarActivoTarea($params = []): int
  {
    try {
      $sp = parent::execQ("CALL registrarActivoTarea(@idactivos_tarea,?,?)");
      $sp->execute(
        array(
          $params['idtarea'],
          $params['idactivo']          
        )
      );
      $response = parent::execQuerySimple("SELECT @idactivos_tarea as idactivos_tarea")->fetch(PDO::FETCH_ASSOC);
      return (int) $response['idactivos_tarea'];
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔

  public function obtenerActivosPorTarea($params=[]):array{
    try{
      $cmd = parent::execQ("CALL obtenerActivosPorTarea(?)");
      $cmd->execute(
        array(
          $params['idtarea']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }
}
