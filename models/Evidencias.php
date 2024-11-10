<?php

require_once 'ExecQuery.php';

class Evidencias extends ExecQuery
{

  public function obtenerEvidencias($params = []): array
  {
    try {
      $sp = parent::execQ("CALL obtenerEvidencias(?)");
      $sp->execute(array(
        $params['idtm']
      ));
      return $sp->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔

  public function registrarEvidencia($params = []): bool
  {
    try {
        $status = false;
        $sp = parent::execQ("CALL registrarEvidencia(?,?)");
        $status = $sp->execute(
            array(
            $params['idtm'],
            $params['evidencia']          
            ),

        );
        return $status;
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔
}
