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
    optionSB.forEach((x,i)=>{
      if(i<=3){
        selector("sb-area").appendChild(x);
      }
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
            ${parseInt(x.estado)===0?
              `<button type="button" class="btn btn-sm btn-success activate-user" data-iduser=${x.idusuario}>Reactivar</button>`
              :
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
    document.querySelector(".table-responsive").addEventListener("click",async(e)=>{
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
        if(e.target.classList.contains("activate-user")){
          globals.iduserBaja = e;
          await reactivarUser();
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
    await updateEstadoUser(0,"Se le ha dado de baja correctamente");
  });

  async function updateEstadoUser(estado, msg){
    const iduser = globals.iduserBaja.target.getAttribute("data-iduser");
  
    const params = new FormData();
    params.append("operation","updateEstadoUser");
    params.append("idusuario",parseInt(iduser));
    params.append("estado",estado);

    const data = await fetch(`${host}usuario.controller.php`, {
      method:'POST',
      body:params
    });

    const {update} = await data.json();
    if(update){
      alert(msg);
      
      await showUsuarios();
    }
  }

  async function changeArea(e){
    console.log("iduser", globals.idusuario);
    console.log("idarea", globals.idarea);
    
    const nomArea = await getAreaId(globals.idarea);

    selector("sb-show-current-area").innerHTML=`<strong>(Area actual: ${nomArea[0].area})</strong>`;

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
    const nuevaArea = selector("sb-area").value; //almacena la nueva area
    let tipoNotf="Asignacion";
    let msgNotf="Han asignado a un nuevo usuario al area";
    let msgAlert = "";

    const existeRespArea = await existeResponsableArea(nuevaArea);
    const dataUser = await getDataUser(globals.idusuario);
    console.log(dataUser[0].perfil);
    
    let isSupervisor = false;
    if(dataUser[0].perfil==="Supervisor"){
      if(existeRespArea[0].existe===0){
        //msgNotf="han asignado a un nuevo supervisor a una area";
        isSupervisor=true;
      }else{
        alert("Ya existe un supervisor en el area seleccionada");
        return;
      }
    }

    if(!isSupervisor ||isSupervisor){
      if(confirm("¿Estas seguro de actualizar el area del usuario?")){

        //Paso 1: VERIFICAR EL HISTORIAL DE USUARIOS
        const validaHistorial = await validateHistorialUsres(globals.idusuario); //verifica si existe historial del usuario
        if(validaHistorial || !validaHistorial){

          //PASO 2: AGREGAR EL REGISTRO DE DESIGNACION DE AREA AL HISTORIAL
          const historialAdd = await addHistorialAsg(globals.idarea, "Cambio de Area"); 
          if(historialAdd.idhis_user>0){
            //PASO 3: ACTUALIZAR A SU NUEVA AREA
            const resp = await updateArea(globals.idusuario, nuevaArea);  
            if(resp.update){
              //PASO 4: REGISTRAR AL HISTORIAL AL NUEVO SUPERVISOR DEL AREA SELECCIONADA
              const historialAdd = await addHistorialAsg(nuevaArea, selector("comentario").value);
              if(historialAdd.idhis_user>0){
                const addNotf = await addNotificacion(globals.idusuario,nuevaArea, tipoNotf, msgNotf);
                if(addNotf.idnotf>0){
                  selector("sb-area").value="";
                  selector("comentario").value="";
                  await showUsuarios();
                  const myModal = bootstrap.Modal.getOrCreateInstance(selector("sb-change-area"));
                  myModal.hide();
                  alert("Se ha actualizado el area");
                }else{msgAlert="Hubo un error al crear la notificacion";};
              }else{msgAlert="Hubo un error al registrar en el historial con su nueva area";}
            }else{msgAlert = "Hubo un error al actualizar los datos";}
          }else{msgAlert="Hubo un error al registrar en el historial";}

          if(msgAlert){
            alert(msgAlert);
          }
        }
      }
    }
  });

  //Valida si ya existe un supervisor en el area elegida
  async function existeResponsableArea(id){
    const params = new URLSearchParams();
    params.append("operation","existeResponsableArea");
    params.append("idarea",parseInt(id));

    const data = await getDatos(`${host}usuario.controller.php`,params);
    return data;
  }

  //Actualiza el area del usuario ubicado (t. users)
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

  //Obtiene datos del usuario
  async function getDataUser(iduser){
    const params = new URLSearchParams();
    params.append("operation", "getUserById");
    params.append("idusuario", iduser);

    const data = await getDatos(`${host}usuario.controller.php`, params);
    return data;
  }

  //Agrega el cambio de area al historial (getDataUser)
  async function addHistorialAsg(idarea, comentario){
    const dataUser = await getDataUser(globals.idusuario);
    console.log(dataUser);
    
    const params = new FormData();
    params.append("operation","addHisUser");
    params.append("idusuario",globals.idusuario);
    params.append("idarea",parseInt(idarea));
    params.append("comentario",comentario);
    params.append("es_responsable",dataUser[0].responsable_area);

    const resp = await fetch(`${host}historialUsuario.controller.php`,{
      method:'POST',
      body:params
    });

    const data = await resp.json();
    return data;
  }

  //Valida y actualiza si hubo mas cambios de areas del usuario (verificarHisUsuario, updateFechaFinusers)
  async function validateHistorialUsres(iduser){
    let isValidate=false;
    const dataHistorial = await verificarHisUsuario(iduser);
    console.log(dataHistorial);
    
    if(dataHistorial.length>0){
      const updateFin = await updateFechaFinUsers(iduser);
      if(updateFin.update){
        isValidate = true;
      }else{
        alert("Hubo un error al actualizar fecha");
        return;
      }
    }
    return isValidate;
  }
  //Verifica si hubo mas cambios del usuario
  async function verificarHisUsuario(iduser){
    const params = new URLSearchParams();
    params.append("operation","verificarHisUser");
    params.append("idusuario",iduser);

    const data = await getDatos(`${host}historialUsuario.controller.php`, params);
    return data;
  }

  //Si hubo mas cambios del usuario.. Actualiza la fecha de fin en el historial
  async function updateFechaFinUsers(iduser){
    const params = new FormData();
    params.append("operation", "updateFechaFinByUser");
    params.append("idusuario", iduser);

    const data = await fetch(`${host}historialUsuario.controller.php`,{
      method:'POST',
      body:params
    });

    const resp = await data.json();
    return resp;
  }

  async function actualizarResponsabilidad(iduser, es_responsable){
    const params = new FormData();
    params.append("operation","designarReponsableArea");
    params.append("idusuario",iduser);
    params.append("responsable_area",es_responsable);

    const resp = await fetch(`${fetch}usuario.controller.php`,{
      method:'POST',
      body:params
    });

    const data = await resp.json();
    return data;
  }

  //Reactiva el estado del usuario
  async function reactivarUser(){
    if(await ask("¿Estas seguro de reactivar al usuario")){
      //console.log("aaaa");
      
      updateEstadoUser(1,"Se ha reactivado al usuario correctamete");
    }
  }

  //Evalua si al area a asignar tiene supervisor o no, si es no, la notificacion lo recibe el admin
  //Cuando es si lo recibe el supervisor
  async function addNotificacion(iduser,idarea, tipo, msg){
    // const existeSupervisor = await getIdSupervisor(idarea);
    // let iduser_sup = 0;
    // if(existeSupervisor.length===0){
    //   const {idusuario} = await getAdmin();
    //   iduser_sup = idusuario;
    // }else{
    //   iduser_sup=existeSupervisor[0].idusuario;
    // }

    const params = new FormData();
    params.append("operation", "addNotfUsers");
    params.append("idusuario", iduser);
    params.append("idarea", idarea);
    params.append("tipo", tipo);
    params.append("mensaje", msg);

    const resp = await fetch(`${host}notificacionUser.controller.php`,{
      method:'POST',
      body:params
    });

    const data = await resp.json();
    return data;
  }

  //Obtiene el id del admin
  async function getAdmin(){
    const params = new URLSearchParams();
    params.append("operation", "getIdAdmin");

    const data = await getDatos(`${host}usuario.controller.php`, params);
    return data[0];
  }

  //Obtiene el id del supervisor del area a asignar
  async function getIdSupervisor(idarea) {
    const params = new URLSearchParams();
    params.append("operation","getIdSupervisorArea");
    params.append("idarea",parseInt(idarea));

    const data = await getDatos(`${host}usuario.controller.php`,params);
    return data;
  }
});
