<?php

require_once 'ExecQuery.php';

class Usuario extends ExecQuery{

  public function login($params = []): array
  {
    try {
      $sp = parent::execQ("CALL sp_user_login(?)");
      $sp->execute(array($params['nom_usuario']));
      return $sp->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }

  public function getPermisos($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_obtener_permisos(?)");
      $cmd->execute(
        array($params['idperfil'])
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch (Exception $e) {
      die($e->getMessage());
    }
  }

  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare('CALL sp_add_usuario(@idusuario,?,?,?,?,?,?,?)');
      $cmd->execute(
        array(
          $params['idpersona'],
          $params['nom_usuario'],
          $params['claveacceso'],
          $params['perfil'],
          $params['idperfil'],
          $params['idarea'],
          $params['responsable_area']
        )
      );

      $respuesta = $pdo->query("SELECT @idusuario AS idusuario")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idusuario'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }

  public function updateUsuario($params=[]):bool{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_update_usuario(@idpersona, ?, ?)");
      $cmd->execute(
        array(
          $params['idusuario'],
          $params['idperfil']
        )
      );

      $respuesta = $pdo->query("SELECT @idpersona AS idpersona")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idpersona'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return false;
    }
  }

  public function cambiarAreaUsuario($params=[]):bool{
    try{
      $estado = false;
      $cmd = parent::execQ("CALL sp_cambiar_area_usuario(?,?)");
      $estado= $cmd->execute(
        array(
          $params['idusuario'],
          $params['idarea']
        )
      );
      return $estado;
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return false;
    }
  }

  public function filtrarUsuarios($params=[]):array{
    try{
      $defaultParams=[
        'dato' => null,
        'numdoc' => null,
        'idtipodoc' => null,
        'estado' => null,
        'responsable_area' => null,
        'idarea' => null,
        'idperfil' => null,
      ];

      $realParams = array_merge($defaultParams, $params);

      $cmd = parent::execQ("CALL sp_filtrar_usuarios(?,?,?,?,?,?,?)");
      $cmd->execute(
        array(
          $realParams['dato'],
          $realParams['numdoc'],
          $realParams['idtipodoc'],
          $realParams['estado'],
          $realParams['responsable_area'],
          $realParams['idarea'],
          $realParams['idperfil']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function getUsuarioById($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_get_usuario_by_id(?)");
      $cmd->execute(
        array($params['idusuario'])
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function updateEstado($params = []): bool
  {
    try {
      $state = false;
      $cmd = parent::execQ("CALL sp_update_estado_usuario(?,?)");
      $state = $cmd->execute(
        array(
          $params['idusuario'],
          $params['estado']
        )
      );
      return $state;
    } catch (Exception $e) {
      error_log("Error: " . $e->getMessage());
    }
  }

  public function searchUser($params = []): array
  {
    try {
      $cmd = parent::execQ("CALL sp_search_nom_usuario(?)");
      $cmd->execute(
        array($params['nom_usuario'])
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }

  public function existeResponsableArea($params=[]):array{
    try{
      $cmd = parent::execQ("CALL sp_existe_responsable_area(?)");
      $cmd->execute(
        array(
          $params['idarea']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch (Exception $e) {
      error_log("Error: " . $e->getMessage());
    }
  }

  public function designarResponsableArea($params=[]):bool{
    try{
      $state = false;
      $cmd = parent::execQ("CALL sp_designar_responsable_area(?,?)");
      $state = $cmd->execute(
        array(
          $params['idusuario'],
          $params['responsable_area']
        )
      );
      return $state;
    }catch (Exception $e) {
      error_log("Error: " . $e->getMessage());
      return false;
    }
  }
}
// $user = new Usuario();

// echo json_encode($user->filtrarUsuarios([
//   'dato' => null,
//   'numdoc' => null,
//   'idtipodoc' => null,
//   'estado' => null,
//   'responsable_area' => null,
//   'idarea' => null,
//   'idperfil' => null
// ]));
//  echo json_encode($user->existeResponsableArea(['idarea'=>1]));
// $up = $user->cambiarAreaUsuario(['idusuario'=>3, 'idarea'=>2]);
// echo $up;

// $id = $user->add([
//   'idpersona'=>7,
//   'nom_usuario'=>'luis',
//   'claveacceso'=>'luis2024',
//   'perfil'=>'USR',
//   'idperfil'=>2,
//   'idarea'=>3,
//   'responsable_area'=>0
// ]);
// echo $id;

// $up = $user->updateUsuario(['idusuario'=>7, 'idperfil'=>3]);
// echo $up;

// echo json_encode($user->login(['nom_usuario'=>'ana.martinez']));
// //echo $resp[0]['claveacceso'];


//echo json_encode($user->getPermisos(['idperfil'=>2]));