<?php

require_once 'ExecQuery.php';

class Tarea extends ExecQuery
{

  public function obtenerTareasPorEstado($params = []): array
  {
    try {
      $sp = parent::execQ("CALL obtenerTareasPorEstado(?)");
      $sp->execute(array(
        $params['idestado']
      ));
      return $sp->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔

  public function registrarTarea($params = []): int
  {
    try {
      $sp = parent::execQ("CALL registrarTarea(@idtarea,?,?)");
      $sp->execute(
        array(
          $params['fecha_programada'],
          $params['hora_programada']
        ),

      );
      $response = parent::execQuerySimple("SELECT @idtarea as idtarea")->fetch(PDO::FETCH_ASSOC);
      return (int) $response['idtarea'];
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔

  public function actualizarEstadoTarea($params = []): bool
  {
    try {
      $status = false;
      $sp = parent::execQ("CALL actualizarEstadoTarea(?,?)");
      $status = $sp->execute(
        array(
          $params['idtarea'],
          $params['idestado']
        )
      );
      return $status;
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔
}
