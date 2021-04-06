<div class="row">
    <div class="col-lg-12">
        <div class="barra_nav animate__animated animate__fadeIn">
            <div class="row">
                <div class="col-lg-4">
                    <a href=""  class="btn btn-info pt-2 transparent-button text-info bx-shadow-app btn-circle animate__animated animate__fadeIn" ><i class="fas fa-file-excel"></i> </a>
                    <button type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle animate__animated animate__fadeIn"><i class="fas fa-file-pdf"></i> </button>
                    <button  type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle " 
                                    onclick="new_product()" id="new_pro"><i class="fas fa-plus"></i> 
                    </button>
                    <button  type="button" class="btn btn-danger  transparent-button text-danger bx-shadow-app btn-circle display-none animate__animated animate__fadeInDown"  
                             id="close_pro" onclick="close_form_pro()"
                        ><i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="col-lg-4 text-center">
                    <h3><i class="fas fa-cart-arrow-down mr-2 text-info"></i><?= $this->lang->line('title_product'); ?></h3>
                </div>
                <div class="col-lg-4 div-right">
                    <button  type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle " onclick="hablitar_prod()" id="btn_pro_hab"><i class="fas fa-eye"></i> </button>
                    <button  type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle " ><i class="fas fa-filter"></i></button>
                    <button  type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle " onclick="listProd()"><i class="fas fa-sync-alt"></i></button>
                    <button  type="button" class="btn btn-danger  transparent-button text-danger bx-shadow-app btn-circle animate__animated animate__fadeInUp display-none"  id="btn_prod_delete" onclick="view_delete_prod()"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
            
        </div>
    </div>
</div>
<div class="row">
    <div class="col-lg-12">
        <div class="div_form animate__animated animate__zoomIn display-none" id="div_form">
            <div class="row" >
                <div class="col-md-3">
                    <div class="form-group">
                        <label for=""><?= $this->lang->line('title_label_name'); ?> <small class="text-danger">*</small></label>
                        <input type="text" class="form-control bx-shadow-app form-control-sm " id="txt_pro_nombre" onkeyup="quitarClassError('txt_pro_nombre')">
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="form-group">
                        <label for=""><?= $this->lang->line('title_label_unidad'); ?> <small class="text-danger">*</small></label>
                        <!--<input type="text" class="form-control bx-shadow-app form-control-sm" id="txt_pro_med">-->
                        <select class="form-control bx-shadow-app form-control-sm" id="txt_pro_med" style="width:100%; height:25px !important;">
                            <option value="0">Seleccione</option>
                        </select>
                    </div>
                </div>
                <input type="hidden" id="idPro_text">
                <div class="col-md-2">
                    <div class="form-group">
                        <label for="" style="color:transparent;">Sigla</label><br>
                        <button type="button" class="btn btn-info btn-sm" onclick="guardar_prod()" id="btn-guardar-producto"><?= $this->lang->line('btn_save'); ?></button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>


<!-- tabla de datos -->
<div class="row">
    <div class="col-lg-12 table-mt">
        <table class="table table-sm table-hover table-bordered  table-app animate__animated animate__fadeIn" id="table-producto" style="width:100%">
            
            <thead > 
                <tr>
                    <th style="width:2% !important;"><input type="checkbox" id="che_pro_all" onchange="selectProdAll()"> </th>
                    <th style="width:50% !important;"><?= $this->lang->line('title_label_description'); ?></th>
                    <th style="width:20% !important;"><?= $this->lang->line('title_label_unidad'); ?></th>
                    <th style="width:20% !important;">Creado</th>
                    <th style="width:5% !important;">Acciones</th>
                </tr>
            </thead>
            <tbody id="tb_producto_table" class="table-app">
                
            </tbody>
        </table>
    </div>
</div>




<!-- Modal productos inhabilitados -->
<div class="modal fade" id="table-producto-modal" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Productos deshabilitados</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-sm table-hover table-bordered table-app " id="table_pro_hab">
                        <thead class="bg-info" style="color:#fff !important;">
                            <tr>
                                <th><input type="checkbox" id="chc_all_hab_prod" onclick="selectAllHabProd()"></th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody id="pro_haboff">
                            
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onclick="habilitar_prod_che()" id="btn_hab_produ">Aceptar</button>
      </div>
    </div>
  </div>
</div>


<!-- Modal de confirmaciòn -->
<div class="modal_app animate__animated animate__zoomIn display-none" id="question_prod">
    <div class="contenedor">
        <div class="contenido">
            <div class="icono_eyes">
                <div class="icon">
                    <!--<i class="fas fa-check"></i>-->
                    <i class="fas fa-exclamation"></i>
                </div>
            </div>
            <div class="question">
                <h5>Advertencia</h5>
                <span>¿Esta seguro de realizar esta acción?</span>
            </div>
            <div class="btn_options">
                <button type="button" class="btn_app_modal btn_color_light" onclick="closeQuestion()">>Cancelar</button>
                <button type="button" class="btn_app_modal btn_color_primary" Aceptar</button>
            </div>
        </div>
    </div>
</div>

<!-- modal check -->
<div class="modal_app animate__animated animate__zoomIn display-none" id="check_prod">
    <div class="contenedor">
        <div class="contenido">
            <div class="icono_eyes">
                <div class="icon_check">
                    <i class="fas fa-check color_check animate__animated animate__rotateIn"></i>
                </div>
            </div>
            <div class="question">
                <h5 id="title_message_prod">Información guardada</h5>
                <span>La acción se realizo con èxito</span>
            </div>
            <div class="btn_options_check">
                <button type="button" class="btn_app_modal btn_color_check" onclick="closeCheck()">Aceptar</button>
            </div>
        </div>
    </div>
</div>

<!-- modal delete -->
<div class="modal_app animate__animated animate__zoomIn display-none" id="delete_prod">
    <div class="contenedor">
        <div class="contenido">
            <div class="icono_eyes">
                <div class="icon_delete">
                    <i class="fas fa-trash-alt color_check animate__animated animate__rotateIn"></i>
                </div>
            </div>
            <div class="question">
                <h4>Eliminará</h4>
                <span>¿Esta seguro de eliminar lo seleecionado?</span>
            </div>
            <div class="btn_options">
                <button type="button" class="btn_app_modal btn_color_light" onclick="closeDelete()">Cancelar</button>
                <button type="button" class="btn_app_modal btn_color_primary" onclick="delete_prod()">Aceptar</button>
            </div>
        </div>
    </div>
</div>

<!-- modal error -->
<div class="modal_app animate__animated animate__zoomIn display-none" id="error_prod">
    <div class="contenedor">
        <div class="contenido">
            <div class="icono_eyes">
                <div class="icon_delete">
                    <i class="fas fa-times color_check animate__animated animate__rotateIn"></i>
                </div>
            </div>
            <div class="question">
                <h5>Ocurrio un error</h5>
                <span>Intente la acción nuevamente</span>
            </div>
            <div class="btn_options_check">
                <button type="button" class="btn_app_modal btn_color_check" onclick="closeError()">Aceptar</button>
            </div>
        </div>
    </div>
</div>

<!-- modal info -->
<div class="modal_app animate__animated animate__zoomIn display-none" id="info_prod">
    <div class="contenedor">
        <div class="contenido">
            <div class="icono_eyes">
                <div class="icon">
                    <i class="fas fa-info color_check animate__animated animate__rotateIn"></i>
                </div>
            </div>
            <div class="question">
                <h5>Información</h5>
                <span>Campos con caracter "*" son obligatorios</span>
            </div>
            <div class="btn_options_check">
                <button type="button" class="btn_app_modal btn_color_check" onclick="closeInfo()">Aceptar</button>
            </div>
        </div>
    </div>
</div>