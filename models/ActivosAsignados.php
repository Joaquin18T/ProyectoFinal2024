<?php

require_once 'ExecQuery.php';

class ActivosAsignados extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_activo_asignado(@idactivo_asig, ?,?,?,?,?)");
      $cmd->execute(
        array(
          $params['idarea'],
          $params['idactivo'],
          $params['condicion_asig'],
          $params['imagenes'],
          $params['idestado']
        )
      );
      $respuesta = $pdo->query("SELECT @idactivo_asig AS idactivo_asig")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idactivo_asig'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function contarCambiosUbicacion($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_contar_cambios_ubicacion(?)");
      $cmd->execute(
        array(
          $params['idactivo']
        )
      );
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function validarCambioArea($params=[]):int{
    try{
      $status = false;
      $cmd = parent::execQ("CALL sp_validar_cambio_area(?,?)");
      $cmd->execute(
        array(
          $params['idactivo'],
          $params['idestado']
        )
      );
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return false;
    }
  }

  public function filtrarActivosAsignados($params = []): array
  {
    try {
      $cmd = parent::execQ("CALL sp_filtrar_activosAsignados(?)");
      $cmd->execute(
        array(
          $params['idsubcategoria']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      error_log("Error: " . $e->getMessage());
    }
  }
}

//$activosAs = new ActivosAsignados();

// $id = $activosAs->add([
//   'idarea'=>1,
//   'idactivo'=>4,
//   'condicion_asig'=>'En buen estado para su uso',
//   'imagenes'=>'{"imagen1":"http://image_activo.png"}',
//   'idestado'=>14
// ]);

// echo $id;