document.addEventListener("DOMContentLoaded",()=>{
  const host = "http://localhost/SIGEMAPRE/controllers/";
  let myTable = null;
  /**
   * Obtiene datos desde la DB
   * @param {*} link el nombre del controlador
   * @param {*} params parametros que necesites pasar para obtener los datos
   * @returns un array de objetos con datos de la DB
   */
  async function getDatos(link, params) {
    let data = await fetch(`${host}${link}.controller.php?${params}`);
    return data.json();
  }

  function selector(value) {
    return document.querySelector(`#${value}`);
  }

  //Crea las opciones de un select
  function createOption(value, text) {
    const element = document.createElement("option");
    element.value = value;
    element.innerText = text;
    return element;
  }

  //Categoria
  (async()=>{
    const data = await getDatos("categoria","operation=getAll");
    
    data.forEach(x=>{
      const element = createOption(x.idcategoria, x.categoria);
      selector("categoria").appendChild(element);
    });
  })();  
  //Evento de categoria
  selector("categoria").addEventListener("change",async()=>{
    await getSubCategoria(selector("categoria").value);
  });

  //Muestra las subcategorias segun la categoria seleccionada
  async function getSubCategoria(id){
    const params = new URLSearchParams();
    params.append("operation", "obtenerSubcategoriasByCategoria");
    params.append("idcategoria", parseInt(id));

    const elementsSelect = cleanOptions("subcategoria");

    const data = await getDatos("categoria", params);
    data.forEach(x=>{
      const element = createOption(x.idsubcategoria, x.subcategoria);
      elementsSelect.appendChild(element);
    });
  }

  //Limpia las opciones de un select
  function cleanOptions(identificador){
    const elementsSelect = selector(identificador);
    for (let i = elementsSelect.childElementCount - 1; i > 0; i--) {
      elementsSelect.remove(i);
    }
    return elementsSelect
  }
  //Evento de subcategoria
  selector("subcategoria").addEventListener("change",async()=>{
    await getMarcas(selector("subcategoria").value);

  });
  //Muestra las marcas segun la subcategoria elegida
  async function getMarcas(id){
    const params = new URLSearchParams();
    params.append("operation", "getMarcasBySubcategoria");
    params.append("idsubcategoria", parseInt(id));

    const elementsSelect = cleanOptions("marca");

    const data = await getDatos("subcategoria", params);
   
    data.forEach(x=>{
      const element = createOption(x.idmarca, x.marca);
      elementsSelect.appendChild(element);
    });
  }

  //Estados
  (async()=>{
    const params = new URLSearchParams();
    params.append("operation", "estadoByRange");
    params.append("idestado", "");
    params.append("min", 1);
    params.append("max", 8);

    const data = await getDatos("estado", params);
    data.forEach(x=>{
      const option = createOption(x.idestado, x.nom_estado);
      selector("estado").appendChild(option);
    });
  })();

  //Areas
  (async()=>{
    const data = await getDatos(`area`,"operation=getAll");

    data.forEach((x,i)=>{
      if(i<=3){
        const option = createOption(x.idarea, x.area);
        selector("area").appendChild(option);
      }
    });
  })();

  (async()=>{
    await showDatos();
  })();

  //Funcion para mostrar y filtrar los datos
  async function showDatos(){
    const params = new URLSearchParams();
    params.append("operation", "filtradoActivos");
    params.append("idestado", isNaN(parseInt(selector("estado").value))?"":parseInt(selector("estado").value));
    params.append("idcategoria", isNaN(parseInt(selector("categoria").value))?"":parseInt(selector("categoria").value));
    params.append("idsubcategoria", isNaN(parseInt(selector("subcategoria").value))?"":parseInt(selector("subcategoria").value));
    params.append("idmarca", isNaN(parseInt(selector("marca").value))?"":parseInt(selector("marca").value));
    params.append("modelo", selector("modelo").value);
    params.append("cod_identificacion", selector("cod_identificacion").value);
    params.append("idarea", isNaN(parseInt(selector("area").value))?"":parseInt(selector("area").value));
    params.append("fecha_adquisicion", selector("fecha_adquisicion").value);
    params.append("fecha_adquisicion_fin", selector("fecha_adquisicion_fin").value);

    const data = await getDatos(`activo`, params);
    console.log(data);

    selector("table-activos tbody").innerHTML="";

    if(data.length===0){
      selector("table-activos tbody").innerHTML= `
      <tr>
        <td colspan="6">No encontrado</td>
      </tr>
      `;
    }

    data.forEach((x,i)=>{
      let especificaciones = JSON.parse(x.especificaciones);
      selector("table-activos tbody").innerHTML+=`
        <tr>
          <td>${i+1}</td>
          <td>${x.categoria}</td>
          <td>${x.subcategoria}</td>
          <td>${x.marca}</td>
          <td>${x.modelo}</td>
          <td>${x.cod_identificacion}</td>
          <td>${x.fecha_adquisicion}</td>
          <td>${x.nom_estado}</td>
          <td><div class="field-espec ms-auto"></div></td>
          <td>${x.area}</td>
          <td><button type="button" class="btn btn-sm btn-success">me</button></td>
        </tr>
      `;
      showEspecificaciones(especificaciones);
      especificaciones = "";
    });
    createTable(data);
    chargerEventsButton();
  }

  //Crea una lista con las especificaciones (JSON)
  function showEspecificaciones(data = {}) {
    let contain = document.createElement("ul");

    Object.entries(data).forEach(([key, value]) => {
      const element = document.createElement("li");
      element.style.fontSize="14px";
      element.innerHTML = `<strong >${key}</strong>: ${value}`;
      contain.appendChild(element);
    });

    const fields = document.querySelectorAll(".field-espec");
    fields.forEach((x) => {
      x.appendChild(contain);
    });
  }

  //Carga los botones que estan en la tabla
  function chargerEventsButton() {
    document
      .querySelector(".table-responsive")
      .addEventListener("click", async (e) => {
        if (e.target) {
          // if (e.target.classList.contains("modal-update")) {
          //   buttonsUpdate(e);
          // } else if (e.target.classList.contains("btn-baja")) {
          //   await showDetalleBaja(e);
          // }
        }
      });
  }

  //DataTable
  function createTable(data) {
    let rows = $("#tb-body-activo").find("tr");
    //console.log(rows.length);
    if (data.length > 0) {
      if (myTable) {
        if (rows.length > 0) {
          myTable.clear().rows.add(rows).draw();
        } else if (rows.length === 1) {
          myTable.clear().draw(); // Limpia la tabla si no hay filas.
        }
      } else {
        // Inicializa DataTable si no ha sido inicializado antes
        myTable = $("#table-activos").DataTable({
          paging: true,
          searching: false,
          lengthMenu: [5, 10, 15, 20],
          pageLength: 5,
          language: {
            lengthMenu: "Mostrar _MENU_ filas por página",
            paginate: {
              previous: "Anterior",
              next: "Siguiente",
            },
            search: "Buscar:",
            info: "Mostrando _START_ a _END_ de _TOTAL_ registros",
            emptyTable: "No se encontraron registros",
          },
        });
        // if (rows.length > 0) {
        //   myTable.rows.add(rows).draw(); // Si hay filas, agrégalas.
        // }
      }
    }
  }

  changeByFilters();
  function changeByFilters() {
    const filters = document.querySelectorAll(".filter");
    selector("table-activos tbody").innerHTML = "";
    filters.forEach((x) => {
      x.addEventListener("change", async () => {
        await showDatos();
      });
      if (x.id === "cod_identificacion" ||x.id==="modelo") {
        x.addEventListener("keyup", async () => {
          await showDatos();
        });
      }
    });
  }
});