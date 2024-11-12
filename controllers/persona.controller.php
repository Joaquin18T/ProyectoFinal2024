<?php
require_once '../models/Persona.php';

$persona = new Persona();
// ag order by
if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'personaById':
      echo json_encode($persona->getPersonaById(['idpersona'=>$_GET['idpersona']]));
      break;
  }
}
if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'addPersona':
      $cleanData = [
        'idtipodoc'=>$persona->limpiarCadena($_POST['idtipodoc']),
        'num_doc'=>$persona->limpiarCadena($_POST['num_doc']),
        'apellidos'=>$persona->limpiarCadena($_POST['apellidos']),
        'nombres'=>$persona->limpiarCadena($_POST['nombres']),
        'genero'=>$persona->limpiarCadena($_POST['genero']),
        'telefono'=>$persona->limpiarCadena($_POST['telefono'])
      ];

      $respuesta = ['idpersona'=>-1];

      $idpersona = $persona->add($cleanData);

      if($idpersona>0){
        $respuesta['idpersona']=$idpersona;
      }
      echo json_encode($respuesta);
      break;
    case 'updatePersona':
      $cleanData = [
        'idpersona'=>$persona->limpiarCadena($_POST['idpersona']),
        'apellidos'=>$persona->limpiarCadena($_POST['apellidos']),
        'nombres'=>$persona->limpiarCadena($_POST['nombres']),
        'genero'=>$persona->limpiarCadena($_POST['genero']),
        'telefono'=>$persona->limpiarCadena($_POST['telefono'])
      ];

      $respuesta=['update'=>false];

      $update = $persona->updatePersona($cleanData);

      if($update){
        $respuesta['update']=true;
      }
      echo json_encode($respuesta);
      break;
  }
}