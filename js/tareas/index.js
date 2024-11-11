$(document).ready(function () {
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


});