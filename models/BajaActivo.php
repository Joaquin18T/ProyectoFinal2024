<?php

require_once 'ExecQuery.php';
class BajaActivo extends ExecQuery{
  public function add($params=[]):int{
    try{
      $pdo = parent::getConexion();
      $cmd = $pdo->prepare("CALL sp_add_baja(@idbaja,?,?,?,?,?)");
      $cmd->execute(
        array(
          $params['idactivo'],
          $params['motivo'],
          $params['coment_adicional'],
          $params['ruta_doc'],
          $params['idusuario_responsable']
        )
      );
      $respuesta = $pdo->query("SELECT @idbaja AS idbaja")->fetch(PDO::FETCH_ASSOC);
      return $respuesta['idbaja'];
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return -1;
    }
  }
}
// $baja = new BajaActivo();

// $id = $baja->add([
//   'idactivo'=>4,
//   'motivo'=>'Fallos en su ram',
//   'coment_adicional'=>null,
//   'ruta_doc'=>'doc/pdf/docbaja.pdf',
//   'idusuario_responsable'=>1
// ]);

// echo $id;