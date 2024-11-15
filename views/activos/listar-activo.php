<?php require_once '../header.php' ?>
<h2>ACTIVOS</h2>
<div class="row">
  <div class="col-md-12">
    <div class="card">
      <div class="card-header d-flex justify-content-between m-0">
        <div class="mb-0 pt-1">Lista de Activos</div>
        <button class="btn btn-outline-success btn-sm text-end" type="button" id="toRegistrar">Registrar</button>
      </div>
      <div class="card-body">
        <div class="row g-0 mb-3">
          <div class="card">
            <div class="card-body">
              <div class="row g-2">
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="categoria" id="categoria" class="form-select filter">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="categoria" class="form-label">Categorias</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="subcategoria" id="subcategoria" class="form-select filter">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="subcategoria" class="form-label">Subcategorias</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="marca" id="marca" class="form-select filter">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="marca">Marca</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <input type="text" class="form-control filter" id="cod_identificacion" autocomplete="off">
                    <label for="cod_identificacion">Cod. Identif.</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <input type="text" class="form-control filter" id="modelo" autocomplete="off">
                    <label for="modelo">Modelo</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="estado" id="estado" class="form-select filter">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="estado">Estado</label>
                  </div>
                </div>
              </div>
              <div class="row mt-1 g-2">
                <div class="col-md-2">
                  <div class="form-floating">
                    <select name="area" id="area" class="form-select filter">
                      <option value="">Selecciona</option>
                    </select>
                    <label for="area" class="form-label">Areas</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <input type="date" class="form-control filter" id="fecha_adquisicion">
                    <label for="fecha_adquisicion">Fecha Inicio</label>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="form-floating">
                    <input type="date" class="form-control filter" id="fecha_adquisicion_fin">
                    <label for="fecha_adquisicion_fin">Fecha Fin</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="row g-5">
              <div class="table-responsive">
                <table class="table" id="table-activos">
                  <colgroup>
                    <col style="width:0.2%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:1%">
                    <col style="width:2%">
                  </colgroup>
                  <thead class="text-center">
                    <tr>
                      <th>#</th>
                      <th>Categoria</th>
                      <th>Subcategoria</th>
                      <th>Marca</th>
                      <th>Modelo</th>
                      <th>Cod. Identif.</th>
                      <th>Fecha adq.</th>
                      <th>Estado</th>
                      <th>Especificaciones</th>
                      <th>Area</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="tb-body-activo">
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <!-- Modal para actualizar el activo -->
  <div class="modal fade" tabindex="-1" id="modal-update">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">¿Deseas actualizar el activo?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <a class="btn btn-sm btn-success" href="<?= $host ?>views/activo/update-activo">Actualizar</a>
        </div>
      </div>
    </div>
  </div>
  <!-- ./Modal para actualizar el activo -->
</div>

<!-- SIDEBAR PARA EL REGISTRO DE ACTIVOS -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="sbRegistrar" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">Datos por defecto para el registro</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="row">
      <div class="row">
        <div class="col-md-6">
          <div class="form-floating">
            <input type="number" class="form-control h-100" id="cantidadEnviar" min="0">
            <label for="cantidadEnviar">Cantidad</label>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-md-9">
          <div class="form-floating">
            <select name="sb-subcategoria" id="sb-subcategoria" class="form-control">
              <option value="">Selecciona</option>
            </select>
            <label for="sb-subcategoria" class="form-label">Subcategorias</label>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-9">
          <div class="form-floating">
            <select name="sb-marca" id="sb-marca" class="form-control">
              <option value="">Selecciona</option>
            </select>
            <label for="sb-marca" class="form-label">Marcas</label>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-9">
          <div class="form-floating">
            <input type="text" class="form-control" id="sb-modelo">
            <label for="sb-modelo" class="form-label">Modelo</label>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-9">
          <div class="form-floating">
            <input type="date" class="form-control" id="sb-fecha">
            <label for="sb-fecha" class="form-label">Fecha de registro</label>
          </div>
        </div>
      </div>
      <div class="row mt-3 d-flex justify-content-between">
        <div class="text-end col-12">
          <button type="button" class="btn btn-sm btn-primary mt-2" id="registerAceptar" disabled>Ir a registrar</button>
        </div>
      </div>
    </div>

  </div>
</div>
<!-- ./SIDEBAR PARA EL REGISTRO DE ACTIVOS -->

<!-- SIDEBAR DE DETALLES DE LA BAJA DE UN ACTIVO-->
<div class="offcanvas offcanvas-end" tabindex="-1" id="activo-baja-detalle" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasRightLabel">DETALLES DE LA BAJA</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body g-3">
    <div class="row">
      <div class="col-md-6 pt-2">
        <p id="desc">Descrip. Activo</p>
      </div>
      <div class="col-md-3 pt-1">
        <button class="btn btn-sm btn-info w-75 text-first" type="button">+</button>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <p id="fecha-baja">12/09/2018</p>
        <p id="aprobacion">Pedro Diaz (pedro3f)</p>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-12">
        <div>
          <strong>Motivo:</strong>
          <p class="text-break" id="motivo">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellendus velit
            exercitationem vitae placeat necessitatibus voluptas aut quod deserunt magnam.
          </p>
        </div>
        <div class="pt-2">
          <strong>Comentario Adicional:</strong>
          <p class="text-break" id="comentario">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto repellendus velit
            exercitationem vitae placeat necessitatibus voluptas aut quod deserunt magnam.
          </p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-5">
        <a class="btn btn-sm btn-success" id="view-pdf-baja" target="_blank">ver PDF</a>
      </div>
    </div>
  </div>
</div>
<!-- ./SIDEBAR DE DETALLES DE LA BAJA DE UN ACTIVO-->

<?php require_once '../footer.php' ?>

<!-- LIBRERIA -->
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
<script src="<?= $host ?>js/activos/list-activo.js"></script>
</body>

</html>