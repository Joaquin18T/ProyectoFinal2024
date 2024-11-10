<?php
  session_start();
<<<<<<< HEAD
  if(isset($_SESSION['login']) && $_SESSION['login']['estado']){
    header('Location:http://localhost/SIGEMAPRE/views');
=======
  if(isset($_SESSION['login']) && $_SESSION['login']['permitido']){
    header('Location:http://localhost/SIGEMAPRE/views/index.php');
>>>>>>> c2f0e08fea6493c8c4fb8b739ba5102275c0fae0
  }
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <link rel="stylesheet" href="http://localhost/SIGEMAPRE/css/login.css">
  <title>Login</title>
</head>
<body>
  <div class="container">
    <form action="" id="form-login" class="form-group" autocomplete="off">
      <div class="mb-3 bg pt-5">
        <h2 class="text-center">Login</h2>
        <label for="usuario" class="form-label mt-5">Nombre de Usuario</label>
        <input type="text" class="form-control" id="usuario" required>
      </div>
      <div class="mb-3">
        <label for="passusuario" class="form-label mt-3">Clave Acceso</label>
        <input type="password" class="form-control" id="passusuario" required>
      </div>
      <button type="submit" id="access" class="btn btn-primary">Access</button>
    </form>
  </div>

  <script>
    document.addEventListener("DOMContentLoaded",()=>{
<<<<<<< HEAD
      document.querySelector("#form-login").addEventListener("submit",async(e)=>{
=======
      document.querySelector("#form-login").addEventListener("submit",(e)=>{
>>>>>>> c2f0e08fea6493c8c4fb8b739ba5102275c0fae0
        e.preventDefault();

        const params = new URLSearchParams();
        params.append("operation","login");
<<<<<<< HEAD
        params.append("nom_usuario", document.querySelector("#usuario").value);
        params.append("claveacceso", document.querySelector("#passusuario").value);

        const resp = await fetch(`http://localhost/SIGEMAPRE/controllers/usuario.controller.php`,{
          'method':'POST',
          'body':params
        });
        const data = await resp.json();
        console.log(data);
        
        if(data.login){
          window.location.href='http://localhost/SIGEMAPRE/views/activos/listar-activo';
        }else{
          alert(data.mensaje);
        }
=======
        params.append("usuario", document.querySelector("#usuario").value);
        params.append("passusuario", document.querySelector("#passusuario").value);

        fetch(`./controllers/usuarios.controller.php?${params}`)
        .then(resp=>resp.json())
        .then(acceso=>{
          console.log(acceso);
          if(!acceso.permitido){
            alert(acceso.status);
          }else{
            window.location.href='./views/odt';
          }
        })
        
>>>>>>> c2f0e08fea6493c8c4fb8b739ba5102275c0fae0
      })
    })
  </script>
</body>
</html>