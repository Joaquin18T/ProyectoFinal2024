<?php

require_once 'ExecQuery.php';

class Activo extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();

      $cmd = $pdo->prepare("CALL sp_add_activo(@idactivo,?,?,?,?,?,?)");
      $cmd->execute(
        array(
          $params['idsubcategoria'],
          $params['idmarca'],
          $params['modelo'],
          $params['cod_identificacion'],
          $params['descripcion'],
          $params['especificaciones']
        )
      );
      $respuesta = $pdo->query("SELECT @idactivo AS idactivo")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idactivo'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function updateActivo($params=[]):bool{
    try{
      $status=false;
      $cmd = parent::execQ("CALL sp_update_activo(?,?,?,?)");
      $status = $cmd->execute(
        array(
          $params['idactivo'],
          $params['modelo'],
          $params['descripcion'],
          $params['especificaciones']
        )
      );
      return $status;
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
    }
  }

  public function listOfFilters($params=[]):array{
    try{
      //Inicializar los parametros con valores por defecto
      $defaultParams=[
        'idestado'=>null,
        'idcategoria'=>null,
        'idsubcategoria'=>null,
        'idmarca'=>null,
        'modelo'=>null,
        'cod_identificacion'=>null,
        'idarea'=>null,
        'fecha_adquisicion'=>null,
        'fecha_adquisicion_fin'=>null,
      ];

      $realParams = array_merge($defaultParams, $params);
      $cmd = parent::execQ("CALL sp_filtrar_activos(?,?,?,?,?,?,?,?,?)");
      $cmd->execute(
        array(
          $realParams['idestado'],
          $realParams['idcategoria'],
          $realParams['idsubcategoria'],
          $realParams['idmarca'],
          $realParams['modelo'],
          $realParams['cod_identificacion'],
          $realParams['idarea'],
          $realParams['fecha_adquisicion'],
          $realParams['fecha_adquisicion_fin']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      die($e->getMessage());
    }
  }

  public function getByIdActivo($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_get_activo_by_id(?)");
      $cmd->execute(array($params['idactivo']));
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      die($e->getMessage());
    }
  }

  public function updateEstado($params=[]):bool{
    try{
      $status=false;
      $cmd = parent::execQ("CALL sp_update_estado_activo(?,?)");
      $status=$cmd->execute(
        array(
          $params['idactivo'],
          $params['idestado']
        )
      );
      return $status;
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
    }
  }
}

//  $act = new Activo();

//  $up = $act->updateEstado(['idactivo'=>3, 'idestado'=>5]);
//  echo $up;

 //echo json_encode($act->getByIdActivo(['idactivo'=>1]));

  // echo json_encode($act->listOfFilters([
  //   'idestado'=>null,
  //   'idcategoria'=>null,
  //   'idsubcategoria'=>null,
  //   'idmarca'=>null,
  //   'modelo'=>null,
  //   'cod_identificacion'=>null,
  //   'idarea'=>null,
  //   'fecha_adquisicion'=>null,
  //   'fecha_adquisicion_fin'=>null,
  // ]));

//  $up = $act->updateActivo([
//   'idactivo'=>3,
//   'modelo'=>'D4F',
//   'descripcion'=> 'Impresora D4F',
//   'especificaciones'=>'{"color":"Blanco"}'
//  ]);

//  echo $up;

// $params=[
//   'idsubcategoria'=>1,
//   'idmarca'=>1,
//   'modelo'=>"EDR v5",
//   'cod_identificacion'=>"RR45EA",
//   'fecha_adquisicion'=>"2024-10-04",
//   'descripcion'=>"EDR V5 product",
//   'especificaciones'=>'{"color":"Blanco"}'
// ];

// $id = $act->add($params);

// echo $id;