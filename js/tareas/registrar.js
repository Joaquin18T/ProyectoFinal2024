$(document).ready(async function () {
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
    let tbActivos = null
    let tbResponsables = null

    //UI
    const selectArea = $q("#area");
    const selectCategoria = $q("#categoria");
    const selectSubcategoria = $q("#subcategoria");
    const filtro = $q(".filtro") //podra tener poder de manipular el change de cada select
    const tbodyActivos = $q("#activoBodyTable")
    const tbodyResponsables = $q("#responsableBodyTable")
    const btnAsignarResponsables = $q("#btnAsignarResponsables")
    //const btnConfirmarAsignacion = $q("#btnConfirmarAsignacion")
    const btnOrdenarTarea = $q("#btnOrdenarTarea")
    //LISTAS
    let activosElegidos = []
    let responsablesElegidos = []

    //MODAL
    let modalMantenimientosContainer = $q(".modal-mantenimientos-container")

    //render
    await renderSelectArea()
    //****************************** OBTENER DATOS **************************************** */
    async function obtenerAreas() {
        const params = new URLSearchParams()
        params.append("operation", "getAll")
        const data = await getDatos(`${host}area.controller.php`, params)
        console.log("areas obtenidas: ", data)
        return data
    }

    async function obtenerCategoriasPorArea(idarea) {
        const params = new URLSearchParams()
        params.append("operation", "obtenerCategoriasPorArea")
        params.append("idarea", idarea)
        const data = await getDatos(`${host}categoria.controller.php`, params)
        console.log("categorias obtenidas: ", data)
        return data
    }

    async function obtenerSubCategoriasPorCategoria(idcategoria) {
        const params = new URLSearchParams()
        params.append("operation", "getSubcategoriaByCategoria")
        params.append("idcategoria", idcategoria)
        const data = await getDatos(`${host}subcategoria.controller.php`, params)
        console.log("Sub categorias obtenidas: ", data)
        return data
    }

    async function obtenerCategorias() {
        const params = new URLSearchParams()
        params.append("operation", "getAll")
        const data = await getDatos(`${host}categoria.controller.php`, params)
        console.log("categorias obtenidas: ", data)
        return data
    }

    async function obtenerSubCategorias() {
        const params = new URLSearchParams()
        params.append("operation", "getSubCategoria")
        const data = await getDatos(`${host}subcategoria.controller.php`, params)
        console.log("Subcategorias obtenidas: ", data)
        return data
    }

    async function filtrarActivosAsignados() {
        //fetch
        const params = new URLSearchParams()
        params.append("operation", "filtrarActivosAsignados")
        params.append("idsubcategoria", selectSubcategoria.value)
        const data = await getDatos(`${host}activoAsignado.controller.php`, params)
        return data
    }

    async function filtrarUsuariosArea() {
        console.log("selectArea.value: ", selectArea.value)
        const params = new URLSearchParams()
        params.append("operation", "filtrarUsuariosArea")
        params.append("idarea", selectArea.value)
        const data = await getDatos(`${host}usuario.controller.php`, params)
        return data
    }

    async function filtrarMantenimientosActivos(idactivo, fechainicio, fechafin) {
        const params = new URLSearchParams()
        params.append("operation", "filtrarMantenimientosActivos")
        params.append("idactivo", idactivo)
        params.append("fechainicio", (fechainicio === "" || fechainicio == -1) ? "" : fechainicio)
        params.append("fechafin", (fechafin === "" || fechafin == -1) ? "" : fechafin)
        const data = await getDatos(`${host}reporte.controller.php`, params)
        return data
    }

    // ************************************** REGISTROS *******************************************

    async function registrarTarea(fechaprogramada, horaprogramada) {
        const formTarea = new FormData()
        formTarea.append("operation", "registrarTarea")
        formTarea.append("fecha_programada", fechaprogramada)
        formTarea.append("hora_programada", horaprogramada)
        const Ftarea = await fetch(`${host}tarea.controller.php`, { method: "POST", body: formTarea })
        const tarea = await Ftarea.json()
        return tarea
    }

    async function registrarActivoTarea(idtarea, idactivo) {
        const formAT = new FormData()
        formAT.append("operation", "registrarActivoTarea")
        formAT.append("idtarea", idtarea)
        formAT.append("idactivo", idactivo)
        const Ftarea = await fetch(`${host}activostarea.controller.php`, { method: "POST", body: formAT })
        const tarea = await Ftarea.json()
        return tarea
    }

    async function registrarResponsableTarea(idtarea, idusuario) {
        const formAT = new FormData()
        formAT.append("operation", "registrarResponsableTarea")
        formAT.append("idusuario", idusuario)
        formAT.append("idtarea", idtarea)
        const Fresptarea = await fetch(`${host}respTarea.controller.php`, { method: "POST", body: formAT })
        const respTarea = await Fresptarea.json()
        return respTarea
    }



    // ************************************* RENDER SELECT **********************************
    async function renderSelectArea() {
        const areas = await obtenerAreas()

        selectArea.innerHTML = `<option selected value="-1"></option>`
        areas.forEach(area => {
            selectArea.innerHTML += `
                <option value="${area.idarea}">${area.area}</option>
            `
        });


    }

    // ************************* EVENTOS *****************************************************

    // obtiene las AREAS
    selectArea.addEventListener("change", async () => {
        tbodyActivos.innerHTML = ''
        const categorias = await obtenerCategoriasPorArea(selectArea.value)
        selectCategoria.innerHTML = `<option selected value="-1"></option>`
        selectSubcategoria.innerHTML = `<option selected value="-1"></option>`
        categorias.forEach(categoria => {
            selectCategoria.innerHTML += `
                <option value="${categoria.idcategoria}">${categoria.categoria}</option>
            `
        });
        activosElegidos = []
        btnAsignarResponsables.disabled = true

        /* const categorias = await obtenerCategorias()
        const subcategorias = await obtenerSubCategorias() */
    })

    // obteiene las CATEGORIAS
    selectCategoria.addEventListener("change", async () => {
        tbodyActivos.innerHTML = ''
        const subcategorias = await obtenerSubCategoriasPorCategoria(selectCategoria.value)
        selectSubcategoria.innerHTML = `<option selected value="-1"></option>`
        subcategorias.forEach(subcategoria => {
            selectSubcategoria.innerHTML += `
                <option value="${subcategoria.idsubcategoria}">${subcategoria.subcategoria}</option>
            `
        });
        activosElegidos = []
        btnAsignarResponsables.disabled = true
    })

    // obtiene las SUBCATEGORIAS y MANIPULAMOS LOS CHECKBOXES DE LA TABLA
    selectSubcategoria.addEventListener("change", async () => {
        const activosAsignados = await filtrarActivosAsignados(selectSubcategoria.value)
        console.log("actios asignados: -> ", activosAsignados)
        renderTablaActivos()
        //data-idactivoresp="${actas.idactivo_resp}"
        tbodyActivos.innerHTML = ''
        activosAsignados.forEach(actas => {
            tbodyActivos.innerHTML += `
            <tr>
                <th scope="row">
                    <input type="checkbox" class="activo-checkbox" data-idactas="${actas.idactivo_asig}" data-idactivo="${actas.idactivo}">
                </th>
                <td>${actas.cod_identificacion}</td>
                <td>${actas.descripcion}</td>
                <td>${actas.marca}</td>
                <td>${actas.modelo}</td>
                <td>
                    <button class="btn btn-primary btnVerMantenimientos" data-idactivo="${actas.idactivo}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRightMantenimientos">Ver Mantenimientos</button>
                </td>
            </tr>
            `;
        });

        $all(".btnVerMantenimientos").forEach(chk => {
            const idactivo = chk.getAttribute("data-idactivo")
            console.log("idactivo zz ", idactivo)
            chk.addEventListener("click", async () => {
                console.log("clicaaaaa");
                await abrirModalSidebar(idactivo)


            })
        })

        // Selecciona todos los checkboxes después de renderizar la tabla
        const checkboxes = $all(".activo-checkbox");

        // Marca los checkboxes que están en activosElegidos
        checkboxes.forEach(chk => {
            const idactasignado = parseInt(chk.getAttribute("data-idactas"));
            console.log("idactasignado: ", idactasignado)
            const activoEncontrado = activosElegidos.find(activo => activo.idactivo_asig === idactasignado);
            console.log("actvos elegidos actualmante: ", activosElegidos)


            if (activoEncontrado) {
                chk.checked = true; // Marca el checkbox si el activo ya fue seleccionado previamente
            }

            // Agrega el evento para manejar la selección y deselección
            chk.addEventListener("change", () => {
                const idactivo = parseInt(chk.getAttribute("data-idactivo"));

                if (chk.checked) {
                    // Agrega a `activosElegidos` si está marcado y no existe
                    const encontrado = activosElegidos.find(activo => activo.idactivo_asig === idactasignado);
                    if (!encontrado) {
                        activosElegidos.push({
                            idactivo_asig: idactasignado,
                            idactivo: idactivo
                        });
                    }
                } else {
                    // Elimina de `activosElegidos` si se desmarca
                    activosElegidos = activosElegidos.filter(activo => activo.idactivo_asig !== idactasignado);
                }

                console.log("activosElegidos después del cambio:", activosElegidos);

                // Verifica si al menos uno está marcado y habilita/deshabilita el botón
                btnAsignarResponsables.disabled = activosElegidos.length === 0;
                btnAsignarResponsables.focus()
            });
        });

        btnAsignarResponsables.disabled = activosElegidos.length === 0;
        btnAsignarResponsables.focus()
    });

    btnAsignarResponsables.addEventListener("click", async () => {
        await renderModalResponsables()
    })

    //este evento EJECUTARÁ registrar tarea, registrar activos tarea, registrar responsables tareas
    /*  btnConfirmarAsignacion.addEventListener("click", async () => {
 
     }) */

    btnOrdenarTarea.addEventListener("click", async () => {
        if (activosElegidos.length == 0) {
            showToast("Aun no ha seleccionado activos.", "ERROR", 2000)
            return
        } else if (responsablesElegidos.length == 0) {
            showToast("Aun no ha seleccionado responsables.", "ERROR", 2000)
            return
        }
        else {
            const tareaRegistrada = await registrarTarea() // ESTO ME DEVOLVERA SU ID DE REGISTRO
            console.log("tareaRegistrada -> ", tareaRegistrada)
            for (let i = 0; i < activosElegidos.length; i++) {
                const atRegistrado = await registrarActivoTarea(tareaRegistrada.id, activosElegidos[i].idactivo)
                console.log("atRegistrado -> ", atRegistrado);
            }
            for (let e = 0; e < responsablesElegidos.length; e++) {
                const rtRegistrado = await registrarResponsableTarea(tareaRegistrada.id, responsablesElegidos[e].idusuario)
                console.log("rtRegistrado -> ", rtRegistrado);
            }
            console.log("TAREA ORDENADA!!!!")
            showToast(`Tarea ordenada correctamente`, 'SUCCESS', 3000, 'http://localhost/SIGEMAPRE/views/tareas/listar-tareas');

        }


    })

    // ******************************** RENDER TABLES ************************************************
    function renderTablaActivos() {
        if (tbActivos) {
            tbActivos.clear().rows.add($(tbodyActivos).find('tr')).draw();
        } else {
            // Inicializa DataTable si no ha sido inicializado antes
            tbActivos = $('#tablaActivos').DataTable({
                paging: true,
                ordering: false,
                searching: false,
                lengthMenu: [10, 25, 50, 100],
                pageLength: 10,
                language: {
                    lengthMenu: "Mostrar _MENU_ filas por página",
                    paginate: {
                        previous: "Anterior",
                        next: "Siguiente"
                    },
                    emptyTable: "No hay datos disponibles",
                    search: "Buscar:",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros"
                }
            });
        }
    }

    async function renderModalResponsables() {
        renderTablaResponsables()
        const responsables = await filtrarUsuariosArea()
        console.log("responsables necontrado por area: ", responsables)
        tbodyResponsables.innerHTML = ''
        responsables.forEach(responsable => {
            tbodyResponsables.innerHTML += `
            <tr>
                <th scope="row">
                    <input type="checkbox" class="responsable-checkbox" data-husuario="${responsable.idhistorial_usuario}" data-idusuario="${responsable.idusuario}">
                </th>
                <td>${responsable.nom_usuario}</td>
            </tr>
            `;
        });

        $all(".responsable-checkbox").forEach(chk => {
            const idhusuario = parseInt(chk.getAttribute("data-husuario")); // id historial usuario
            //console.log("idhusuario: ", idhusuario)
            const responsableEncontrado = responsablesElegidos.find(responsable => responsable.idhistorial_usuario === idhusuario);
            if (responsableEncontrado) {
                chk.checked = true
            }
            chk.addEventListener("change", () => {
                const idusuario = parseInt(chk.getAttribute("data-idusuario")); // id usuario
                if (chk.checked) {
                    const encontrado = responsablesElegidos.find(responsable => responsable.idhistorial_usuario === idhusuario)
                    if (!encontrado) {
                        responsablesElegidos.push({
                            idhistorial_usuario: idhusuario,
                            idusuario: idusuario
                        })
                    }
                } else {
                    responsablesElegidos = responsablesElegidos.filter(responsable => responsable.idhistorial_usuario !== idhusuario)
                }

                console.log("responsablesElegidos después del cambio:", responsablesElegidos);

                btnOrdenarTarea.disabled = responsablesElegidos.length === 0
                btnOrdenarTarea.focus()
            })
        })

        btnOrdenarTarea.disabled = responsablesElegidos.length === 0
        btnOrdenarTarea.focus()
    }

    function renderTablaResponsables() {
        if (tbResponsables) {
            tbResponsables.clear().rows.add($(tbodyResponsables).find('tr')).draw();
        } else {
            // Inicializa DataTable si no ha sido inicializado antes
            tbResponsables = $('#tablaResponsables').DataTable({
                paging: true,
                ordering: false,
                searching: false,
                lengthMenu: [10, 25, 50, 100],
                pageLength: 10,
                language: {
                    lengthMenu: "Mostrar _MENU_ filas por página",
                    paginate: {
                        previous: "Anterior",
                        next: "Siguiente"
                    },
                    emptyTable: "No hay datos disponibles",
                    search: "Buscar:",
                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros"
                }
            });
        }


    }

    // ******************************** RENDER MODAL SIDEBAR ***********************************************

    async function abrirModalSidebar(idactivo) {
        const bodyModal = $q(".offcanvas-body");

        // Construir el contenido HTML inicial (estructura de los inputs de fecha)
        bodyModal.innerHTML = `
            <h2>Mantenimientos</h2>
            <div class="card mb-3">
                <div class="card-header row">
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control filtro-fecha" id="txtFechaInicio" placeholder="Fecha Inicio">
                            <label for="txtFechaInicio" class="form-label">Fecha Inicio</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="date" class="form-control filtro-fecha" id="txtFechaFin" placeholder="Fecha Fin">
                            <label for="txtFechaFin" class="form-label">Fecha Fin</label>
                        </div>
                    </div>
                </div>    
            </div>
            <div id="mantenimientos-container"></div> <!-- Contenedor para los mantenimientos filtrados -->
        `;

        const txtFechaInicio = document.querySelector("#txtFechaInicio");
        const txtFechaFin = document.querySelector("#txtFechaFin");

        // Función para mostrar mantenimientos en el contenedor sin borrar los inputs de fecha
        async function mostrarMantenimientos(fechaInicio = "", fechaFin = "") {
            const mantenimientos = await filtrarMantenimientosActivos(idactivo, fechaInicio, fechaFin);
            console.log("mantenimientos del activo:", mantenimientos);

            // Generar el HTML para los mantenimientos
            let mantenimientosHtml = mantenimientos.length > 0
                ? mantenimientos.map(m => `
                    <div class="card mb-3">                    
                        <div class="card-body">
                            <p class="card-text"><strong>Descripción: </strong>${m.descripcion_mantenimiento}</p>             
                            <p class="card-text"><strong>Fecha comienzo: </strong>${m.fecha_inicio}</p>
                            <p class="card-text"><strong>Fecha finalizado: </strong>${m.fecha_finalizado}</p>
                        </div>
                    </div>
                `).join('')
                : `<h2>No hay mantenimientos en estas fechas</h2>`;

            // Asignar el HTML generado al contenedor de mantenimientos
            document.getElementById("mantenimientos-container").innerHTML = mantenimientosHtml;
        }

        // Llamar a la función inicialmente para cargar todos los mantenimientos
        await mostrarMantenimientos();

        // Asignar eventos de cambio a los inputs de fecha para actualizar los mantenimientos al filtrar
        $all(".filtro-fecha").forEach(input => {
            input.addEventListener("change", async () => {
                await mostrarMantenimientos(txtFechaInicio.value || "", txtFechaFin.value || "");
            });
        });
    }


})




