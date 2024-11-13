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

    //UI
    const selectArea = $q("#area");
    const selectCategoria = $q("#categoria");
    const selectSubcategoria = $q("#subcategoria");
    const filtro = $q(".filtro") //podra tener poder de manipular el change de cada select
    const tbodyActivos = $q("#activoBodyTable")
    const btnAsignarResponsables = $q("#btnAsignarResponsables")

    //LISTAS
    let activosElegidos = []

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

    // ************************************** REGISTROS *******************************************
    async function filtrarUsuariosArea() {
        //fetch
        const params = new URLSearchParams()
        params.append("operation", "filtrarUsuariosArea")
        params.append("idarea", selectArea.value)
        const data = await getDatos(`${host}usuario.controller.php`, params)
        return data
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

    // obtiene las SUBCATEGORIAS
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
                    <button class="btn btn-primary">Ver Mantenimientos</button>
                </td>
            </tr>
            `;
        });

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
                    const found = activosElegidos.find(activo => activo.idactivo_asig === idactasignado);
                    if (!found) {
                        activosElegidos.push({
                            idactivo_asig: idactasignado,
                            idactivo: idactivo
                        });
                    }
                } else {
                    // Elimina de `activosElegidos` si se desmarca
                    activosElegidos = activosElegidos.filter(activo => activo.idactivo !== idactasignado);
                }

                console.log("activosElegidos después del cambio:", activosElegidos);

                // Verifica si al menos uno está marcado y habilita/deshabilita el botón
                btnAsignarResponsables.disabled = activosElegidos.length === 0;
            });
        });

        btnAsignarResponsables.disabled = activosElegidos.length === 0;

    });

    btnAsignarResponsables.addEventListener("click", async () => {
        await renderModalResponsables()
    })
    // ******************************** RENDER TABLES ************************************************
    function renderTablaActivos() {
        if (tbActivos) {
            tbActivos.clear().rows.add($(tbodyActivos).find('tr')).draw();
        } else {
            // Inicializa DataTable si no ha sido inicializado antes
            tbActivos = $('#tablaActivos').DataTable({
                paging: true,
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
        const responsables = await filtrarUsuariosArea()
        console.log("responsables necontrado por area: ", responsables)
    }

})




