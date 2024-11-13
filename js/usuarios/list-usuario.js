document.addEventListener("DOMContentLoaded", () => {
  let myTable = null;
  const globals = {
    iduserBaja:""
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
    data.forEach(x=>{
      const element = document.createElement("option");
      element.textContent = x.area;
      element.value = x.idarea;
      selector("area").appendChild(element);
    });
  })();

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
    params.append("operation","darBajaUser");
    params.append("estado","0");
    params.append("idusuario",parseInt(iduser));

    const data = await fetch(`${host}usuario.controller.php`, {
      method:'POST',
      body:params
    });

    const {respuesta} = await data.json();
    if(respuesta>0){
      console.log("actualizado");
      
      await showUsuarios();
    }
  }

});
