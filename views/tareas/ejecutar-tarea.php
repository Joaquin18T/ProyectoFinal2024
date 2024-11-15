<?php require_once '../header.php' ?>

<div class="container-fluid">
    <div class="card mb-3">
        <div class="card-header border-0">
            <h2>Detalles generales</h2>
            <div class=" card-body">
                <div class="row">
                    <div class="col-md-6 contenedor-detalles-generales">
                        
                    </div>
                    <div class="col-md-6 text-center mt-3">
                        <button class="btn btn-primary" id="btnVerActivos" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" autofocus>Ver activos</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card mb-3 contenedor-ejecucion" style="max-width: 100%;">
        <h2 class="text-center">Manos a la obra!</h2>
    </div>
</div>

<!-- MODAL SIDEBAR -->
<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">

    </div>
</div>

<?php require_once '../footer.php' ?>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js"></script>
<script>
    const idusuario = "<?php echo $_SESSION['login']['idusuario']; ?>"
</script>
<script src="http://localhost/SIGEMAPRE/js/tareas/ejecutar.js"></script>

</body>

</html>