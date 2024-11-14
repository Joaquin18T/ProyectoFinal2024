<?php

require_once 'ExecQuery.php';

class Reporte extends ExecQuery
{
  public function filtrarMantenimientosActivos($params = []): array
  {
    try {
      $defaultParams = [
        'idactivo' => null,
        'fechainicio' => null,
        'fechafin' => null
      ];
      $realArray = array_merge($defaultParams, $params);
      $sp = parent::execQ("CALL sp_filtrar_mantenimientos_activos(?,?,?)");
      $sp->execute(
        array(
          $realArray['idactivo'],
          $realArray['fechainicio'],
          $realArray['fechafin']
        )
      );
      return $sp->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      die($e->getMessage());
    }
  } // INTEGRADO ✔
}
