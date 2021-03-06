@push('javascripts')
<link rel="stylesheet" href="jqwidgets/styles/jqx.base.css" type="text/css" />
<link rel="stylesheet" href="jqwidgets/styles/jqx.darkblue.css" type="text/css" />
<link href="jqwidgets/styles/jqx.bootstrap.css" rel="stylesheet">
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
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdata.export.js"></script>

<script type="text/javascript" src="jqwidgets/jqwidgets/jqxpanel.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcalendar.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxdatetimeinput.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcheckbox.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/globalization/globalize.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxcombobox.js"></script>
<script type="text/javascript" src="jqwidgets/scripts/demos.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.aggregates.js"></script> 
<script type="text/javascript" src="jqwidgets/jqwidgets/jqxgrid.export.js"></script>



@endpush
@extends('Layout.main')
@section('contenido')
<div class="card">
    <div class="card-header" style="background-color:white !important">
        <div class="row ">

            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" id="mostrarOT" class="col-md-12 col-12">O.T</label>    
                    <div style="float:left;" id='txt_ot_repo_lote_pint' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" id="mostrar_tipo_elemento">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">TIPO ELEMENTO</label>
                    <div style="float:left;" id='tipo_elem_repo_lote_pint' class="col-md-11 col-11">
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" id="mostrar_tipo_elemento">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">ZONAS</label>
                    <div style="float:left;" id='zona_repo_lote_pint' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-2 col-md-2 col-md-4 col-sm-4 col-6" id="mostrar_tipo_elemento">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">PROGRAMAS</label>
                    <div style="float:left;" id='programa_repo_lote_pint' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-2 col-md-4 col-sm-4 col-6">
                <div class="form-group">
                    <label for="inputPassword3" style="font-weight:500 !important" class="col-md-12 col-12">SIST. PINTURA</label>
                    <div style="float:left;" id='repor_lote_sis_pintura' class="col-md-11 col-11">
                    </div>
                </div>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-2 col-3">
                <div class="float-left" >
                    <button class="btn btn-block btn-primary btn-sm" type="button" id="btn_busc_repo_lote_pint" style="margin-top:30px;">
                        <i class="fas fa-search icon-buscar"></i> Buscar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body default cabecera_pantalla">
        <div id='jqxWidget'>
            <div id="grid_repor_lote_pint"></div>
            <div style="margin-top: 30px;">
                <div id="cellbegineditevent"></div>
                <div style="margin-top: 10px;" id="cellendeditevent"></div>
            </div>
        </div>
        <div class="row " style="margin-top: -20px">
            <div class="col-md-10" >
            </div>
            <div class="col-md-2 hidde_grid" id="mostrar_boton_generar_lote">

                <button class="btn btn-block btn-primary btn-md" id="generar_lote_pintura" style="margin-top:8px;">
                    <i class="fas fa-file-alt"></i> GENERAR LOTE
                </button>
            </div>
        </div>
    </div>

</div>
</div>  
</div>


@include('Reportar_Pintura.modal_cargar')
@include('Reportar_Pintura.modal_pregunta')
@include('Reportar_Pintura.modal_gene_lote_pint')
@include('Reportar_Pintura.modal_gene_lote_pint_edit')
@include('Reportar_Pintura.modal_errores')
@push('scripts')
<script type="text/javascript" src="js/sweetalert2@8.js" ></script>
<script type="text/javascript" src="Folder/reportar_pintura.js"></script>

<script type="text/javascript">
    listar__proyectos_repo_lote_pint_ot();
    combo_producto();
</script>
@endpush
@endsection