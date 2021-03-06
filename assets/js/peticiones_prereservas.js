

$(document).ready(function () {
    fechaActual = $('#fecha_reserva').val();
    /*
     * Agregado del evento change, para detectar cambios en campo deportivo
     */
    realizarPeticionHorario($('.idcampo').attr('id'), $('#fecha_reserva').val());
    
    detectarCambiosFecha();

});

/**
 * Esta funcion detecta cambios en el campo de fecha de manera automatica
 * @returns void
 */
function detectarCambiosFecha() {
    setInterval(function () {
        if (fechaActual != $('#fecha_reserva').val()) {
            fechaActual = $('#fecha_reserva').val();
            realizarPeticionHorario($('.idcampo').attr('id'), $('#fecha_reserva').val());
        }
    }, 200);
}

/**
 * Realiza la peticion para detectar los horarios disponibles para un campo deportivo
 * dado la fecha
 * @param {type} idCampoDeportivo
 * @param {type} fecha
 * @returns {undefined}
 */
function realizarPeticionHorario(idCampoDeportivo, fecha) {
    if (idCampoDeportivo == 'nulo') {
        mostrarMensajeSeleccion();
        return;
    }
    $.ajax({
        data: 'id_campo_deportivo=' + idCampoDeportivo + '&fecha_reserva=' + fecha,
        url: '../servicioDeFiltracionDatos/procesarHorarios',
        type: 'post',
        beforeSend: function () {
            console.log('enviando la peticion de horario......');
        },
        success: function (response) {
            console.log('La peticion de horario ha sido satisfactoria');
            /**
             * Recibimos la respuesta y parseamos a formato JSON
             * @type @exp;JSON@call;parse
             */
            var respuesta = JSON.parse(response);

            exitoPeticionHorarios(respuesta);
        },
        error: function () {
            console.log('Existen fallas de horarios en el servidor');
        }
    });
}

/**
 * En el caso de que la respuesta a la peticion ajax se retorne con exito
 * se ejecuta esta funcion
 * @param JSON respuesta
 * @returns void
 */
function exitoPeticionHorarios(respuesta) {
    var horarioAtencion = respuesta.horariosAtencion[0];
    
    var horarios = respuesta.horarios;
    
    /**
     * Almacenador de horarios validos
     * @type Array
     */
    var horariosDisponibles = [];
    
    horariosDisponibles = calcularHorariosDisponibles(horarios, horarioAtencion);
  
    renderizarHorariosDisponibles(horariosDisponibles);
}

/**
 * Funcion encargada de renderizar los horarios disponibles
 * @param Array horariosDisponibles
 * @returns void
 */
function renderizarHorariosDisponibles(horariosDisponibles) {
    var result = "<ul class=\"list-group\">" +
            "<li class=\"list-group-item active\">Horarios Disponibles</li>";
    
    for (var i = 0; i < horariosDisponibles.length; i++) {
        result = result + "<li class=\"list-group-item\"><span class=\"text-left\">" + horariosDisponibles[i].horaInicio +
                "</span> -     <span class=\"text-right\">" + horariosDisponibles[i].horaFin + "</span></li>"
    }

    result = result + "</ul>";
    $('#campo-disponible').html(result);
}

/**
 * Esta Funcion procesa los horarios, para asi poder obtener los horarios deisponibles
 * de reservas, retorna los horarios disponibles en un Array
 * @param Array horarios
 * @returns Array
 */
function calcularHorariosDisponibles(horarios, horarioAtencion) {
    var horariosDisponibles = [];
    
    //Hora Inicial de horarios disponibles
    var horaIni = horarioAtencion.horaInicio;
    //Hora Final de horarios disponibles
    var horaTer = horarioAtencion.horaFin;
    
    for (var i = 0; i < horarios.length; i++) {
        if (horarios[i].horaInicio == horarioAtencion.horaInicio) {
            horaIni = horarios[i].horaFin;
        } else {
            var objeto = {};
            if (horaIni != horarios[i].horaInicio) {
                objeto.horaInicio = horaIni;
                objeto.horaFin = horarios[i].horaInicio;

                horariosDisponibles[horariosDisponibles.length] = objeto;
                horaIni = horarios[i].horaFin;
            } else {
                horaIni = horarios[i].horaFin;
            }

        }

    }
    
    if (horaIni != horaTer) {
        var objeto = {
            horaInicio: horaIni,
            horaFin: horaTer
        };
        horariosDisponibles[horariosDisponibles.length] = objeto;
    }
    
    return horariosDisponibles;
}

/**
 * funcion para mostrar el mensaje de seleccion de cancha, para el caso en que el 
 * usuario no seleccione una cancha
 * @returns 
 */

function mostrarMensajeSeleccion() {
    var result = "<ul class=\"list-group\">" +
            "<li class=\"list-group-item active\">Horarios Disponibles</li>" +
            "<div class=\"alert alert-info\" role=\"alert\">"
            +"<span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span>"
            +"Debe Seleccionar un Campo Deportivo</div>"
            +"</ul>";
    $('#campo-disponible').html(result);
}


