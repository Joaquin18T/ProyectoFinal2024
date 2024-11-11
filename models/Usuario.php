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
}
//  $user = new Usuario();

// echo json_encode($user->login(['nom_usuario'=>'ana.martinez']));
// //echo $resp[0]['claveacceso'];


//echo json_encode($user->getPermisos(['idperfil'=>2]));