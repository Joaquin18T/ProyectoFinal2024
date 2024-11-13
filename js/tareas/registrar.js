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
        /* const categorias = await obtenerCategorias()
        const subcategorias = await obtenerSubCategorias() */
    })

    selectCategoria.addEventListener("change", async () => {
        tbodyActivos.innerHTML = ''
        const subcategorias = await obtenerSubCategoriasPorCategoria(selectCategoria.value)
        selectSubcategoria.innerHTML = `<option selected value="-1"></option>`
        subcategorias.forEach(subcategoria => {
            selectSubcategoria.innerHTML += `
                <option value="${subcategoria.idsubcategoria}">${subcategoria.subcategoria}</option>
            `
        });
    })

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
                    <input type="checkbox" class="activo-checkbox" data-idactas="${actas.idactivoasignado}" data-idactivo="${actas.idactivo}">
                </th>
                <td>${actas.cod_identificacion}</td>
                <td>${actas.descripcion}</td>
                <td>${actas.marca}</td>
                <td>${actas.modelo}</td>
                <td>
                    <button>Ver Mantenimientos</button>
                </td>
            </tr>
            `;
        });
    })

    // ******************************** RENDER TABLES ************************************************
    function renderTablaActivos() {
        if (tbActivos) {
            tbActivos.clear().rows.add($(tbodyActivos).find('tr')).draw();
        } else {
            // Inicializa DataTable si no ha sido inicializado antes
            tbActivos = $('#tbodyActivos').DataTable({
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
});