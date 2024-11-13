document.addEventListener("DOMContentLoaded", () => {
  //Nota: Se puede actualizar el estado del usuario cuando esta de baja?
  let myTable = null;
  const globals = {
    idusuario:0,
    idarea:0,
    iduserBaja:"",
  }
  const host = "http://localhost/SIGEMAPRE/controllers/";

  function selector(value) {
    return document.querySelector(`#${value}`);
  }

  async function getDatos(link, params) {
    let data = await fetch(`${link}?${params}`);
    return data.json();
  }

  //Areas
  (async()=>{
    const data = await getDatos(`${host}area.controller.php`,"operation=getAll");
    const options = addOptions(data);

    options.forEach(x=>{
      selector("area").appendChild(x);
    });

    const optionSB = addOptions(data);
    optionSB.forEach(x=>{
      selector("sb-area").appendChild(x);
    });
    
  })();

  function addOptions(data=[]){
    let lisOptions = [];
    data.forEach(x=>{
      const element = document.createElement("option");
      element.textContent = x.area;
      element.value = x.idarea;
      lisOptions.push(element);
    });
    return lisOptions;
  }

  //Perfiles
  (async () => {
    const data = await getDatos(
      `${host}vista.controller.php`,
      "operation=getPerfiles"
    );
    data.forEach((x) => {
      const element = document.createElement("option");
      element.textContent = x.perfil;
      element.value = x.idperfil;
      selector("perfil").appendChild(element);
    });
  })();

  //Tipo Doc
  (async () => {
    const data = await getDatos(
      `${host}tipodoc.controller.php`,
      "operation=getAll"
    );
    //console.log(data);
    data.forEach((x) => {
      const element = document.createElement("option");
      element.textContent = x.tipodoc;
      element.value = x.idtipodoc;
      selector("tipodoc").appendChild(element);
    });
  })();

  (async () => {
    await showUsuarios();
  })();

  chargerEventButtons();
  async function showUsuarios() {
    const params = new URLSearchParams();
    params.append("operation", "FiltrarUsers");
    params.append("dato", selector("dato").value);
    params.append("numdoc", selector("numdoc").value);
    params.append("idtipodoc", selector("tipodoc").value);
    params.append("estado", selector("estado").value);
    params.append("responsable_area", selector("responsable").value);
    params.append("idarea", selector("area").value);
    params.append("idperfil", selector("perfil").value);

    const data = await getDatos(`${host}usuario.controller.php`, params);
    console.log(data);
    
    selector("tb-usuarios tbody").innerHTML = "";
    if(data.length===0){
      selector("tbody-usuarios").innerHTML = `
      <tr>
        <td colspan="8">No encontrado</td>
      </tr>
      `;
    }
    
    data.forEach((x) => {
      selector("tb-usuarios tbody").innerHTML += `
        <tr>
          <td>${x.idusuario}</td>
          <td>${x.nom_usuario}</td>
          <td>${x.perfil}</td>
          <td>${x.dato}</td>
          <td>${x.tipodoc}</td>
          <td>${x.num_doc}</td>
          <td>${x.genero}</td>
          <td>${x.estado===1?"Activo":"Baja"}</td>
          <td>${x.area}</td>
          <td>
              ${parseInt(x.estado)===0?'Ninguna Accion':
                `<button type="button" class="btn btn-sm btn-warning update-user" data-iduser=${x.idusuario}>Update</button>
                <button type="button" class="btn btn-sm btn-danger dar-baja" data-iduser=${x.idusuario}>Dar baja</button>
                <button type="button" class="btn btn-sm btn-info change-area" data-iduser=${x.idusuario} data-idarea=${x.idarea}>
                  Areas
                </button>
                `
              }
          </td>
        </tr>
      `;
    });
    createTable(data);
  }

  function createTable(data){
    let rows = $("#tbody-usuarios").find("tr");
    //console.log(rows.length);
    if(data.length>0){
      if (myTable) {
        if (rows.length > 0) {
          myTable.clear().rows.add(rows).draw();
        } else if(rows.length===0){
          myTable.clear().draw(); // Limpia la tabla si no hay filas.
        }
      } else {
        // Inicializa DataTable si no ha sido inicializado antes
        myTable = $("#tb-usuarios").DataTable({
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
            emptyTable: "No se encontraron registros"
          },
        });
      }
    }
  }
  
  function filtersData() {
    const filters = document.querySelectorAll(".filters");

    filters.forEach((x) => {
      x.addEventListener("change", async () => {
        await showUsuarios();
      });
      if (x.id === "dato" ||x.id==="numdoc") {
        x.addEventListener("keyup", async () => {
          await showUsuarios();
        });
      }
    });
  }
  function chargerEventButtons(){
    document.querySelector(".table-responsive").addEventListener("click",(e)=>{
      if(e.target){
        if(e.target.classList.contains("update-user")){

          loadUpdate(e);
        }if(e.target.classList.contains("dar-baja")){
          globals.iduserBaja = e;
          showModalBaja();
        }
        if(e.target.classList.contains("change-area")){
          globals.idusuario = parseInt(e.target.getAttribute("data-iduser"));
          globals.idarea=parseInt(e.target.getAttribute("data-idarea"));
          changeArea(e);
        }
      }
    });
  }
  
  /**
   * Obtiene la id y abre el modal para confirmar la actualizacion
   */
  function loadUpdate(e) {
    const iduser = e.target.getAttribute("data-iduser");
    localStorage.setItem("iduser", iduser);
    console.log(localStorage.getItem("iduser"));

    const modalImg = new bootstrap.Modal(selector("modal-update-user"));
    modalImg.show();
  }

  selector("aceppt-update").addEventListener("click",()=>{
    window.location.href = "http://localhost/SIGEMAPRE/views/usuarios/update-usuario";
  });
  
  filtersData();
  async function showModalBaja(){
    const modalImg = new bootstrap.Modal(selector("modal-baja"));
    modalImg.show();
  }
  
  selector("aceptar-baja").addEventListener("click",async()=>{
    await DarBajaUsuario();
  });

  async function DarBajaUsuario(){
    const iduser = globals.iduserBaja.target.getAttribute("data-iduser");
  
    const params = new FormData();
    params.append("operation","updateEstadoUser");
    params.append("idusuario",parseInt(iduser));
    params.append("estado",0);

    const data = await fetch(`${host}usuario.controller.php`, {
      method:'POST',
      body:params
    });

    const {update} = await data.json();
    if(update){
      alert("Al usuario se le ha dado de baja correctamente");
      
      await showUsuarios();
    }
  }

  async function changeArea(e){
    console.log("iduser", globals.idusuario);
    console.log("idarea", globals.idarea);
    
    const nomArea = await getAreaId(globals.idarea);

    selector("sb-show-current-area").innerHTML=`(Area actual: ${nomArea[0].area})`;

    const modalImg = new bootstrap.Modal(selector("sb-change-area"));
    modalImg.show();
  }

  async function getAreaId(id){
    const params = new URLSearchParams();
    params.append("operation","getAreaById");
    params.append("idarea",parseInt(id));

    const data = await getDatos(`${host}area.controller.php`, params);
    return data;
  }

  selector("save-change-area").addEventListener("click",async()=>{
    if(confirm("¿Estas seguro de actualizar el area del usuario?")){
      const nuevaArea = selector("sb-area").value;
      const resp = await updateArea(globals.idusuario, nuevaArea);
      // let modal = new bootstrap.Modal(selector("sb-change-area"));
      // modal.hide();
      console.log(resp);
      
      //validar si es responsable anterior
      if(resp.update){
        await showUsuarios();
        const myModal = bootstrap.Modal.getOrCreateInstance(selector("sb-change-area"));
        myModal.hide();
        alert("Se ha actualizado el area");
      }
    }
  });

  async function updateArea(iduser, idarea){
    const params = new FormData();
    params.append("operation","cambiarAreaUser");
    params.append("idusuario",iduser);
    params.append("idarea",parseInt(idarea));

    const data = await fetch(`${host}usuario.controller.php`, {
      method:'POST',
      body:params
    });
    const resp = await data.json();
    return resp;
  }
});
