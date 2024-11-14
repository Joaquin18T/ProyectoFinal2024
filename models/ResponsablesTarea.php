<?php

require_once 'ExecQuery.php';

class ResponsablesTarea extends ExecQuery
{
  public function registrarResponsableTarea($params = []): bool
  {
    try {
        $status = false;
      $sp = parent::execQ("CALL sp_registrar_resp_tarea(?,?)");
      $status = $sp->execute(
        array(
            $params['idusuario'],
            $params['idtarea']
        )
      );
      return $status;
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔
}
