<?php

require_once 'ExecQuery.php';

class Persona extends ExecQuery{
  public function add($params = []): int
  {
    try {
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_persona(@idpersona,?,?,?,?,?,?)");
      $cmd->execute(
        array(
          $params['idtipodoc'],
          $params['num_doc'],
          $params['apellidos'],
          $params['nombres'],
          $params['genero'],
          $params['telefono'],
        )
      );
      $respuesta = $pdo->query("SELECT @idpersona AS idpersona")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idpersona'];
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }

  public function updatePersona($params = []): bool
  {
    try {
      $status = false;
      $cmd = parent::execQ("CALL sp_update_persona(?,?,?,?,?)");
      $status = $cmd->execute(
        array(
          $params['idpersona'],
          $params['apellidos'],
          $params['nombres'],
          $params['genero'],
          $params['telefono']
        )
      );
      return $status;
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }

  public function getPersonaById($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_search_persona_by_id(?)");
      $cmd->execute(
        array(
          $params['idpersona']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch (Exception $e) {
      die($e->getMessage());
      return [];
    }
  }

  public function searchPersonaNumDoc($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_search_persona_numdoc(?)");
      $cmd->execute(
        array(
          $params['numdoc']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch (Exception $e) {
      die($e->getMessage());
      return [];
    }
  }

  public function searchTelf($params = []): array
  {
    try {
      $cmd = parent::execQ("CALL sp_search_telefono(?)");
      $cmd->execute(
        array($params['telefono'])
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }
}

//$persona = new Persona();

// $up = $persona->updatePersona([
//   'idpersona'=>7,
//   'idtipodoc'=>1,
//   'num_doc'=>'345993444',
//   'apellidos'=>'Arenales Pereira',
//   'nombres'=>'Luis',
//   'genero'=>'M',
//   'telefono'=>'934859346'
// ]);
// echo $up;

// $id = $persona->add([
//   'idtipodoc'=>1,
//   'num_doc'=>'345993456',
//   'apellidos'=>'Arenales Pereira',
//   'nombres'=>'Arturo',
//   'genero'=>'M',
//   'telefono'=>'934859346'
// ]);

// echo $id;