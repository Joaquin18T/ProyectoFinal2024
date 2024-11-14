<?php

session_start();

header("Content-type: application/json; charset=utf-8");

//Configuracion de inicio de sesion
if (!isset($_SESSION['login']) || $_SESSION['login']['estado'] == false) {
  $session = [
    "estado" => false,
    "inicio" => "",
    "idusuario" => -1,
    "apellidos" => "",
    "nombres" => "",
    "nom_usuario" => "",
    "claveacceso" => "",
    "perfil" => "",
    "accesos" => [],
  ];
}

require_once '../models/Usuario.php';
//require_once '../models/Usuario.php';

$usuario = new Usuario();

if (isset($_GET['operation'])) {
  switch ($_GET['operation']) {
    case 'destroy':
      session_destroy();
      session_unset();
      header("location:http://localhost/SIGEMAPRE/");
      break;
    case 'FiltrarUsers':
      $cleanData = [
        'dato' => $_GET['dato'] == '' ? null : $usuario->limpiarCadena($_GET['dato']),
        'numdoc' => $_GET['numdoc'] == '' ? null : $usuario->limpiarCadena($_GET['numdoc']),
        'idtipodoc' => $_GET['idtipodoc'] == '' ? null : $usuario->limpiarCadena($_GET['idtipodoc']),
        'estado' => $_GET['estado'] == '' ? null : $usuario->limpiarCadena($_GET['estado']),
        'responsable_area' => $_GET['responsable_area'] == '' ? null : $usuario->limpiarCadena($_GET['responsable_area']),
        'idarea' => $_GET['idarea'] == '' ? null : $usuario->limpiarCadena($_GET['idarea']),
        'idperfil' => $_GET['idperfil'] == '' ? null : $usuario->limpiarCadena($_GET['idperfil'])
      ];
      echo json_encode($usuario->filtrarUsuarios($cleanData));
      break;
    case 'getUserById':
      echo json_encode($usuario->getUsuarioById(['idusuario' => $_GET['idusuario']]));
      break;
    case 'searchNomUsuario':
      echo json_encode($usuario->searchUser(['nom_usuario' => $_GET['nom_usuario']]));
      break;
    case 'existeResponsableArea':
      echo json_encode($usuario->existeResponsableArea(['idarea' => $_GET['idarea']]));
      break;

    case 'filtrarUsuariosArea':
      echo json_encode($usuario->filtrarUsuariosArea(['idarea' => $_GET['idarea']]));
      break;
    case 'getIdAdmin':
      echo json_encode($usuario->getIdAdmin());
      break;
    case 'getIdSupervisorArea':
      echo json_encode($usuario->getIdSupervisorArea(['idarea'=>$_GET['idarea']]));
      break;
  }
}

if (isset($_POST['operation'])) {
  switch ($_POST['operation']) {
    case 'login':
      $nomUser = $usuario->limpiarCadena($_POST['nom_usuario']);
      $registro = $usuario->login(['nom_usuario' => $nomUser]);

      //Arreglo que se comunica con la vista
      $resultados = [
        "login" => false,
        "mensaje" => ""
      ];

      if ($registro) {
        $claveEncriptada = $registro[0]['claveacceso']; //DB
        $claveIngresada = $usuario->limpiarCadena($_POST['claveacceso']);

        if (password_verify($claveIngresada, $claveEncriptada)) {
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

          $accesos = $usuario->getPermisos(['idperfil' => $registro[0]['idperfil']]);
          $session['accesos'] = $accesos;
        } else {
          $resultados['mensaje'] = "Error en la contraseña";
          $session['estado'] = false;
          $session['apellidos'] = "";
          $session['nombres'] = "";
        }
      } else {
        $resultados['mensaje'] = "No existe el usuario";
        $session['estado'] = false;
        $session['apellidos'] = "";
        $session['nombres'] = "";
      }

      $_SESSION['login'] = $session;
      echo json_encode($resultados);
      break;
    case 'addUser':
      $clave = $usuario->limpiarCadena($_POST['claveacceso']);
      $cleanData = [
        'idpersona' => $usuario->limpiarCadena($_POST['idpersona']),
        'nom_usuario' => $usuario->limpiarCadena($_POST['nom_usuario']),
        'claveacceso' => password_hash($clave, PASSWORD_BCRYPT),
        'perfil' => $usuario->limpiarCadena($_POST['perfil']),
        'idperfil' => $usuario->limpiarCadena($_POST['idperfil']),
        'idarea' => $usuario->limpiarCadena($_POST['idarea']),
        'responsable_area' => $usuario->limpiarCadena($_POST['responsable_area'])
      ];

      $respuesta = ['idusuario' => -1];

      $idusuario = $usuario->add($cleanData);
      if ($idusuario > 0) {
        $respuesta['idusuario'] = $idusuario;
      }
      echo json_encode($respuesta);
      break;
    case 'updateUser':
      $cleanData = [
        'idusuario' => $usuario->limpiarCadena($_POST['idusuario']),
        'idperfil' => $usuario->limpiarCadena($_POST['idperfil'])
      ];

      $respuesta = ['idpersona' => -1];

      $idpersona = $usuario->updateUsuario($cleanData);
      if ($idpersona > 0) {
        $respuesta['idpersona'] = $idpersona;
      }
      echo json_encode($respuesta);
      break;
    case 'cambiarAreaUser':
      $cleanData = [
        'idusuario' => $usuario->limpiarCadena($_POST['idusuario']),
        'idarea' => $usuario->limpiarCadena($_POST['idarea'])
      ];

      $respuesta = ['update' => false];
      $update = $usuario->cambiarAreaUsuario($cleanData);

      if ($update) {
        $respuesta['update'] = true;
      }
      echo json_encode($respuesta);
      break;
    case 'updateEstadoUser':
      $cleanData = [
        'idusuario' => $usuario->limpiarCadena($_POST['idusuario']),
        'estado' => $usuario->limpiarCadena($_POST['estado'])
      ];
      $respuesta = ['update' => false];

      $update = $usuario->updateEstado($cleanData);

      if ($update) {
        $respuesta['update'] = true;
      }
      echo json_encode($respuesta);
      break;
    case 'designarReponsableArea':
      $cleanData = [
        'idusuario' => $usuario->limpiarCadena($_POST['idusuario']),
        'responsable_area' => $usuario->limpiarCadena($_POST['responsable_area'])
      ];
      $respuesta = ['update' => false];

      $update = $usuario->designarResponsableArea($cleanData);
      if ($update) {
        $respuesta['update'] = true;
      }
      return $respuesta;
      break;
  }
}
