var estado_ot_list_ot = "";
var unid_repo_peso_value = "";
var ot_repo_peso_value = "";
var checkedItems = "";
var data = {};
// UNIDAD REPORTE PESO
$("#unid_repo_peso").on('checkChange', function (event) {

    unid_repo_peso_value = "";
    checkedItems = "";
    if (event.args.checked) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#unid_repo_peso").jqxDropDownList('checkAll');
                } else {
                    var items = $("#unid_repo_peso").jqxDropDownList('getCheckedItems');
                    $.each(items, function (index) {
                        checkedItems += "'" + this.value + "',";

                    });
                    console.log(checkedItems);
                    listar_data_list_proyectos(checkedItems, estado_ot_list_ot);

                }
            }
        }
    } else {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#unid_repo_peso").jqxDropDownList('uncheckAll');
                }
            }
        }
    }
    unid_repo_peso_value = "";

});
// ESTADO DE LA OT
$("#esta_ot_repo_peso").on('change', function (event) {
    estado_ot_list_ot = "";
    if (event.args) {
        var item = event.args.item;
        if (item) {
            estado_ot_list_ot = item.value;

        }
    }
    listar_data_list_proyectos(checkedItems, estado_ot_list_ot);
});

$("#ot_repo_peso").on('checkChange', function (event) {
    ot_repo_peso_value = "";
    if (event.args.checked) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#ot_repo_peso").jqxDropDownList('checkAll');
                }
            }
        }
    } else {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                if (item.label === "TODOS") {
                    $("#ot_repo_peso").jqxDropDownList('uncheckAll');
                }
            }
        }
    }
});


// LISTAR LA UNIDAD DE NEGOCIO
function combo_unid_nego() {
    $.ajax({
        type: 'GET',
        url: url + '/GestionProyectos/public/index.php/list_unid_nego_acti',
        dataType: 'json',
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            var source =
                    {
                        localdata: responses.data.reverse(),
                        datatype: "array",
                        datafields: [
                            {name: 'intIdUniNego'},
                            {name: 'varDescripcion'}
                        ],

                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            // Create a jqxDropDownList
            $("#unid_repo_peso").jqxDropDownList({checkboxes: true, source: dataAdapter, displayMember: "varDescripcion", valueMember: "intIdUniNego", width: 220, height: 30, });
            $("#unid_repo_peso").jqxDropDownList('checkIndex', 1);



        }
    });
}
//LISTAR EL ESTADO
function tipo_ot() {
    var tipo_ot = [{'Tipo_Ot': 1, 'VarOt': 'ABIERTOS'}, {'Tipo_Ot': 2, 'VarOt': 'CERRADOS'}];
    var source =
            {
                localdata: tipo_ot,
                datatype: "array",
                datafields: [
                    {name: 'Tipo_Ot'},
                    {name: 'VarOt'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#esta_ot_repo_peso").jqxDropDownList({source: dataAdapter, displayMember: "VarOt", valueMember: "Tipo_Ot", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#esta_ot_repo_peso").val('1');
    $("#esta_ot_repo_peso").jqxDropDownList('focus');
}
//LISTAR LA LISTA DE PROYECTO 
function listar_data_list_proyectos(checkedItems2, codigo2) {
    //var cadena =checkedItems2.slice(0,-1);
    var array_ot = new Array();
    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/listar_ot_pesos',
        dataType: 'json',
        data: {
            intIdUniNego: checkedItems2,
            intIdEsta: codigo2
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
            // responses.data.push({varCodiProy: 'TODOS', intIdproy: -1});
            console.log(responses);
            var source =
                    {
                        localdata: responses.data,
                        datatype: "array",
                        datafields: [
                            {name: 'varCodiProy'},
                            {name: 'intIdproy'}
                        ],
                        async: false
                    };
            var dataAdapter = new $.jqx.dataAdapter(source);
            $("#ot_repo_peso").jqxDropDownList({
                filterPlaceHolder: "Buscar",
                checkboxes: true,
                filterable: true,
                source: dataAdapter,
                width: '200px',
                height: '30px',
                displayMember: "varCodiProy",
                valueMember: "intIdproy"
            });
            $("#ot_repo_peso").jqxDropDownList('selectIndex', 1);
            $("#ot_repo_peso").jqxDropDownList('focus');
        }

    });

}

$("#btn_busc_repo_peso").click(function () {
    let idunidad = $("#unid_repo_peso").val();
    let esta_ot = $("#esta_ot_repo_peso").val();
    let list_ot = $("#ot_repo_peso").val();
    let tipo = $("#tipo_ot_repo_peso").val();
    console.log(idunidad, esta_ot, list_ot, tipo);


    if (list_ot === "") {
        mensaje(false, "Seleccione OT ", "no");
    } else {
        if (tipo === "") {
            mensaje(false, "Seleccione el tipo", "no");
        } else {
             $("#modal-cargar-repo-peso").modal("show");
            mostrar_grilla(list_ot, tipo);
        }
    }

});
//LISTAR EL ESTADO
function tipo_reporte_ot() {
    var tipo_ots = [{'Tipo': 1, 'VarOt': 'ESTRUCTURA'}, {'Tipo': 2, 'VarOt': 'PERNOS'}];
    var source =
            {
                localdata: tipo_ots,
                datatype: "array",
                datafields: [
                    {name: 'Tipo'},
                    {name: 'VarOt'}
                ],
                async: false
            };
    var dataAdapter = new $.jqx.dataAdapter(source);
    //$("#producto").jqxDropDownList({ source: dataAdapter, placeHolder: "Select Item", width: 250, height: 30});

    $("#tipo_ot_repo_peso").jqxDropDownList({source: dataAdapter, displayMember: "VarOt", valueMember: "Tipo", width: 200, height: 30});
    // Focus the jqxDropDownList
    //$("#tipo_ot").jqxDropDownList('selectIndex', 1);
    $("#tipo_ot_repo_peso").val('1');
    $("#tipo_ot_repo_peso").jqxDropDownList('focus');
}

function mostrar_grilla(list_ot2, tipo2) {
    let  user = obtener_user();
    let nuevo_lista = "";
    nuevo_lista = list_ot2 + ",";

    $.ajax({
        type: 'POST',
        url: url + '/GestionProyectos/public/index.php/llistar_pesos_ot',
        dataType: 'json',
        data: {
            v_varintIdProy: nuevo_lista,
            v_tipo: parseInt(tipo2),
            v_usuario: user
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if (thrownError == "Internal Server Error") {

            }
        },
        success: function (responses) {
                
                
                data = responses.data;
                
                
            var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'intIdProy', type: 'number'},
                            {name: 'varCodigoOT', type: 'string'},
                            {name: 'dateFecTermino', type: 'string'},
                            {name: 'deciPesoComer', type: 'string'},
                            {name: 'deciPesoCompraSol', type: 'string'},
                            {name: 'deciPesoCompraRec', type: 'string'},
                            {name: 'deciPesoCompraDes', type: 'string'},
                            {name: 'deciPesoIngenieria', type: 'string'},
                            {name: 'deciPesoNegro', type: 'string'},
                            {name: 'deciPesoGalvanizado', type: 'string'},
                            {name: 'deciPesoDespachado', type: 'string'},
                            {name: 'varUsuario', type: 'string'},
                            {name: 'intCanti', type: 'number'},
                        ],
                        hierarchy:
                                {
                                    keyDataField: {name: 'intIdProy'},
                                    parentDataField: {name: 'varCodigoOT'}
                                },
                        id: 'intIdProy',
                        localData: responses.data
                    };

            window.setTimeout(function () {
                $("#modal-cargar-repo-peso").modal('hide'); // COLOCO ANDY 
            }, 1000);

            var dataAdapter = new $.jqx.dataAdapter(source);
            

            $("#grid_repor_lote_pint").jqxTreeGrid({
                    source: dataAdapter
                });
            $('#grid_repor_lote_pint').on('bindingComplete', function () {
                $("#grid_repor_lote_pint").jqxTreeGrid('expandAll');
            });
        }
    });



}

// VAMOS A PREPARAR LA DATA
function preparar_data (){
    
    var source =
                    {
                        dataType: "json",
                        dataFields: [
                            {name: 'intIdProy', type: 'number'},
                            {name: 'varCodigoOT', type: 'string'},
                            {name: 'dateFecTermino', type: 'string'},
                            {name: 'deciPesoComer', type: 'string'},
                            {name: 'deciPesoCompraSol', type: 'string'},
                            {name: 'deciPesoCompraRec', type: 'string'},
                            {name: 'deciPesoCompraDes', type: 'string'},
                            {name: 'deciPesoIngenieria', type: 'string'},
                            {name: 'deciPesoNegro', type: 'string'},
                            {name: 'deciPesoGalvanizado', type: 'string'},
                            {name: 'deciPesoDespachado', type: 'string'},
                            {name: 'varUsuario', type: 'string'},
                            {name: 'intCanti', type: 'number'},
                        ],
                        hierarchy:
                                {
                                    keyDataField: {name: 'intIdProy'},
                                    parentDataField: {name: 'varCodigoOT'}
                                },
                        id: 'intIdProy',
                        localData: data
                    };
      var dataAdapter = new $.jqx.dataAdapter(source);
     var linkrenderer_accounts = function (row, column, value, rowKey, rowData) {
      var html = value;
        if (rowKey.level === 0) {
            id_varibale_level_3 = "";
            id_varibale_level_3 = value;
            console.log(value);
            hola = 0;

                var html = '<button class="btn btn-danger btn-sm" onClick=listar_zona("");><i class="fas fa-search"></i></button>';
           
        }};
     
     var cellClass1 = function (row, dataField, cellText, rowData) {
        console.log( rowData.nombProy ) 
    }; 
     
        $("#grid_repor_lote_pint").jqxTreeGrid(
            {
                width: '100%',
                source: dataAdapter,
                sortable: true,
                height: '400',
                theme: 'darkblue',
                columns: [
                    {text: 'Id', dataField: 'intIdProy', width: 200, 'hidden': true},
                    {text: 'Proyecto', dataField: 'varCodigoOT', pinned: true, width: 220,cellClassName: cellClass1, cellsrenderer: linkrenderer_accounts, cellsalign: 'left'},
                    {text: 'Fecha Termino', dataField: 'dateFecTermino', pinned: true, width: 120},
                    {text: 'Peso Comercial', dataField: 'deciPesoComer', pinned: true, width: 120},
                    {text: 'Peso Sol', dataField: 'deciPesoCompraSol', pinned: true, width: 120},
                    {text: 'Peso Rec', dataField: 'deciPesoCompraRec', pinned: true, width: 120},
                    {text: 'Peso Des', dataField: 'deciPesoCompraDes', pinned: true, width: 120},
                    {text: 'Peso Ingenieria', dataField: 'deciPesoIngenieria', pinned: true, width: 120},
                    {text: 'Peso Negro', dataField: 'deciPesoNegro', pinned: true, width: 120},
                    {text: 'Peso Galvanizado', dataField: 'deciPesoGalvanizado', pinned: true, width: 120},
                    {text: 'Peso Despachado', dataField: 'deciPesoDespachado', pinned: true, width: 120},
                    {text: 'Usuario', dataField: 'varUsuario', pinned: true, width: 120},
                    {text: 'Cantidad', dataField: 'intCanti', pinned: true, width: 120},
                    ]
            });
         $("#grid_repor_lote_pint").jqxGrid('localizestrings', localizationobj);
         
      
}
function obtener_user() {
    var cod_user = JSON.parse(localStorage.getItem("nombre"));
    var codigo_usuario = "";
    for (let usuario = 0; usuario < cod_user.length; usuario++) {
        codigo_usuario = cod_user[usuario]['codigo_usuario'];
    }
    return codigo_usuario;
}