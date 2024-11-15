$(document).ready(async function () {
    //alert("idusuario:" + idusuario)
    function $q(object = null) {
        return document.querySelector(object);
    }

    function $all(object = null) {
        return document.querySelectorAll(object);
    }

    async function getDatos(link, params) {
        let data = await fetch(`${link}?${params}`);
        return data.json();
    }

    //VARIABLES 
    const host = "http://localhost/SIGEMAPRE/controllers/"
    const idtarea = window.localStorage.getItem("idtarea")
    const btnVerActivos = $q("#btnVerActivos")

    //estados 
    let ejecutando = false
    let denegarRegistroMantenimiento = false
    let continuarIncompleto = false

    //UI
    const contenedorEjecucion = $q(".contenedor-ejecucion")
    const cDetallesGenerales = $q(".contenedor-detalles-generales")

    await renderDetallesGenerales()
    await obtenerActivosPorTarea()

    // ********************************* RENDERS ************************************

    async function renderDetallesGenerales() {
        const tarea = await obtenerTareaPorId()
        cDetallesGenerales.innerHTML = `
        <p><strong>Área: </strong>${tarea[0].area}</p>
        <p><strong>Activos: </strong>${tarea[0].descripcion_activos}</p>
        <p><strong>Responsables: </strong>${tarea[0].nombres_responsables}</p>
    `
    }

    //******************************* OBTENER DATOS **************************** */


    async function obtenerActivosPorTarea() {
        const params = new URLSearchParams()
        params.append("operation", "obtenerActivosPorTarea")
        params.append("idtarea", idtarea)
        const activos = await getDatos(`${host}activostarea.controller.php`, params)
        console.log("activos: ", activos)
        return activos
    }

    async function verificarMantenimientoEjecutado(idactivo) {
        const params = new URLSearchParams()
        params.append("operation", "verificarMantenimientoEjecutado")
        params.append("idactivo", idactivo)
        const activo = await getDatos(`${host}tareasmantenimiento.controller.php`, params)
        console.log("activo: ", activo)
        return activo
    }

    async function obtenerMantenimientoPorId(idtm) {
        const params = new URLSearchParams()
        params.append("operation", "obtenerMantenimientoPorId")
        params.append("idtm", idtm)
        const mantenimientos = await getDatos(`${host}tareasmantenimiento.controller.php`, params)
        console.log("mantenimientos: ", mantenimientos)
        return mantenimientos
    }

    async function obtenerTareaPorId() {
        const params = new URLSearchParams()
        params.append("operation", "obtenerTareaPorId")
        params.append("idtarea", idtarea)
        const tarea = await getDatos(`${host}tarea.controller.php`, params)
        console.log("tarea: ", tarea)
        return tarea
    }

    // ****************************** REGISTROS ***********************************

    async function registrarMAR(idtm, idactivo, idusuario) {
        const formMAR = new FormData()
        formMAR.append("operation", "registrar_mar")
        formMAR.append("idtm", idtm)
        formMAR.append("idactivo", idactivo)
        formMAR.append("idusuario", idusuario)
        const Fmar = await fetch(`${host}tareasmantenimiento.controller.php`, { method: "POST", body: formMAR })
        const mar = await Fmar.json()
        return mar
    }

    async function registrarMantenimiento() {
        const formMan = new FormData()
        formMan.append("operation", "registrarTareaMantenimiento")
        formMan.append("idtarea", idtarea)
        formMan.append("descripcion", "")
        const Fman = await fetch(`${host}tareasmantenimiento.controller.php`, { method: "POST", body: formMan })
        const man = await Fman.json()
        return man
    }

    // ********************************* ACTUALIZACIONEAS ************************************

    async function actualizarMantenimiento(idtm, descripcion, fechafinalizado, horafinalizado, tiempoejecutado) {
        const formMan = new FormData()
        formMan.append("operation", "actualizarMantenimiento")
        formMan.append("idtm", idtm)
        formMan.append("descripcion", descripcion)
        formMan.append("fechafinalizado", fechafinalizado)
        formMan.append("horafinalizado", horafinalizado)
        formMan.append("tiempoejecutado", tiempoejecutado)
        const Fman = await fetch(`${host}tareasmantenimiento.controller.php`, { method: "POST", body: formMan })
        const manActualizado = await Fman.json()
        return manActualizado
    }


    // ******************************** EVENTOS *****************************************
    btnVerActivos.addEventListener("click", async () => {
        await abrirModalSidebar()
    })

    // ****************************** HELPERS **********************************************

    function calcularTiempoEjecutado(horaInicio, horaActual) {
        // Convierte las horas a objetos de fecha con la misma referencia de fecha
        const inicio = new Date(`1970-01-01T${horaInicio}Z`);
        const actual = new Date(`1970-01-01T${horaActual}Z`);
        const diferenciaMs = actual - inicio;

        // Calcula horas, minutos y segundos a partir de la diferencia en milisegundos
        const horas = String(Math.floor((diferenciaMs / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutos = String(Math.floor((diferenciaMs / (1000 * 60)) % 60)).padStart(2, '0');
        const segundos = String(Math.floor((diferenciaMs / 1000) % 60)).padStart(2, '0');

        // Devuelve el tiempo en formato "hh:mm:ss"
        return `${horas}:${minutos}:${segundos}`;
    }

    // *************************** MODAL SIDEBAR **************************************
    async function abrirModalSidebar() {
        const bodyModal = $q(".offcanvas-body");
        let idtm = -1
        // Construir el contenido HTML inicial (estructura de los inputs de fecha)        

        // Función para mostrar mantenimientos en el contenedor sin borrar los inputs de fecha
        const activos = await obtenerActivosPorTarea()
        bodyModal.innerHTML = '<h1 class="mb-3">Activos</h1>'
        for (let i = 0; i < activos.length; i++) {
            bodyModal.innerHTML += `                
                <div class="card mb-3 activo-mantenimiento" data-idactivo="${activos[i].idactivo}" style="transition: border 0.3s ease; border: 1px solid gray; cursor: default;" 
                    onmouseover="this.style.border='2px solid #093195'; this.style.cursor='pointer';" 
                    onmouseout="this.style.border='1px solid gray'; this.style.cursor='default';">                    
                    <div class="card-body">
                        <p class="card-text"><strong>Activo: </strong>${activos[i].descripcion}</p>             
                        
                    </div>
                </div>
            `
        }

        const activosMantenimientoCard = $all(".activo-mantenimiento")
        activosMantenimientoCard.forEach(card => {
            card.addEventListener("click", async () => {
                const idactivo = card.getAttribute("data-idactivo")
                console.log("idactivo elegido: ", idactivo)
                const mantenimientoActivo = await verificarMantenimientoEjecutado(idactivo) // verifica si ya existe un mantenimiento registrado a este activo
                console.log("mantenimientoActivo para bug: ", mantenimientoActivo);

                contenedorEjecucion.innerHTML = '';
                let continuarIncompleto = false;

                for (let i = 0; i < mantenimientoActivo.length; i++) {
                    if (mantenimientoActivo[i].idtarea == idtarea) {
                        console.log("mantenimientoActivo si es que quedo incompleto: ", mantenimientoActivo[i]);
                        idtm = mantenimientoActivo[i].idtm
                        contenedorEjecucion.innerHTML = `
                            <div class="row g-0">
                                <div class="col-md-4 p-3 text-center contenedor-evidencias">
                                    <div class="mb-3">
                                        <h5 class="card-title">Evidencias</h5>
                                        <input type="file" name="evidencia[]" id="evidencias-img-input" class="custom-file-input form-control" accept="image/*">
                                    </div>
                                    <div id="preview-container" class="preview-container">
                                        <p id="no-images-text" class="no-images-text">No hay imágenes seleccionadas aún</p>
                                    </div>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body ">
                                        <h5 class="card-title">Descripcion de mantenimiento</h5>
                                        <input type="text" class="form-control mb-3" placeholder="Titulo del mantenimiento" id="txtDescripcionMantenimiento" value="${mantenimientoActivo[i].descripcion ? mantenimientoActivo[i].descripcion : ''}" disabled>

                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <div class="card border-0">
                                                    <div class="card-header border-0 text-center">
                                                        <h5 class="fw-bolder">Tiempo</h5>
                                                    </div>
                                                    <div class="card-body ">
  
                                                        <div class="row">
                                                            <p class="fw-bolder col">Fecha inicial: </p>
                                                            <p class="fw-normal d-flex align-items-center col" id="txtFechaInicial">${mantenimientoActivo[i].fecha_inicio ? mantenimientoActivo[i].fecha_inicio : ''} - ${mantenimientoActivo[i].hora_inicio ? mantenimientoActivo[i].hora_inicio : ''} </p>
                                                        </div>
                                                        <div class="row">
                                                            <p class="fw-bolder col">Fecha acabado: </p>
                                                            <p class="fw-normal d-flex align-items-center col" id="txtFechaFinal">${mantenimientoActivo[i].fecha_finalizado ? mantenimientoActivo[i].fecha_finalizado : ''} - ${mantenimientoActivo[i].hora_finalizado ? mantenimientoActivo[i].hora_finalizado : ''}</p>
                                                        </div>
                                                        <div class="row">
                                                            <p class="fw-bolder col">Tiempo de ejecucion: </p>
                                                            <p class="fw-normal d-flex align-items-center col" id="txtTiempoEjecucion">${mantenimientoActivo[i].tiempo_ejecutado ? mantenimientoActivo[i].tiempo_ejecutado : ''}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="card border-0 text-center">
                                                    <div class="card-header border-0 ">
                                                        <h5 class="fw-bold">Acciones</h5>
                                                    </div>
                                                    ${mantenimientoActivo[i].fecha_finalizado ? `<p>Mantenimiento finalizado</p>` : `
                                                        <div class="card-body contenedor-botones-acciones">
                                                        <div class="card-body text-center">
                                                            <button class="btn btn-primary" id="btn-iniciar" ${mantenimientoActivo[i].fecha_finalizado ? '' : 'disabled'}>Iniciar</button>
                                                        </div>
                                                        <div class="card-body text-center">
                                                            <button class="btn btn-secondary" id="btn-finalizar" ${mantenimientoActivo[i].fecha_finalizado ? 'disabled' : ''}>Finalizar</button>
                                                        </div>

                                                    </div>
                                                        `}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>            
                        `
                        continuarIncompleto = true
                    }

                }


                if (ejecutando) {
                    showToast("Ya estas dando mantenimiento a un activo, primero terminalo.", 'ERROR', 2000)
                } else {

                    if (!continuarIncompleto) {
                        console.log("hola gaaaaaaaaaaaa")
                        contenedorEjecucion.innerHTML = `
                    <div class="row g-0">
                        <div class="col-md-4 p-3 text-center contenedor-evidencias">
                            <div class="mb-3">
                                <h5 class="card-title">Evidencias</h5>
                                <input type="file" name="evidencia[]" id="evidencias-img-input" class="custom-file-input form-control" accept="image/*">
                            </div>
                            <div id="preview-container" class="preview-container">
                                <p id="no-images-text" class="no-images-text">No hay imágenes seleccionadas aún</p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body ">
                                <h5 class="card-title">Descripcion de mantenimiento</h5>
                                <input type="text" class="form-control mb-3" placeholder="Titulo del mantenimiento" id="txtDescripcionMantenimiento"  disabled>
                                <!-- <textarea class="comment-textarea form-control mb-3" id="diagnostico" rows="5" placeholder="Escribe tu diagnostico aquí..." disabled></textarea> -->
                            </div>
                            <div class="card-footer">
                                <div class="row">
                                    <div class="col-md-6 mb-3">
                                        <div class="card border-0">
                                            <div class="card-header border-0 text-center">
                                                <h5 class="fw-bolder">Tiempo</h5>
                                            </div>
                                            <div class="card-body ">
                                                <div class="row">
                                                    <p class="fw-bolder col">Fecha inicial: </p>
                                                    <p class="fw-normal d-flex align-items-center col" id="txtFechaInicial"></p>
                                                </div>
                                                <div class="row">
                                                    <p class="fw-bolder col">Fecha acabado: </p>
                                                    <p class="fw-normal d-flex align-items-center col" id="txtFechaFinal"></p>
                                                </div>
                                                <div class="row">
                                                    <p class="fw-bolder col">Tiempo de ejecucion: </p>
                                                    <p class="fw-normal d-flex align-items-center col" id="txtTiempoEjecucion"></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="card border-0 text-center">
                                            <div class="card-header border-0 ">
                                                <h5 class="fw-bold">Acciones</h5>
                                            </div>
                                            <div class="card-body contenedor-botones-acciones">
                                                <div class="card-body text-center">
                                                    <button class="btn btn-primary" id="btn-iniciar">Iniciar</button>
                                                </div>
                                                <div class="card-body text-center">
                                                    <button class="btn btn-secondary" id="btn-finalizar" disabled>Finalizar</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                `
                    }
                }
                if (continuarIncompleto) {
                    $q("#btn-finalizar")?.addEventListener("click", async () => {
                        if ($q("#txtDescripcionMantenimiento").value == null || $q("#txtDescripcionMantenimiento").value.trim() == '') {
                            showToast("No ha agregado una descripcion", 'ERROR', 1000)
                            return
                        } else {
                            const mantenimientoRegistradoObtenido = await obtenerMantenimientoPorId(idtm);
                            console.log("mantenimientoRegistradoObtenido: ", mantenimientoRegistradoObtenido);

                            // Obtén la hora de inicio
                            const horaInicio = mantenimientoRegistradoObtenido[0].hora_inicio;
                            const ahora = new Date();
                            const fechaActual = ahora.toISOString().split('T')[0]; // Fecha actual (YYYY-MM-DD)
                            const horaActual = ahora.toTimeString().split(' ')[0]; // Hora actual (HH:mm:ss)

                            // Calcula el tiempo ejecutado
                            const tiempoEjecutado = calcularTiempoEjecutado(horaInicio, horaActual);

                            // Deshabilita los botones y llama al procedimiento para actualizar en la base de datos
                            $q(".contenedor-botones-acciones").innerHTML = '<p>Mantenimiento finalizado</p>'
                            const actualizado = await actualizarMantenimiento(idtm, $q("#txtDescripcionMantenimiento").value, fechaActual, horaActual, tiempoEjecutado);
                            console.log("mantenimiento actualizado?: ", actualizado);
                            if (actualizado.actualizado) {
                                $q("#txtFechaFinal").innerText = fechaActual
                                $q("#txtTiempoEjecucion").innerText = tiempoEjecutado
                                $q("#txtDescripcionMantenimiento").disabled = true
                                ejecutando = false
                            }
                            return
                        }


                    });
                }

                $q("#btn-iniciar")?.addEventListener("click", async () => {
                    console.log("clickkckkkckc");
                    ejecutando = true;
                    const idtm = await registrarMantenimiento();
                    console.log("idtm generado : ", idtm);

                    if (idtm.id) {
                        $q("#txtDescripcionMantenimiento").disabled = false;

                        const marRegistrado = await registrarMAR(idtm.id, idactivo, idusuario);
                        console.log("mar registrado: ", marRegistrado);

                        const mantenimientoRegistradoObtenido = await obtenerMantenimientoPorId(idtm.id);
                        console.log("mantenimientoRegistradoObtenido: ", mantenimientoRegistradoObtenido);

                        // Obtén la hora de inicio
                        const horaInicio = mantenimientoRegistradoObtenido[0].hora_inicio;
                        $q("#txtFechaInicial").innerText = `${mantenimientoRegistradoObtenido[0].fecha_inicio} - ${horaInicio}`;

                        // Configuración de los botones
                        $q("#btn-iniciar").disabled = true;
                        $q("#btn-finalizar").disabled = false;

                        // Evento de click para finalizar
                        $q("#btn-finalizar").addEventListener("click", async () => {
                            if ($q("#txtDescripcionMantenimiento").value == null || $q("#txtDescripcionMantenimiento").value.trim() == '') {
                                showToast("No ha agregado una descripcion", 'ERROR', 1000)
                                return
                            } else {
                                const ahora = new Date();
                                const fechaActual = ahora.toISOString().split('T')[0]; // Fecha actual (YYYY-MM-DD)
                                const horaActual = ahora.toTimeString().split(' ')[0]; // Hora actual (HH:mm:ss)

                                // Calcula el tiempo ejecutado
                                const tiempoEjecutado = calcularTiempoEjecutado(horaInicio, horaActual);

                                // Deshabilita los botones y llama al procedimiento para actualizar en la base de datos
                                $q(".contenedor-botones-acciones").innerHTML = '<p>Mantenimiento finalizado</p>'
                                const actualizado = await actualizarMantenimiento(idtm.id, $q("#txtDescripcionMantenimiento").value, fechaActual, horaActual, tiempoEjecutado);
                                console.log("mantenimiento actualizado?: ", actualizado);
                                if (actualizado.actualizado) {
                                    $q("#txtFechaFinal").innerText = `${fechaActual} - ${horaActual}`
                                    $q("#txtTiempoEjecucion").innerText = tiempoEjecutado
                                    $q("#txtDescripcionMantenimiento").disabled = true
                                    ejecutando = false
                                }
                                return
                            }
                        });
                    }
                });
                return
            })
        })

    }

});