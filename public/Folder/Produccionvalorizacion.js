
var data = [];
var dataAdapter = "";


$('#cambi_estad_valori').click(function () {
    let idvaloracion = $('#idvalorizacion').val();
    if (idvaloracion == null) {
        mensaje(false, "SELECCIONE UNA VALORIZACION", "no");
    } else {
        cambiar_estado_valorizacion(idvaloracion);
    }

    //cambiar_estado_valorizacion();
});
function cmbx_valorizacion() {

    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_peri_valo_abie',
        dataType: 'json',

        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                cmbx_valorizacion();
            }
        },
        success: function (responses) {
            if (responses.data.length > 0) {
                va = '<option value="" disabled="" selected="">Seleccione</option>';
                for (var c = 0; c < responses.data.length; c++) {
                    //Seleccionamos el select
                    va += '<option value="' + responses.data[c].intIdPeriValo + '">' + responses.data[c]
                            .varCodiPeriValo + '</option>';
                    $("#idvalorizacion").html(va);
                }
            } else {
                va = '<option value="" disabled="" selected="">Seleccione</option>';
                $("#idvalorizacion").html(va);
            }
        }
    });
}
function cambiar_estado_valorizacion(idvaloracion2) {

    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actu_pedi_valor_esta',
        dataType: 'json',
        data: {
            intIdPeriValo: parseInt(idvaloracion2),
            usua_modi: user

        },
        beforeSend: function () {
            $("#modal-cargar-valorizacion").modal('show');
        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                cambiar_estado_valorizacion(idvaloracion2);
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data[0]['@v_mensaje'];
            if (mensaje_alert == "Se Procesaron los datos Correctamente") {
                mensaje(true, mensaje_alert, "modal-cargar-valorizacion");
                document.getElementById('idvalorizacion').val = '';
                cmbx_valorizacion();

            } else {
                mensaje(false, mensaje_alert, "modal-cargar-valorizacion");
                cmbx_valorizacion();
            }



            //setTimeout(location.reload(true),2000);
        }

    });


}


function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}
;