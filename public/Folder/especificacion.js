var codigo_usuario = "";

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}

function soloNumerospunto(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57) || key == 46
}

function multiplica() {
    var total = 0;

    var valor1 = document.getElementById("idespecif").value;
    var valor2 = document.getElementById("factor").value;
    if (valor2 !== ".") {
        total = (valor1 * valor2);
        total = parseFloat(Math.round(total * 100) / 100).toFixed(2);
//    alert(total);
        document.getElementById("maxima").value = total;
    }else{        
      total = 0;          
    }
//    var maxima = document.getElementById("maxima");
//    maxima.innerHTML = total;
}

function limpiar() {
    $("#idespecif").val('');
    $("#factor").val('');
    $("#maxima").val('');
    $("#tipomaterial").jqxDropDownList({selectedIndex: -1});
}

$('#create').click(function () {
    limpiar();
    $('#modal-create-especificacion').modal('show');
});

$('#agregar').click(function () {
    registrar_especificacion();
});

$("#excel").click(function () {
    var data = $("#grid").jqxGrid('exportdata', 'json');
    JSONToCSVConvertor(data, "Listar Tipo Especificación", true);
});

function listar_material() {
    var material = [{cod_Material: 'LIVIANO', des_Material: 'LIVIANO'},
        {cod_Material: 'SEMIPESADO', des_Material: 'SEMIPESADO'},
        {cod_Material: 'PESADO', des_Material: 'PESADO'}];
    var source =
            {
                localdata: material,
                datatype: "array"
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    $('#tipomaterial').jqxDropDownList({selectedIndex: -1, placeHolder: "SELECCIONE", source: dataAdapter, displayMember: "des_Material", valueMember: "cod_Material", itemHeight: 20, height: 35, width: 250, dropDownHeight: 68});
}

function listar_especificacion() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/listar_especificaciones',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError === "Internal Server Error") {
                listar_especificacion();
            }
        },
        success: function (responses) {
            var source = {
                localdata: responses.data,
                datatype: "array",
                datafields: [
                    {name: 'intIdEspeci', type: 'number'},
                    {name: 'intEspeci', type: 'number'},
                    {name: 'deciFactor', type: 'decimal'},
                    {name: 'varTipoMate', type: 'string'},
                    {name: 'deciEspeciMax', type: 'decimal'},
                    {name: 'intIdEsta', type: 'string'},
                    {name: 'acti_usua', type: 'string'},
                    {name: 'acti_hora', type: 'datetime'},
                    {name: 'usua_modi', type: 'string'},
                    {name: 'hora_modi', type: 'datetime'},
                    {name: 'varDescEsta', type: 'string'}

                ], updaterow: function (rowid, rowdata, commit) {
                    commit(true);
                }
            };
            dataAdapter = new $.jqx.dataAdapter(source);

//            editrow = -1;

            var anular_especificacion = function (row) {
                var editrow = row;
                var html = "";
                var xidrow = $('#grid').jqxGrid('getrowdata', editrow);
                var xcodestado = xidrow.varDescEsta;
                //alert(xcodestado);
                if (xcodestado === "ACTIVO") {
                    html = '<center><button class="btn btn-danger btn-sm" onClick=anular_especif("' + editrow + '"); style="margin-center: 2px;color: #001255;background-color: white;" ><i class="fas fa-edit"></i></button></center>';
                } else
                {
                    html = '<center><button class="btn btn-danger btn-sm" onClick=anular_especif("' + editrow + '"); style="margin-center: 2px;color: #001255;background-color: white;" ><i class="far fa-trash-alt"></i></button></center>';
                }
                return html;
            };
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
                //autoheight: true,
                //pageable: true,
                showgroupaggregates: true,
                columns:
                        [
//                            {
//                                text: 'EDITAR', datafield: 'Editar', columntype: 'button', width: 100, cellsrenderer: function () {
//                                    return "Editar";
//                                }, buttonclick: function (row) {
//                                    // listar_estados_Editar();
//                                    editrow = row;
//                                    //var offset = $("#grid").offset();
//                                    var dataRecord = $("#grid").jqxGrid('getrowdata', editrow);
//                                    $('#modal-edit-especificacion').modal('show');
//                                    $("#id").val(dataRecord.intIdTipoEstructurado);
//                                    $("#descestruc").val(dataRecord.varDescTipoEstru);
//                                    $("#estado9").val(dataRecord.varEstaTipoEstru);
//                                    $("#usuario").val(dataRecord.acti_usua);
//                                    $("#usuariomod").val(dataRecord.usua_modi);
//                                    $("#horamod").val(dataRecord.hora_modi);
//                                    $("#desEstaEstructurado").val(dataRecord.desEstaTipoEstru);
//                                    //alert(dataRecord.desEstaTipoEstru);
//                                }
//                            },
                            {text: 'OPCIONES', datafield: 'opc', width: 79, cellsrenderer: anular_especificacion},
                            {text: 'ID', datafield: 'intIdEspeci', width: 55, cellsalign: 'center', aggregates: [{
                                        '<b>N°</b>':
                                                function (aggregatedValue, currentValue, column, record)
                                                {
                                                    var count = $("#grid").jqxGrid('getrows');
                                                    return count.length;
                                                }
                                    }]},
                            {text: 'TIPO MATERIAL', datafield: 'varTipoMate', cellsalign: 'left', width: 280},
                            {text: 'ESPECIFICACIÒN', datafield: 'intEspeci', width: 125},
                            {text: 'FACTOR', datafield: 'deciFactor', width: 125},
                            {text: 'ESPECIFICACIÒN MAXIMA', datafield: 'deciEspeciMax', width: 185},
                            {text: 'ESTADO', datafield: 'varDescEsta', width: 185},
                            {text: 'CREADO POR', datafield: 'acti_usua', width: 205},
                            {text: 'CREADO EL', datafield: 'acti_hora', width: 205},
                            {text: 'MODIFICADO POR', datafield: 'usua_modi', width: 205},
                            {text: 'MODIFICADO EL', datafield: 'hora_modi', width: 205}
                        ]
            });
            //$("#grid").jqxGrid('localizestrings', localizationobj);
        }
    });

}

function registrar_especificacion() {
    let especif = $('#idespecif').val();
    let factor = $('#factor').val();
    let max = $('#maxima').val();
    let material = $('#tipomaterial').val().toUpperCase();
    let user = obtener_user();
//    listar_material();
    if (material !== "") {
        if (especif !== "") {
            if (factor !== "") {
                $.ajax({
                    type: 'POST',
                    url: url + '/GestionProyectos/public/index.php/crear_especificaion',
                    dataType: 'json',
                    data: {
                        intEspeci: especif,
                        deciFactor: factor,
                        varTipoMate: material,
                        deciEspeciMax: max,
                        intIdEsta: 3,
                        acti_usua: user
                    },
                    error: function (xhr, ajaxOptions, thrownError) {

                        if (thrownError === "Internal Server Error") {
                            registrar_especificacion();
                        }
                    },
                    success: function (responses) {
                        if (responses.data === "") {
                            limpiar();
                            mensaje_noti(true, 'Guardado con exito.', "");
                            listar_especificacion();
                        } else {
                            mensaje(false, "Hay errores al Asignar Especificacion.", "no");
                        }
                        $('#modal-create-especificacion').modal('hide');
                    }
                });
            } else
            {
                mensaje(false, "CAMPO FACTOR VACIO.", "NO");
                $('#modal-create-especificacion').modal('hide');
            }
        } else {
            mensaje(false, "CAMPO ESPECIFICACIÒN VACIO.", "NO");
            $('#modal-create-especificacion').modal('hide');
            listar_especificacion();
        }
    } else {
        mensaje(false, "CAMPO TIPO MATERIAL VACIO.", "NO");
        $('#modal-create-especificacion').modal('hide');
        listar_especificacion();
    }

}

function anular_especif(idrow) {
    var textarray = $('#grid').jqxGrid('getrowdata', idrow);
    var intIdEspeci = textarray.intIdEspeci;
    var estado = textarray.varDescEsta;
    // alert(estado);
    if (estado === "ACTIVO")
    {
        $.ajax({
            type: 'POST',
            url: url + '/GestionProyectos/public/index.php/estado_especificacion',
            dataType: 'json',
            data: {
                intIdEspeci: intIdEspeci,
                usua_modi: codigo_usuario,
                intIdEsta: 14
            },
            error: function (xhr, ajaxOptions, thrownError) {
                if (thrownError === "Internal Server Error") {
                }
            },
            success: function (responses) {
                if (responses.data === "") {
                    mensaje_noti(true, 'Registro anulado correctamente', "");
                    listar_especificacion();
                } else {
                    mensaje(false, "No se puede anular el Registro", "");
                    listar_errores(responses.data.mensaje);
                }
            }
        });
    }
}

function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    codigo_usuario = cod_user[0].codigo_usuario;
    return codigo_usuario;
}


function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //Set Report title in first row or line
    CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            if (index !== 'EDITAR') {
                //Now convert each value to string and comma-seprated
                row += index + ',';
            }
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
            if (index !== 'EDITAR') {
                row += '"' + arrData[i][index] + '",';
            }
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }
    if (CSV == '') {
        alert("Invalid data");
        return;
    }
//Generate a file name
    var fileName = "Mi_Reporte";
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
