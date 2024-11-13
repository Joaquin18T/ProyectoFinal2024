<?php require_once '../header.php' ?>
<h2>USUARIOS</h2>
<div class="row">
  <div class="col-md-12">
    <div class="card">
      <div class="card-header card-header d-flex justify-content-between m-0">
        <p class="pt-1 mb-0">Lista de usuarios</p>
        <a href="http://localhost/SIGEMAPRE/views/usuarios/registrar-usuario" class="btn btn-primary btn-sm ms-auto">Registrar</a>
      </div>
      <div class="card-body">
        <div class="row g-0 md-3">
          <div class="card">
            <div class="card-body">
              <div class="row g-2 md-3">
                <div class="col-md-3">
                  <div class="form-floating">
                    <input type="text" class="form-control filters" id="dato" placeholder="Apellidos y Nombres" name="dato" autocomplete="off">
                    <label for="dato" class="form-label">Apellidos y Nombres</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <input type="text" class="form-control filters" id="numdoc" placeholder="Escribe num. de doc." name="numdoc" autocomplete="off">
                    <label for="numdoc" class="form-label">Numero de Doc.</label>
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
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="estado" id="estado" class="form-select filters">
                      <option value="">Selecciona</option>
                      <option value="1">Activo</option>
                      <option value="0">Inactivo</option>
                    </select>
                    <label for="estado" class="form-label">Estados</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="tipodoc" id="tipodoc" class="form-select filters">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="tipodoc" class="form-label">Tipo Doc</label>
                  </div>
                </div>
              </div>
              <div class="row g-2 md-3 mt-1">
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="responsable" id="responsable" class="form-select filters">
                      <option value="">Selecciona</option>
                      <option value="0">Usuarios</option>
                      <option value="1">Responsables</option>
                    </select>
                    <label for="responsable" class="form-label">Responsables</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="area" id="area" class="form-select filters">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="area" class="form-label">Areas</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card mt-3 content-table">
          <div class="card-body">
            <div class="row g-3 p-2">
              <div class="table-responsive">
                <table class="table table-striped" id="tb-usuarios">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nom. Usuario</th>
                      <th>Rol</th>
                      <th>Nombres y Ap.</th>
                      <th>Tipo doc.</th>
                      <th>Num. doc.</th>
                      <th>Genero</th>
                      <th>Estado</th>
                      <th>Area</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="tbody-usuarios">

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal actualizar usuario -->
  <div class="modal fade" id="modal-update-user" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Actualizar datos del usuario</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h4>¿Estas seguro de actualizar?</h4>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" id="aceppt-update">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- ./Modal actualizar usuario -->

  <div class="modal fade" id="modal-baja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Dar de baja</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h2>¿Estas seguro de dar de baja al usuario?</h2>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="aceptar-baja">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
</div>

<?php require_once '../footer.php' ?>

<!-- LIBRERIA -->
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
<script src="<?= $host ?>js/usuarios/list-usuario.js"></script>
</body>

</html>