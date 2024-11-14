document.addEventListener("DOMContentLoaded",()=>{
  const host = "http://localhost/SIGEMAPRE/controllers/";
  let isReset= false;
  //let isTenico = false;
  let nomPerfil = "";
  blockCamps(true);
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

  //Areas
  (async()=>{
    const data = await getDatos(`area.controller.php`,"operation=getAll");
    data.forEach((x,i)=>{
      if(i<=3){
        const element = document.createElement("option");
        element.textContent = x.area;
        element.value = x.idarea;
        selector("area").appendChild(element);
      }
    });
  })();

  //TIPO DOC
  (async()=>{
    const data = await getDatos("tipodoc.controller.php", "operation=getAll");
    data.forEach(x => {
      const element = document.createElement("option");
      element.textContent = x.tipodoc;
      element.value = x.idtipodoc;
      selector("tipodoc").appendChild(element);
    });
  })();

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

  //obtiene los datos de la persona segun su numDoc
  async function searchPersonaByNumDoc(){
    const params = new URLSearchParams();
    params.append("operation", "searchPersonaNumDoc");
    params.append("numdoc", selector("numDoc").value);

    const data = await getDatos(`persona.controller.php`, params);
    return data;
  }

  selector("perfil").addEventListener("change",()=>{
    const selectPerfil = selector("perfil");
    const textOption = selectPerfil.options[selectPerfil.selectedIndex].text;
    if(textOption==="Supervisor"){
      selector("responsable").value=1;
    }
    if(textOption==="Tecnico" || textOption==="Administrador" ||textOption==="Usuario"){
      selector("responsable").value=0;
    }
    selector("responsable").disabled= true;
    
  });

  //Valida que el num. doc sea unico y cumpla ciertos parametros
  async function validateNumDoc(){
    //Validaciones del num doc
    const isNumeric = /^[0-9]+$/.test(selector("numDoc").value);
    const minLength = (selector("numDoc").value.length>=8);
    const validaNumDoc = selector("numDoc").value.length===8||selector("numDoc").value.length===20?true:false;
    
    if(selector("numDoc").value!=="" &&  isNumeric && minLength && validaNumDoc){
      const data = await searchPersonaByNumDoc();
      const isblock = (data.length>0);
      blockCamps(isblock);
      
      //console.log(isblock);
      console.log(data);
      
      if(isblock){
        alert("La persona ya existe");
        selector("btnEnviar").disabled=true;
        showDatos(data[0]);
      }else{
        if(!isReset){
          resetUI();
        }
        selector("btnEnviar").disabled=false;
      }      
    }
    else{
      //console.log(isNumeric);
      if(selector("numDoc").value===""){alert("Escribe un Num de Doc.");}
      else if(!isNumeric){ alert("Ingresa solo Numeros");}
      else if(!minLength){alert("El minimo es de 8 caracteres");}
      else if(!validaNumDoc){alert("La cantidad de digitos debe ser de 8 o 20");}
    }
    //return isValid;
  }

  //Buscar persona por num. doc.
  selector("search").addEventListener("click",async()=>{
    await validateNumDoc();
  });

  //Funcion que agg disabled a los campos
  function blockCamps(isblock){
    selector("tipodoc").disabled=isblock;
    selector("apellidos").disabled=isblock;
    selector("nombres").disabled=isblock;
    selector("telefono").disabled=isblock;
    selector("genero").disabled=isblock;
    selector("usuario").disabled=isblock;
    selector("password").disabled=isblock;
    selector("perfil").disabled=isblock;
    selector("area").disabled=isblock;
    selector("responsable").disabled=isblock;
  }

  //Muestra los datos en los campos
  function showDatos(data){
    selector("tipodoc").value=data.idtipodoc;
    selector("apellidos").value=data.apellidos;
    selector("nombres").value=data.nombres;
    selector("telefono").value=data.telefono;
    selector("genero").value=data.genero;
    selector("password").value = data.claveacceso;
    
    selector("usuario").value=data.nom_usuario;
    selector("perfil").value=data.idperfil;
    selector("area").value=data.idarea;
    selector("responsable").value = data.responsable_area;
  }

  //Valida que no tenga espacios en blanco
  function validateData(){
    const data =[
      selector("tipodoc").value,
      selector("numDoc").value,
      selector("apellidos").value,
      selector("nombres").value,
      selector("telefono").value,
      selector("genero").value,
      selector("usuario").value,
      selector("password").value,
      selector("perfil").value,
      selector("area").value,
      selector("responsable").value
    ];

    const dataNumber = [];

    let isValidate = data.every(x=>x.trim().length>0);
    let isValidateN = dataNumber.every(x=>x>=1);

    return (isValidate);
  }

  //Registrar Persona
  selector("form-person-user").addEventListener("submit",async(e)=>{
    e.preventDefault();
    
    isReset=true;
    await validateNumDoc(); //valida que el numero de caracteres y otras validaciones sean correctas
    const validateFields = validateData(); //Valida que los campos no esten vacios
    
    const numericTelefono = /^[0-9]+$/.test(selector("telefono").value); //valida que sean numeros
    const isUnikeTelf = await searchTelf(selector("telefono").value); //Valida que el telefono sea unico
    //console.log(isUnikeTelf);
    const validarClaveAcceso = validarClave(selector("password").value); //valida la clave de acceso
    //console.log(validarClaveAcceso);
    const validarTipoNumDoc = validateTipoDocNumDoc(); //valida la cantidad de num doc con el tipodoc
    //console.log(validarTipoNumDoc);
    //console.log(selector("tipodoc").value);
    const unikeUser = await searchNomUser(selector("usuario").value);// valida que el nom usuario sea unico
    //console.log(unikeUser);

    //Valida si existe un responsable en el area elegida
    let responsableArea = [{existe:0}];
    if(selector("responsable").value==="1"){
      responsableArea = await existeResponsableArea(selector("area").value);
    }
    //const validNumDoc = validateNumDoc();
    // const idperfil = await getPerfil(2);
    //console.log(responsableArea);

    //preguntar si al elegir como sup si o si debe ser responsable de un area
    
    if(validateFields && isUnikeTelf.length===0 && unikeUser.length===0&&
      validarClaveAcceso && validarTipoNumDoc && numericTelefono && parseInt(responsableArea[0].existe)===0){
        if(confirm("¿Estas seguro de registrar?")){
          const params = new FormData();
          params.append("operation", "addPersona");
          params.append("idtipodoc", selector("tipodoc").value);
          params.append("num_doc", selector("numDoc").value);
          params.append("apellidos", selector("apellidos").value);
          params.append("nombres", selector("nombres").value);
          params.append("genero", selector("genero").value);
          params.append("telefono", selector("telefono").value);
  
          const resp = await fetch(`${host}persona.controller.php`,{
            method:'POST',
            body:params
          });
          const data = await resp.json();
          if(data.idpersona>0){
            const usuario = await addUser(data.idpersona);
            if(usuario.idusuario>0){
              const historialAgregado = await addHistorialAsg(usuario.idusuario,selector("area").value);
              if(historialAgregado.idhis_user>0){
                alert("Se ha registrado correctamente");
                //isTenico=false;
                isReset=false;
                resetUI();
                selector("numDoc").value="";
                blockCamps(true);
                selector("numDoc").focus();
              }
            }
            
          }else{
            alert("Hubo un error al registrar los datos de la persona");
          }
        }
    }else{
      let message = "";
      if(!validateFields){message="Completa los campos";}
      if(!numericTelefono){message="Solo numeros en el Telfono";}
      if(isUnikeTelf.length>0){message="El numero de telefono ya existe";}
      if(!validarClaveAcceso){message="el minimo de caracteres para la clave es de 8";}
      if(!validarTipoNumDoc){message="El tipo de documento elegido no coincide con los caracteres de tu numero de doc.";}
      if(unikeUser.length>0){message="el nombre de usuario ya existe";}
      if(parseInt(responsableArea[0].existe)===1){message="Ya hay un responsable del area seleccionado";}
      alert(message);
    }
    selector("responsable").disabled=true;
  });

  //registrar al usuario
  async function addUser(idpersona){
    const perfilData = await getPerfil(parseInt(selector("perfil").value));
    const params = new FormData();
    params.append("operation", "addUser");
    params.append("idpersona", idpersona);
    params.append("nom_usuario", selector("usuario").value);
    params.append("claveacceso", selector("password").value);
    params.append("perfil", perfilData[0].nombrecorto);
    params.append("idperfil",parseInt(selector("perfil").value));
    params.append("idarea", parseInt(selector("area").value));
    params.append("responsable_area",parseInt(selector("responsable").value));

    const resp = await fetch(`${host}usuario.controller.php`,{
      method:'POST',
      body:params
    });
    const data = await resp.json();
    return data;
  }

  //Obtiene el perfil mediante su id
  async function getPerfil(id){
    const params = new URLSearchParams();
    params.append("operation", "getPerfilById");
    params.append("idperfil", parseInt(id));

    const data = await getDatos("vista.controller.php", params);
    return data;
  }

  //Valida que la cantidad de digitos del num doc sea validado segun el tipo doc
  function validateTipoDocNumDoc(){
    let isvalidate = false;
    if(selector("numDoc").value.length ===8 && parseInt(selector("tipodoc").value)===1){
      isvalidate=true;
    }
    if(selector("numDoc").value.length ===20 && parseInt(selector("tipodoc").value)===2){
      isvalidate=true;
    }
    return isvalidate;
  }

  //Verificar que el numero de telefono sea unico
  async function searchTelf(telf){
    const params = new URLSearchParams();
    params.append("operation", "searchTelefono");
    params.append("telefono", telf);
    const data = await getDatos(`persona.controller.php`, params);
    return data;
  }

  //Valida que la clave de acceso tengo un minimo de 8 caracteres
  function validarClave(clave){
    if(clave.length>=8){
      return true;
    }else{
      return false;
    }
  }

  async function searchNomUser(user){
    const params = new URLSearchParams();
    params.append("operation", "searchNomUsuario");
    params.append("nom_usuario", user);

    const data = await getDatos("usuario.controller.php", params);
    return data;
  }

  async function existeResponsableArea(id){
    const params = new URLSearchParams();
    params.append("operation","existeResponsableArea");
    params.append("idarea",parseInt(id));

    const data = await getDatos(`usuario.controller.php`,params);
    return data;
  }

  async function addHistorialAsg(iduser,idarea){
    const params = new FormData();
    params.append("operation","addHisUser");
    params.append("idusuario",iduser);
    params.append("idarea",parseInt(idarea));
    params.append("comentario","");
    params.append("es_responsable",parseInt(selector("responsable").value));

    const resp = await fetch(`${host}historialUsuario.controller.php`,{
      method:'POST',
      body:params
    });

    const data = await resp.json();
    return data;
  }

  //resetea los campos
  function resetUI(){
    selector("tipodoc").value="";
    selector("apellidos").value="";
    selector("nombres").value="";
    selector("telefono").value="";
    selector("genero").value="";
    selector("usuario").value="";
    selector("password").value="";
    selector("perfil").value="";
    selector("area").value="";
    selector("responsable").value="";
  }
});