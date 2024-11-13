document.addEventListener("DOMContentLoaded",()=>{
  const host = "http://localhost/SIGEMAPRE/controllers/";

  //console.log(localStorage.getItem("iduser"));

  function selector(value) {
    return document.querySelector(`#${value}`);
  }

  /**
   * Obtiene datos desde la DB
   * @param {*} link el nombre del controlador
   * @param {*} params parametros que necesites pasar para obtener los datos
   * @returns un array de objetos con datos de la DB
   */
  async function getDatos(link, params) {
    let data = await fetch(`${host}${link}?${params}`);
    return data.json();
  }

  //Perfiles
  (async () => {
    const data = await getDatos(
      `vista.controller.php`,
      "operation=getPerfiles"
    );
    //console.log(data);
    
    data.forEach((x) => {
      const element = document.createElement("option");
      element.textContent = x.perfil;
      element.value = x.idperfil;
      selector("perfil").appendChild(element);
    });
  })();
  
  //Obtener los datos del usuario
  async function getDataUser(){
    const params = new URLSearchParams();
    params.append("operation", "getUserById");
    params.append("idusuario", parseInt(localStorage.getItem("iduser")));

    const data = await getDatos("usuario.controller.php", params);
    console.log(data);
    
    return data;
  }

  //Funcion anonima que ejecuta dos funciones para que muestre datos del usuario en la vista
  (async()=>{
    const data = await getDataUser();
    //console.log(data);
    
    showDatos(data[0]);
  })();

  //Mostrar los datos del usuario en la vista
  function showDatos(data){
    selector("numDoc").value=data.num_doc;
    selector("tipodoc").value=data.tipodoc;
    selector("apellidos").value=data.apellidos;
    selector("nombres").value=data.dato;
    selector("telefono").value=data.telefono;
    selector("genero").value=data.genero;
    //selector("password").value = data.claveacceso;
    selector("perfil").value=data.idperfil;
    selector("usuario").value=data.nom_usuario;
    selector("area").value=data.area;
    //selector("responsable").value = data.responsable_area;
  }

  //Verificar que el numero de telefono sea unico
  async function searchTelf(telf){
    const params = new URLSearchParams();
    params.append("operation", "searchTelefono");
    params.append("telefono", telf);
    const data = await getDatos(`persona.controller.php`, params);
    return data;
  }

  //Valida que no tenga espacios en blanco
  function validateData(){
    const data =[
      selector("apellidos").value,
      selector("nombres").value,
      selector("telefono").value,
      selector("genero").value,
      selector("perfil").value        
    ];

    const dataNumber = [];

    let isValidate = data.every(x=>x.trim().length>0);
    let isValidateN = dataNumber.every(x=>x>=1);

    return (isValidate);
  }

  selector("form-update-user").addEventListener("submit",async(e)=>{
    e.preventDefault();

    const unikeTelf = await searchTelf(selector("telefono").value);
    const validarAllData = validateData();

    if(unikeTelf.length===0 && validarAllData){
      if(confirm("¿Estas seguro de actualizar los datos?")){
        //console.log(parseInt(selector("perfil").value));
        
        const params = new FormData();
        params.append("operation", "updateUser");
        params.append("idusuario", parseInt(localStorage.getItem("iduser")));
        params.append("idperfil", parseInt(selector("perfil").value));

        const resp = await fetch(`${host}usuario.controller.php`,{
          method:'POST',
          body:params
        });

        const data = await resp.json();
        console.log(data);
        
        if(data.idpersona>0){
          const msg = await updateDataPersona(data.idpersona);
          if(msg.update){
            alert("datos actualizados correctamente");
            resetUI();
          }
        }
      }
    }else{
      let mensaje="";
      if(unikeTelf.length>0){mensaje="El numero telefonico ya existe";}
      if(!validarAllData){mensaje="Completa los campos";}
      alert(mensaje);
    }
  });

  async function updateDataPersona(idpersona){
    const params = new FormData();
    params.append("operation", "updatePersona");
    params.append("idpersona", idpersona);
    params.append("apellidos", selector("apellidos").value);
    params.append("nombres", selector("nombres").value);
    params.append("genero", selector("genero").value);
    params.append("telefono", selector("telefono").value);

    const resp = await fetch(`${host}persona.controller.php`,{
      method:'POST',
      body:params
    });

    const data = await resp.json();
    return data;
  }

  //resetea los campos
  function resetUI(){
    selector("numDoc").value="";
    selector("apellidos").value="";
    selector("nombres").value="";
    selector("telefono").value="";
    selector("genero").value="";
    selector("usuario").value="";
    selector("perfil").value="";
    selector("area").value="";
  }
});