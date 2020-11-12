@push('javascripts')
<link rel="stylesheet" href="introjs.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
<link rel="stylesheet" href="jqwidgets/styles/jqx.light.css" type="text/css" />
<!--<script type="text/javascript" src="jqwidgets/scripts/jquery-1.11.1.min.js"></script>-->
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcore.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxbuttons.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxscrollbar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxmenu.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.pager.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.filter.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.sort.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.selection.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxnumberinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxwindow.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxlistbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdropdownlist.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.columnsresize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.export.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 
@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header cabecera_pantalla">
        <div class="float-right mr-3">
            <button class="btn btn-block btn-primary"  onclick="introJs().start();"  type="button" id="obte_info">
                <i class="fas fa-info-circle"></i> 
            </button>
        </div>

        <div class="float-right mr-3" data-intro="Permite registrar una nueva “Etapa”.">
            <button class="btn btn-block btn-primary" type="button" id="create">
                <i class="fas fa-plus"></i> Nuevo
            </button>
        </div>
        <div class="float-right mr-3" data-intro="Exporta la tabla hacia la hoja de cálculo Excel.">
            <button class="btn btn-block btn-success" id="excel">
                <i class="far fa-file-excel"></i> Exportar
            </button>
        </div>
    </div>
    <div class="card-body default" data-intro="<b>Editar:</b><br>Permite realizar cambios en los datos registrados de una “Etapa”.
        <br><br><b>Eliminar:</b><br>Cambia el estado de una etapa a INACTIVO (Se puede volver a activar desde la opción “Editar”).">
        <div id='jqxWidget'>
            <div id="grid"></div>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
    </div>
</div>
@include('Etapa.modal_edit_etapa')
@include('Etapa.modal_create_etapa')
@push('scripts')
<script src="intro.js"></script>
<script src="js/sweetalert2@8.js"></script>
<script type="text/javascript" src="Folder/etapa.js"></script>
<script type="text/javascript">
                $(document).ready(function () {
                    listar_etapa();
                    combo_tipo_etapa();
                    combo_proceso();
                    combo_producto();
                    combo_unidad_medida();
                    combo_planta();
                });
</script>
@endpush
@endsection