var data = [];
var dataAdapter = "";
$("#actualizar_maquina").click(function () {
    let idmaquina = $("#idmaquina").val();
    let descripcion = $("#descr_maquina").val().toUpperCase().trim();
    let idagrupador = $("#id_agrupador_edit").val();
    let idestado = $("#id_estado_maquina_edit").val();

    if (descripcion == "") {
        mensaje(false, "INGRESE LA DESCRIPCION", "no");
    } else {
        actualizar_maquina(idmaquina, descripcion, idagrupador, idestado);
    }


});
$("#excel_maquina").on('click', function () {

    var data_info = "";
    var data_rows = "";
    var data_info = jQuery('#grid').jqxGrid('getdatainformation');

    data_rows = data_info.rowscount;

    //jQuery("#repo_ries_suce_vers_acci_lbl_mens").html("");
    if (data_rows === 0) {
        mensaje(false, "No hay datos que exportar", "no");
    } else {

        var rows = $("#grid").jqxGrid("exportData", 'json');

        expo_arch_exce(rows, "REPORTE MAQUINA", true);

    }
});
$("#createmaquina").click(function () {
    campo_vacio();
    $('#modal-create-maquina').modal('show');

});

$("#registrarmaquina").click(function () {

    let descripcion_maquina = $("#descrp_maquina").val().toUpperCase().trim();
    let id_agrupador = $("#id_agrupador_create").val();
    let id_estado = $("#id_estado_maquina_create").val();
    //console.log(descripcion_maquina,id_agrupador,id_estado);

    if (descripcion_maquina == "") {
        mensaje(false, "INGRESE LA DESCRIPCION", "NO");
    } else {
        if (id_agrupador == null) {
            mensaje(false, "INGRESE LA AGRUPADOR", "NO");
        } else {
            if (id_estado == null) {
                mensaje(false, "INGRESE LA ESTADDO", "NO");
            } else {
                console.log(descripcion_maquina, id_agrupador, id_estado);
                registrar_maquina(descripcion_maquina, id_agrupador, id_estado);
            }
        }
    }

});



function listar_maquina() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_maqui_todo',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                listar_maquina();
            }
        },
        success: function (responses) {

            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdMaquinas', type: 'String'},
                    {name: 'varDescripcion', type: 'String'},
                    {name: 'intIdAgru', type: 'String'},
                    {name: 'varDescAgru', type: 'String'},
                    {name: 'intIdEsta', type: 'String'},
                    {name: 'varDescEsta', type: 'String'},
                    {name: 'acti_usua', type: 'String'},
                    {name: 'acti_hora', type: 'String'},
                    {name: 'usua_modi', type: 'String'},
                    {name: 'hora_modi', type: 'String'},
                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);

            var editrow = -1;
            /**
             * SE DIBUJA LA TABLA
             */

            $("#grid").jqxGrid({
                width: '100%',
                height: '300',
                source: dataAdapter,
                columnsresize: true,
                altrows: true,
                showfilterrow: true,
                filterable: true,
                selectionmode: 'multiplecellsextended',
                sortable: true,
                theme: 'darkblue',
                showstatusbar: true,
                statusbarheight: 25,
                showaggregates: true,
                showgroupaggregates: true,
                columns: [
                    {
                        text: 'Editar', datafield: 'Editar', columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Editar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);

                           
                        }
                    },

                    {
                        text: 'Eliminar', datafield: 'Eliminar', cellclassname: "special", columntype: 'button', width: 90, cellsrenderer: function () {
                            return "Eliminar";
                        }, buttonclick: function (row) {
                            // open the popup window when the user clicks a button.
                            editrow = row;
                            var offset = $("#grid").offset();
                            var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
                            eliminar_maquina(dataRecord.intIdMaquinas);

                        }
                    },
                    {text: 'Número', datafield: 'intIdMaquinas', width: 60, cellsalign: 'center', aggregates: [{
                                '<b>#</b>':
                                        function (aggregatedValue, currentValue, column, record)
                                        {
                                            var count = $("#grid").jqxGrid('getrows');
                                            return count.length;

                                        }
                            }]},
                    {text: 'Descripcion', datafield: 'varDescripcion', width: 180},
                    {text: 'id_Agrupador', datafield: 'intIdAgru', width: 130, hidden: true},

                    {text: 'Agrupador', datafield: 'varDescAgru', width: 230},
                    {text: 'id_estado', datafield: 'intIdEsta', cellsalign: 'left', width: 190, hidden: true},
                    {text: 'Estado', datafield: 'varDescEsta', cellsalign: 'left', width: 80},
                    {text: 'Creado por', datafield: 'acti_usua', cellsalign: 'left', width: 150},
                    {text: 'Creado el', datafield: 'acti_hora', cellsalign: 'left', width: 180},
                    {text: 'Modificado por', datafield: 'usua_modi', width: 150},
                    {text: 'Modificado el', datafield: 'hora_modi', width: 180},
                ]
            });



        }
    });
}

function combox_agrupador() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_agru_acti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                combox_agrupador();
            }
        },
        success: function (responses) {
            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdAgru + '">' + responses.data[c]
                        .varDescAgru + '</option>';
                $("#id_agrupador_edit").html(va);
                $("#id_agrupador_create").html(va);

            }

        }
    });
}

function cmbx_listar_estado() {
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/eleg_proc_estado',
        dataType: 'json',
        data: {
            intIdProcEsta: parseInt(5),

        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                cmbx_listar_estado();
            }
        },
        success: function (responses) {

            va = '<option value="" disabled="" selected="">Seleccione</option>'
            for (var c = 0; c < responses.data.length; c++) {
                //Seleccionamos el select
                va += '<option value="' + responses.data[c].intIdEsta + '">' + responses.data[c]
                        .varDescEsta + '</option>';
                $("#id_estado_maquina_edit").html(va);
                $("#id_estado_maquina_create").html(va);
            }


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

function actualizar_maquina(idmaquina2, descripcion2, idagrupador2, idestado2) {

    console.log("maquina ", idmaquina2, "descripcion ", descripcion2, "agrupado ", idagrupador2, "estado ", idestado2)
    let user = obtener_user();

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/actu_maqui',
        dataType: 'json',

        data: {
            intIdMaquinas: parseInt(idmaquina2),
            varDescripcion: descripcion2,
            intIdAgru: parseInt(idagrupador2),
            intIdEsta: parseInt(idestado2),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                actualizar_maquina(idmaquina2, descripcion2, idagrupador2, idestado2);
            }
        },
        success: function (responses) {

            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Actualizacion Satisfactoria") {
                mensaje(true, mensaje_alert, "modal-edit-maquina");

            } else {
                mensaje(false, mensaje_alert, "modal-edit-maquina");
            }

            listar_maquina();
        }
    });


}

function registrar_maquina(descrip, agrupador, estado) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/regi_maqui',
        dataType: 'json',
        data: {
            varDescripcion: descrip,
            intIdAgru: parseInt(agrupador),
            intIdEsta: parseInt(estado),
            acti_usua: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {
                registrar_maquina(descrip, agrupador, estado);
            }
        },
        success: function (responses) {
            console.log(responses);
            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Registro Satisfactorio.") {
                mensaje(true, mensaje_alert, "modal-create-maquina");
            } else {
                mensaje(false, mensaje_alert, "modal-create-maquina");


            }
            listar_maquina();
        }


    });
}

function eliminar_maquina(idmaquina) {
    let user = obtener_user();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/elim_maqui',
        dataType: 'json',
        data: {
            intIdMaquinas: parseInt(idmaquina),
            usua_modi: user
        },
        error: function (xhr, ajaxOptions, thrownError) {

            if (thrownError == "Internal Server Error") {
                eliminar_maquina();
            }
        },
        success: function (responses) {
            console.log(responses);
            let mensaje_alert = responses.data.mensaje;
            if (mensaje_alert == "Se ha eliminado.") {
                mensaje(true, mensaje_alert, "no");
            } else {
                mensaje(false, mensaje_alert, "no");


            }
            listar_maquina();
        }
    });
}
;

function campo_vacio() {
    $("#descrp_maquina").val("");
    $("#id_agrupador_create").val("");
    $("#id_estado_maquina_create").val("");
}
function expo_arch_exce(JSONData, ReportTitle, ShowLabel) {

    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV === '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
