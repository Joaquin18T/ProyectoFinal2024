$(document).ready(async function () {
    //alert("xdxdddd")
    //console.log("ASdasdasdasdas")
    const host = "http://localhost/SIGEMAPRE/controllers/"

    async function getDatos(link, params) {
        let data = await fetch(`${link}?${params}`);
        return data.json();
    }

    async function obtenerTareasPendientes() {
        const params = new URLSearchParams()
        params.append("operation", "obtenerTareasPorEstado")
        params.append("idestado", 10)
        const tareas = await getDatos(`${host}tarea.controller.php`, params)
        console.log("tareas pendientes desde footer: ", tareas)
        return tareas
    }

    await verificarFechaHoraTarea()

    async function verificarFechaHoraTarea() {
        const tareasPendientes = await obtenerTareasPendientes();

        // Obtener la fecha y hora actual
        const ahora = new Date();
        const fechaActual = ahora.toISOString().split('T')[0]; // Obtener solo la fecha (YYYY-MM-DD)
        const horaActual = ahora.toTimeString().split(' ')[0]; // Obtener solo la hora (HH:mm:ss)
        console.log("fechaActual: ", fechaActual)
        console.log("hora actual: ", horaActual)
        let coincide = false
        let i = 0;  // Índice para recorrer las tareas pendientes

        // Usamos un bucle while para recorrer las tareas pendientes
        while ((i < tareasPendientes.length) && !coincide) {
            const tarea = tareasPendientes[i];  // Tarea actual en el índice i
            const fechaTarea = tarea.fecha_programada; // Fecha programada de la tarea
            const horaTarea = tarea.hora_programada;   // Hora programada de la tarea
            //console.log(tareasPendientes[i])
            // Verificar si la fecha y hora de la tarea son iguales a la fecha y hora actuales
            // Si la fecha de la tarea ya pasó
            if (fechaTarea < fechaActual) {
                console.log(`La tarea con ID ${tarea.idtarea} tiene una fecha programada pasada.`);
                coincide = true;  // La tarea ya pasó a "proceso" porque la fecha es anterior
                const actualizado = await actualizarEstadoTarea(tarea.idtarea, 11)
                console.log("tarea actalizad? ",actualizado)
                // Si la fecha de la tarea es la misma que la fecha actual, se verifica la hora
            } else if (fechaTarea === fechaActual) {
                if (horaTarea <= horaActual) {
                    console.log(`La tarea con ID ${tarea.idtarea} está programada para hoy, pero ya pasó la hora.`);
                    coincide = true;  // La tarea ya pasó a "proceso" porque la hora es pasada
                    const actualizado = await actualizarEstadoTarea(tarea.idtarea, 11)
                    console.log("tarea actalizad? ",actualizado)
                    if(actualizado.actualizado){
                        const notificacionID = await notificarResponsableTareaProceso(tarea.idtarea, "ya es momento de realizar mantenimiento")
                        console.log("notificacion ID: ", notificacionID)
                    }
                    
                } else {
                    console.log("La tarea está programada para hoy pero aún no ha llegado la hora.");
                }

                // Si la fecha de la tarea es posterior a la fecha actual, sigue pendiente
            }

            i++;  // Incrementar el índice para revisar la siguiente tarea
        }
    }

    //**************************** ACTUALIZACIONES *********************************************** */

    async function actualizarEstadoTarea(idtarea, idestado) {
        const form = new FormData()
        form.append("operation", "actualizarEstadoTarea")
        form.append("idtarea", idtarea)
        form.append("idestado", idestado)
        const FtareaActualizada = await fetch(`${host}tarea.controller.php`, {method: 'POST', body: form})
        const estadoActualizado = await FtareaActualizada.json()
        return estadoActualizado
    }

    async function notificarResponsableTareaProceso(idtarea, mensaje) {
        const form = new FormData()
        form.append("operation", "addNotfTarea")
        form.append("idtarea", idtarea)
        form.append("mensaje", mensaje)
        const FnotiRegistrada = await fetch(`${host}notificacionTarea.controller.php`, {method: 'POST', body:form})
        const notiRegistrada = await FnotiRegistrada.json()
        return notiRegistrada // ID
    }
})