<?php require_once '../header.php' ?>

<div class="container-fluid py-1" id="contenedor-registrar-odt">
    <div class="row "><!--  style="height: 90vh;" -->
        <!-- <div class="contenedor-diagnostico-evidencia col align-items-stretch tab-pane show pe-0 fade d-md-flex active kanban-col mb-3">
            <div class="card border-0 pb-3 w-100">
                <div class="card-body p-4">
                    <h2 class="fs-5 fw-normal text-dark mb-2">Evidencias</h2>
                    <div class="px-md-2 pt-2 me-0 pe-1 me-md-1" style="/*max-height: calc(100vh - 150px);*//*overflow-y: auto;*/">
                        <div class="contenedor-evidencias">
                            <div class="mb-3">
                                <input type="file" name="evidencia[]" id="evidencias-img-input" class="custom-file-input form-control"
                                    accept="image/*">
                            </div>
                            <div id="preview-container" class="preview-container">
                                <p id="no-images-text" class="no-images-text">No hay imágenes seleccionadas aún</p>
                            </div>
                        </div>
                        <hr>
                        <div class="contenedor-diagnostico-entrada mb-3">
                            <h2 class="fs-5 fw-normal text-dark mb-2">Diagnostico de Entrada</h2>
                            <textarea class="comment-textarea form-control" id="diagnostico-entrada" rows="5" placeholder="Escribe tu diagnostico aquí..."></textarea>
                        </div>
                        <div class="row" id="contenedor-fecha-hora">
                            <div class="form-floating mb-3 col-md-6">
                                <input type="date" class="form-control" id="fecha-vencimiento" placeholder="Fecha de vencimiento">
                                <label for="fecha-vencimiento" class="form-label">Fecha de vencimiento</label>
                            </div>
                            <div class="form-floating mb-3 col-md-6">
                                <input type="time" class="form-control" id="hora-vencimiento" placeholder="Hora de vencimiento"  />
                                <label for="hora-vencimiento" class="form-label">Hora de Vencimiento</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="contenedor-responsables col align-items-stretch tab-pane show pe-0 fade d-md-flex active kanbancol mb-3">
            <div class="card border-0 pb-3 w-100">
                <div class="card-body p-4">
                    <h2 class="fs-5 fw-normal text-dark mb-2">Asignar Activo</h2>
                    <div class="px-md-2 pt-2 me-0 pe-1 me-md-1" style="/*max-height: calc(100vh - 150px);*//*overflow-y: auto;*/">
                        <div class="card mb-3">
                            <div class="card-header">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-floating mb-3">
                                            <select class="form-select filtro" id="area" autofocus required>
                                            </select>
                                            <label for="area" class="form-label">Área</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-floating mb-3">
                                            <select class="form-select filtro" id="categoria" required>
                                            </select>
                                            <label for="categoria" class="form-label">Categoria</label>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-floating mb-3">
                                            <select class="form-select filtro" id="subcategoria" required>
                                            </select>
                                            <label for="subcategoria" class="form-label">Subcategoria</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table id="tablaActivos" class="stripe row-border order-column nowrap table-hover" style="width:100%">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Id</th>
                                                <th>Activo</th>
                                                <th>Marca</th>
                                                <th>Modelo</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="activoBodyTable"></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button type="button" class="btn btn-primary" id="btnAsignarResponsables" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled>Asignar Responsables</button>
                            </div>
                        </div>

                        <div class="card">
                            <div class="card-body">
                                <div class="contenedor-responsables-asignados">
                                    <ul>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row justify-content-center">
        <button id="btnCrearTarea" class="mb-3 btn btn-primary">Generar Tarea</button>
    </div>
    <!-- MODAL DE MOSTRAR RESPONSABLES -->
    <!-- <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRightResponsables" aria-labelledby="offcanvasRightResponsablesLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightResponsablesLabel">Offcanvas right</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <h3>Asignar un responsable</h3>
            <p>Usuarios disponibles.</p>
            <table class="tUsuarios">
                <thead>
                    <th>#</th>
                    <th>Usuario</th>
                    <th>Estado</th>
                    <th>Rol</th>
                </thead>
                <tbody class="tbodyUsuarios">

                </tbody>
                <button id="btnConfirmarAsignacion" disabled>Confirmar</button>
            </table>
        </div>
    </div> -->

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Asignar responsable</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-responsable-container card">
                    <div class="table-responsive">
                        <table id="tablaResponsables" class="stripe row-border order-column nowrap table-hover px-4" style="width:100%">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Usuario</th>
                                </tr>
                            </thead>
                            <tbody id="responsableBodyTable"></tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="btnConfirmarAsignacion" disabled>Hecho</button>
                </div>
            </div>
        </div>
    </div>

</div>


<?php require_once '../footer.php' ?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>

<script src="http://localhost/SIGEMAPRE/js/tareas/registrar.js"></script>

</body>

</html>