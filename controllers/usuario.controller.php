<?php

session_start();

header("Content-type: application/json; charset=utf-8");

//Configuracion de inicio de sesion
if(!isset($_SESSION['login']) || $_SESSION['login']['estado']==false){
  $session=[
    "estado"=>false,
    "inicio"=>"",
    "idusuario"=>-1,
    "apellidos"=>"",
    "nombres"=>"",
    "nom_usuario"=>"",
    "claveacceso"=>"",
    "perfil"=>"",
    "accesos"=>[],
  ];
}

require_once '../models/Usuario.php';
//require_once '../models/Usuario.php';

$usuario = new Usuario();

if(isset($_GET['operation'])){
  switch($_GET['operation']){
    case 'destroy':
      session_destroy();
      session_unset();
      header("location:http://localhost/SIGEMAPRE/");
      break;
  }
}

if(isset($_POST['operation'])){
  switch($_POST['operation']){
    case 'login':
      $nomUser = $usuario->limpiarCadena($_POST['nom_usuario']);
      $registro = $usuario->login(['nom_usuario'=>$nomUser]);

      //Arreglo que se comunica con la vista
      $resultados = [
        "login"=>false,
        "mensaje"=>""
      ];

      if($registro){
        $claveEncriptada = $registro[0]['claveacceso']; //DB
        $claveIngresada = $usuario->limpiarCadena($_POST['claveacceso']);

        if(password_verify($claveIngresada, $claveEncriptada)){
          $resultados['login'] = true;
          $resultados['mensaje'] = "Bienvenido";

          //Ya esta validado
          $session['estado'] = true;
          $session['inicio'] = date('h:i:s d-m-Y');
          $session['idusuario'] = $registro[0]['idusuario'];
          $session['apellidos'] = $registro[0]['apellidos'];
          $session['nombres'] = $registro[0]['nombres'];
          $session['nom_usuario'] = $registro[0]['nom_usuario'];
          $session['claveacceso'] = $registro[0]['claveacceso'];
          $session['perfil'] = $registro[0]['perfil'];

          $accesos = $usuario->getPermisos(['idperfil'=>$registro[0]['idperfil']]);
          $session['accesos']=$accesos;
        }else{
          $resultados['mensaje'] = "Error en la contraseña";
          $session['estado'] = false;
          $session['apellidos'] = "";
          $session['nombres'] = "";
        }
      }else{
        $resultados['mensaje'] = "No existe el usuario";
        $session['estado'] = false;
        $session['apellidos'] = "";
        $session['nombres'] = "";
      }

      $_SESSION['login'] = $session;
      echo json_encode($resultados);
      break;
  }
}