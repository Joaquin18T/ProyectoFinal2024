$(document).ready(async function () {
    console.log("idusuario" + idusuario)
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
    console.log("hoa")
    // ************************************ SECCION DE REGISTROS *************************************************

    async function registrarTarea(idusuario, fecha_inicio, hora_inicio) {
        const formTarea = new FormData()
        formTarea.append("operation", "registrarTarea")
        formTarea.append("idusuario", idusuario)
        formTarea.append("fecha_inicio", fecha_inicio)
        formTarea.append("hora_inicio", hora_inicio)
        const dataTarea = await fetch(`${host}tarea.controller.php`, { method: 'POST', body: formTarea })
        const idodt = await dataTarea.json()
        return idodt
    }

    async function registrarActivoTarea(idtarea, idactivo) {
        const formTarea = new FormData()
        formTarea.append("operation", "registrarActivoTarea")
        formTarea.append("idtarea", idtarea)
        formTarea.append("idactivo", idactivo)
        const dataTarea = await fetch(`${host}activostarea.controller.php`, { method: 'POST', body: formTarea })
        const idodt = await dataTarea.json()
        return idodt
    }

    /// *************************************** SECCION DE OBTENER DATOS ***************************************
    async function obtenerTareasPorEstado(idestado) {
        const params = new URLSearchParams()
        params.append("operation", "obtenerTareasPorEstado")
        params.append("idestado", idestado)
        const tareas = await getDatos(`${host}tarea.controller.php`, params)
        //console.log("tareas: ", tareas)
        return tareas
    }

    async function obtenerTareaPorId(idtarea) {
        const params = new URLSearchParams()
        params.append("operation", "obtenerTareaPorId")
        params.append("idtarea", idtarea)
        const tarea = await getDatos(`${host}tarea.controller.php`, params)
        console.log("tarea: ", tarea)
        return tarea
    }


    // ***************************** RENDERIZAR KANBAN ************************************************

    var kanban = new jKanban({
        element: '#kanban-container', // ID del contenedor
        boards: [
            {
                id: 'b-pendientes',
                title: 'Pendientes',
                class: 'pendientes',
                item: []
            },
            {
                id: 'b-proceso',
                title: 'En Proceso',
                class: 'proceso',
                item: []
            },
            {
                id: 'b-revision',
                title: 'En Revision',
                class: 'revision',
                item: []
            },
            {
                id: 'b-finalizado',
                title: 'Finalizadas',
                class: 'finalizadas',
                item: []
            }
        ],
        dragBoards: false,
        widthBoard: '400px',
        dropEl: async function (el, target, source, sibling) {
            var cardId = el.getAttribute('data-eid'); // ID de la tarjeta
            var targetBoardId = target.parentElement.getAttribute('data-id'); // ID del board donde cayó la tarjeta
            console.log('Tarjeta ' + cardId + ' fue movida al board ' + targetBoardId);

            // OBTENER TAREAS ODT Y TAREAS

            /* const tareasOdt = await obtenerTareasOdt();
            const tareas = await obtenerTareas();

            console.log("tareasOdt: ", tareasOdt);
            console.log("tareas: ", tareas);

            // BUSCAR LA TAREA SELECCIONADA EN AMBOS ARRAYS
            const tareaSeleccionada = tareas.find(t => t.idtarea == cardId);
            const tareaOdtSeleccionada = tareasOdt.find(t => t.idorden_trabajo == cardId); //ejemplo: card id: 1 == idtarea: 1
            const activoObtenidoPorTarea = await obtenerActivosPorTarea(tareaSeleccionada?.idtarea)

            // AGREGAR VALIDACIÓN PARA VERIFICAR SI LA TAREA EXISTE
            if (!tareaSeleccionada && !tareaOdtSeleccionada) {
                console.error("Tarea no encontrada.");
                return; // SALIR SI NINGUNA TAREA COINCIDE
            } */

            // VALIDAR ESTADOS
            switch (targetBoardId) {
                case "b-proceso":
                /* if (idrolusuario == 1) { //esto es administrador
                    let permitir = true
                    // VALIDAR SI tareaOdtSeleccionada EXISTE Y SU ESTADO
                    if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "proceso") {
                        alert("Esta tarea ya está en proceso, no se puede redirigir");
                        break;
                    } else if (tareaSeleccionada && tareaSeleccionada.nom_estado === "pendiente") {
                        const now = new Date();
                        const fechaInicioTarea = now.toISOString().split("T")[0]; // Fecha en formato YYYY-MM-DD
                        const horaInicioTarea = now.toTimeString().split(" ")[0].substring(0, 5); // Hora en formato HH:MM
                        //let fechaHoraInicio = new Date(`${fechaInicioTarea}T${horaInicioTarea}:00-05:00`);
                        console.log("tareaSeleccionada: ", tareaSeleccionada)
                        // SI LA TAREA ESTÁ EN PENDIENTE, REDIRIGIR
                        console.log("activoObtenidoPorTarea: ", activoObtenidoPorTarea)
                        for (let a = 0; a < activoObtenidoPorTarea.length; a++) {
                            if (activoObtenidoPorTarea[a].idestado == 2) {
                                showToast(`Hay activos asignados a esta tarea que están en mantenimiento ahora mismo.`, 'ERROR', 6000);
                                permitir = false;
                                return
                            }
                        }
                        if (tareaSeleccionada.pausado == 1) {
                            showToast(`Esta tarea esta pausada, no puedes procesarla por el momento.`, 'ERROR', 6000);
                            permitir = false;
                            return
                        }

                        if (permitir) {
                            const activosPorTarea = await obtenerActivosPorTarea(cardId);
                            console.log("Iniciando orden...");
                            const tareasMostrarTabla = await obtenerTareasPorId(cardId) //ESTO ES PARA MOSTRAR LA TAREA EN LA TABLA DE VISTA PREVIA
                            console.log("tareasMostrarTabla_>", tareasMostrarTabla)
                            //const btnCancelarCreacionOdt = $q("") //botones para crear y cancelar la orden
                            tbodyTareas.innerHTML = ''
                            for (let i = 0; i < tareasMostrarTabla.length; i++) {
                                tbodyTareas.innerHTML += `
                                    <tr>
                                        <th>${tareasMostrarTabla[i].descripcion}</th>
                                        <td>${tareasMostrarTabla[i].prioridad}</td>
                                        <td>${tareasMostrarTabla[i].frecuencia}</td>                                            
                                        <td>${tareasMostrarTabla[i].nombres} ${tareasMostrarTabla[i].apellidos}</td>                                            
                                        <td>${tareasMostrarTabla[i].activo}</td>
                                        <td>${tareasMostrarTabla[i].nom_estado}</td>
                                    </tr>
                                `;
                            }
                            $(".btnCancelarCreacionOdt").click(function (e) {
                                e.preventDefault();
                                tbodyTareas.innerHTML = ''
                            });
                            $(".btnCrearOdt").click(async function (e) {
                                e.preventDefault();
                                const idOdt = await registrarOdt(cardId, fechaInicioTarea, horaInicioTarea);
                                console.log(idOdt);
                                for (let i = 0; i < tareasMostrarTabla.length; i++) {
                                    const responsableRegistrado = await registrarResponsablesAsignados(tareasMostrarTabla[i].idusuario, idOdt.id)
                                    console.log("responsableRegistrado : ", responsableRegistrado)
                                }
                                //window.localStorage.clear()
                                //window.localStorage.setItem("idtarea", cardId);
                                //window.localStorage.setItem("idodt", idOdt.id);
                                const actualizado = await actualizarTareaEstado(cardId, 9)
                                console.log("actualizado?: ", actualizado)
                                if (actualizado.actualizado) {
                                    showToast("Orden de trabajo creado exitosamente.", 'SUCCESS', 3000)
                                    tbodyTareas.innerHTML = ''
                                    for (let o = 0; o < activosPorTarea.length; o++) {
                                        const activo = activosPorTarea[o];

                                        // Cambiar el estado del activo a "en mantenimiento" solo si no está ya en estado "2" en esta tarea
                                        if (activo.idestado !== 2) {
                                            await actualizarEstadoActivo(activo.idactivo, 2); // Cambiar estado a "en mantenimiento"
                                            console.log(`Estado actualizado del activo ${activo.idactivo} a 'en mantenimiento'`);
                                        }
                                    }
                                }
                            });


                            //console.log("redirigiendo ....")
                            //window.location.href = `http://localhost/CMMS/views/odt/registrar-odt.php`;
                        }


                    } else if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "revision") {
                        alert("Esta orden ya esta en revision, no se puede redirigir a proceso");
                        break;
                    } else if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "finalizado") {
                        alert("Esta orden ya esta finalizada, no se puede redirigir a proceso");
                        break;
                    }

                    break;
                } else {
                    showToast(`Solo administradores pueden crear ordenes de trabajo.`, 'ERROR', 6000);
                    break;
                } */

                case "b-revision":
                /* if (idrolusuario == 2) { //esto seria usuario normal
                    if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "proceso") {
                        if (tareaOdtSeleccionada.incompleto === 1) {
                            alert("LA TAREA ODT ESTA INCOMPLETA NO PUEDES REVISARLA");
                            break;
                        }
                        else if (tareaOdtSeleccionada.clasificacion == null || tareaOdtSeleccionada.clasificacion == 9) {
                            alert("ESTA ODT NO PUEDE SER REVISADA POR QUE NO ESTA AL 100%")
                            break;
                        } else {
                            //window.localStorage.clear()
                            //window.localStorage.setItem("idodt", tareaOdtSeleccionada.idorden_trabajo);
                            const actualizado = await actualizarEstadoOdt(10, tareaOdtSeleccionada.idorden_trabajo)
                            console.log("actualizado ODT A REVISION?: ", actualizado)
                            //window.location.href = `http://localhost/CMMS/views/odt/revisar-odt.php`
                            showToast(`La orden de trabajo ha sido completada y enviada para revisión por un administrador.`, 'SUCCESS', 3000);
                            break;
                        }
                    } else if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "pendientes") {
                        alert("Esta orden esta en pendientes, primero procesala");
                        break;
                    }
                    else if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "revision") {
                        alert("Esta orden ya esta en reivison, no puedes redirigir");
                        break;
                    }
                    else if (tareaOdtSeleccionada && tareaOdtSeleccionada.nom_estado === "finalizado") {
                        alert("Esta orden ya esta finalizada, no puedes redirigir");
                        break;
                    }
                } else {
                    showToast(`Solo usuarios pueden mandar a revisar la orden de trabajo.`, 'ERROR', 6000);
                    break;
                } */


            }
        },
        click: async function (el) {
            var cardId = el.getAttribute('data-eid'); // ID de la tarjeta
            console.log('Tarjeta ' + cardId + ' fue clikeada');
            const tarea = await obtenerTareaPorId(cardId)
            if (tarea[0].idestado == 11) {
                window.localStorage.setItem("idtarea", cardId)
                window.location.href = `http://localhost/SIGEMAPRE/views/tareas/ejecutar-tarea`
            }else{
                showToast("Solo tareas en proceso pueden ser ejecutadas", 'ERROR', 2000)
                return
            }

        }

    });
    await renderTareasPendiente()

    async function renderHtmlTarea(tareas) {
        // Limitar el número de activos a mostrar
        const activosArray = tareas.descripcion_activos ? tareas.descripcion_activos.split(', ') : [];
        const activosDisplay = activosArray.length > 2
            ? `${activosArray.slice(0, 2).join(', ')} y ${activosArray.length - 2} más`
            : activosArray.join(', ');

        // Limitar el número de responsables a mostrar
        const responsablesArray = tareas.nombres_responsables ? tareas.nombres_responsables.split(', ') : [];
        const responsablesDisplay = responsablesArray.length > 2
            ? `${responsablesArray.slice(0, 2).join(', ')} y ${responsablesArray.length - 2} más`
            : responsablesArray.join(', ');

        // Generar el HTML con los datos limitados
        const tareaHTML = `
        <h3 class="card-title"></h3>                   
        <div class="row">
            <div class="col-md-6">
                <p><small><strong>F. Inicio: </strong></small>${tareas.fecha_programada}</p>
            </div>
            <div class="col-md-6">
                <p><small><strong>H. Programada: </strong></small>${tareas.hora_programada}</p>
            </div>
        </div>                
        <p class="card-text"><strong>Responsables: </strong>${responsablesDisplay}</p>
        <p class="card-text"><strong>Activos: </strong>${activosDisplay}</p>                                             
    `;
        return tareaHTML;
    }

    async function renderTareasPendiente() {
        const tareasPen = await obtenerTareasPorEstado(10); // Tareas en estado 'pendientes'
        console.log("Tareas pendientes: ", tareasPen);

        // Agregar tareas pendientes al kanban
        tareasPen.forEach(async tarea => {
            const tareaHTML = await renderHtmlTarea(tarea);
            if (tarea.idestado === 10) { // Asegúrate de que estás verificando correctamente el estado
                kanban.addElement('b-pendientes', {
                    id: tarea.idtarea, // Usamos el idtarea como id de la tarjeta
                    title: tareaHTML   // Usamos el HTML que hemos creado
                });
            }
        });

        const tareasProc = await obtenerTareasPorEstado(11); // Tareas en estado 'proceso'
        console.log("Tareas en proceso: ", tareasProc);

        tareasProc.forEach(async tarea => {
            const tareaHTML = await renderHtmlTarea(tarea);
            if (tarea.idestado === 11) { // Estado 'proceso'
                kanban.addElement('b-proceso', {
                    id: tarea.idtarea,
                    title: tareaHTML
                });
            }
        });

        const tareasRev = await obtenerTareasPorEstado(12); // Tareas en estado 'revision'
        console.log("Tareas en revisión: ", tareasRev);

        tareasRev.forEach(async tarea => {
            const tareaHTML = await renderHtmlTarea(tarea);
            if (tarea.idestado === 12) { // Estado 'revision'
                kanban.addElement('b-revision', { // Cambié a la columna de revisión
                    id: tarea.idtarea,
                    title: tareaHTML
                });
            }
        });

        const tareasFin = await obtenerTareasPorEstado(13); // Tareas en estado 'finalizado'
        console.log("Tareas finalizadas: ", tareasFin);

        tareasFin.forEach(async tarea => {
            const tareaHTML = await renderHtmlTarea(tarea);
            if (tarea.idestado === 13) { // Estado 'finalizado'
                kanban.addElement('b-finalizado', { // Cambié a la columna de finalizado
                    id: tarea.idtarea,
                    title: tareaHTML
                });
            }
        });
    }
});