<?php require_once '../header.php' ?>

<h2>USUARIOS</h2>
<div class="row g-0">
  <div class="col-md-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between m-0">
        <p class="mb-0 m-0">Actualizar datos del usuario</p>
        <a href="<?= $host ?>views/usuarios/listar-usuario" class="btn btn-sm btn-outline-warning">Volver</a>
      </div>
      <div class="card-body">
        <h5>Datos de la Persona</h5>
        <form action="" autocomplete="off" class="mt-3" id="form-update-user">
          <div class="row g-2">
            <div class="col-md-3">
              <div class="input-group h-100">
                <input type="text"
                  id="numDoc"
                  placeholder="Num Doc."
                  pattern="[0-9]*"
                  class="form-control"
                  minlength="8"
                  maxlength="20"
                  required
                  autofocus
                  title="Por favor ingresa solo números.">
                <span class="input-group-text bg-success" style="cursor: pointer;" id="search">
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-floating">
                <input type="text" class="form-control w-100" id="apellidos" placeholder="Apellidos" minlength="3" required>
                <label for="apellidos" class="form-label">Apellidos</label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-floating">
                <input type="text" class="form-control w-100" id="nombres" placeholder="Nombres" required>
                <label for="nombres" class="form-label">Nombres</label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="telefono"
                  placeholder="Telefono"
                  pattern="[0-9]+"
                  maxlength="9"
                  minlength="9">
                <label for="telefono" class="form-label">Telefono</label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-floating">
                <select name="genero" id="genero" class="form-select w-100" required>
                  <option value="">Selecciona Genero</option>
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                </select>
                <label for="genero" class="form-label">Genero</label>
              </div>
            </div>
          </div>
          <div class="row g-2 mt-2">
            <h5>Datos del Usuario</h5>
            <div class="col-md-2">
              <div class="form-floating">
                <input type="text" id="usuario" class="form-control" placeholder="Nom. Usuario" required>
                <label for="usuario">Nombre Usuario</label>
              </div>
            </div>
            <div class="col-md-2">
              <div class="form-floating">
                <select name="perfil" id="perfil" class="form-select filters">
                  <option value="">Selecciona</option>
                </select>
                <label for="perfil" class="form-label">Perfiles</label>
              </div>
            </div>
          </div>
          <div class="row g-2 mb-2 mt-2">
            <div class="col-md-3">
              <button type="submit" class="form-control btn btn-primary w-50" id="btnEnviar">
                Registrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

<?php require_once '../footer.php' ?>
<script src="<?=$host?>js/usuarios/update-usuario.js"></script>