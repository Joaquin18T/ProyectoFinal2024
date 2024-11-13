<?php

require_once 'ExecQuery.php';

class Area extends ExecQuery{
  public function getAreas():array{
    try{
      $cmd = parent::execQ("SELECT idarea, area FROM areas ORDER BY idarea ASC");
      $cmd->execute();
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }

  public function getAreaById($params=[]):array{
    try{
      $cmd = parent::execQ("SELECT idarea, area FROM areas WHERE idarea=?");
      $cmd->execute(
        array(
          $params['idarea']
        )
      );
      return $cmd->fetchAll(PDO::FETCH_ASSOC);
    }catch(Exception $e){
      error_log("Error: ".$e->getMessage());
      return [];
    }
  }
}

// $area = new Area();
// echo json_encode($area->getAreaById(['idarea'=>2]));

// echo json_encode($area->getAreas());