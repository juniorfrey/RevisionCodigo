
<div class="row">
    <div class="col-lg-12">
        <div class="row animate__animated animate__fadeIn">
            <div class="col-md-2">
                <div class="form-group">
                    <label for="">Descripciòn</label>
                    <input type="text" class="form-control bx-shadow-app form-control-sm " id="txt_med_description" onkeyup="quitarClassError('txt_med_description')">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="">Sigla</label>
                    <input type="text" class="form-control bx-shadow-app form-control-sm" id="txt_med_sigla" onkeyup="quitarClassError('txt_med_sigla')">
                </div>
            </div>
            <input type="hidden" id="txt_med_id">
            <div class="col-md-2">
                <div class="form-group">
                    <label for="" style="color:transparent;">Sigla</label><br>
                    <button type="button" class="btn btn-info btn-sm" onclick="guardar_med()" id="btn-guardar-medida">Guardar</button>
                </div>
            </div>

            <div class="col-lg-6">
                <div class="form-group">
                    <div class="btns_options">
                        <a href="<?= base_url() ?>medidas/generar_excel"  class="btn btn-info pt-2 transparent-button text-info bx-shadow-app btn-circle" ><i class="fas fa-file-excel"></i> </a>
                        <button type="button" onclick="option_pdf()" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle"><i class="fas fa-file-pdf"></i> </button>
                        <button  type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle animate__animated animate__fadeInUp" 
                                 onclick="hablitar_med()" id="btn_habil_med"><i class="fas fa-eye"></i> </button>
                        <button  type="button" class="btn btn-info  transparent-button text-info bx-shadow-app btn-circle" onclick="list()"><i class="fas fa-sync-alt"></i></button>
                        <button  type="button" class="btn btn-danger  transparent-button text-danger bx-shadow-app btn-circle display-none animate__animated animate__fadeInUp" onclick="delete_med()" id="btn_delete_med"><i class="fas fa-trash-alt"></i></button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-12">
        <table class="table table-sm table-hover table-bordered table-app animate__animated animate__fadeIn" id="table-medida" style="width:100%">
            
            <thead > 
                <tr>
                    <th style="width:2% !important;"><input type="checkbox" id="che_med_all" onchange="selectAll()"> </th>
                    <th style="width:78% !important;">Descripciòn</th>
                    <th style="width:15% !important;">Sigla</th>
                    <th style="width:5% !important;">Acciones</th>
                </tr>
            </thead>
            <tbody id="tb_medidas_table" class="table-app">
                
            </tbody>
        </table>
    </div>
</div>


<!-- modales -->
<div class="modal fade" id="modal_medidas" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Medidas deshabiltadas</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="row">
                <div class="col-md-12">
                    <table class="table table-sm table-hover table-bordered table-app " id="table_med_hab">
                        <thead class="bg-info" style="color:#fff !important;">
                            <tr>
                                <th><input type="checkbox" id="chc_all_hab_med" onclick="selectAllHab()"></th>
                                <th>Descripciòn</th>
                            </tr>
                        </thead>
                        <tbody id="med_haboff">
                            <tr>
                                <td><input type="checkbox"></td>
                                <td>Ps</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary" onclick="habilitar_med_che()" id="btn_hab_med">Aceptar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal_medidas_pdf" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Seleccione una opcion</h5>
      </div>
      <div class="modal-body">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <div class="col-lg-6" style="text-align:center;">
                        <a href="<?= base_url() ?>medidas/ListOnMedidasPdf" 
                        target="_blank" title="ver Pdf" class="btn btn-info  transparent-button text-info bx-shadow-app border-transparent">
                            <i class="fas fa-eye fa-3x"></i><br> Ver PDF</a>
                        </div>
                        <div class="col-lg-6" style="text-align:center;">
                        <a href="<?= base_url() ?>medidas/dowloadPdf"  title="Descargar pdf" class="btn btn-info  transparent-button text-info bx-shadow-app border-transparent">
                        <i class="fas fa-file-download fa-3x"></i> <br>Descargar PDF</a>
                        </div>
                    </div>
                </div>
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-light" style="width:100%;" data-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>
