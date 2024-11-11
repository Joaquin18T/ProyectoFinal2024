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
      $cmd = $pdo->prepare('CALL sp_add_usuario(@idpersona,?,?,?,?,?,?,?)');
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

      $respuesta = $pdo->query("SELECT @idpersona AS idpersona")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idpersona'];
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
}
//$user = new Usuario();

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