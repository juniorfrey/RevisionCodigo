$(document).ready(function(){
    
})

function inti(){
    list();
    listOff();
    $("#txt_med_description").focus();
    $("#btn_hab_med").prop('disabled', true);
}

const guardar_med = () => {
    
    var descripcion     = $("#txt_med_description").val();
    var sigla           = $("#txt_med_sigla").val();

    if(descripcion.trim() === '' || sigla.trim() === ''){
        swal("Advertencia", "Los campos son obligatorios", "warning");
        $("#txt_med_description").addClass('border-error');
        $("#txt_med_sigla").addClass('border-error');
        $("#btn-guardar-medida").prop('disabled', true)
    }else{
        var data = {
            'descripcion':descripcion,
            'sigla':sigla
        }
        $.ajax({
            url:url+'medidas/save',
            type:'POST',
            //dataType : 'json',
            data:data,
            beforeSend:function(){
                block();
            },
            success:function(response){
                response === '1' 
                    ? swal("exito", "Se registro con èxito", "success") 
                    : swal("Warning", "Ocurrio un error, verifique la con administrador del sistema", "error")
                
                    cleanInputs();
                    
            },
            complete:function(){
                unBlock();
                list();
            }
            
        })
    }
}

const list = () => {
    var table = $('#table-medida').DataTable();
    table.destroy();
    var respuesta;
    $("#tb_medidas_table").html('')
    $.ajax({
        url:url+'medidas/list',
        type:'GET',
        dataType : 'json',
        success:function(response){
            if(response.length > 0){
                respuesta = response;
            }
        },
        complete:function(){
            $.each(respuesta,function(i,item){
                $("#tb_medidas_table").append(
                    '<tr class="row_med">'+
                    '<td style="width:2%;" class="border-right"><input type="checkbox" class="check text-info" id="check_'+item.id+'" val="'+item.id+'" onchange="validarCheckListDelete()"></td>'+
                    '<td style="width:78%;" class="border-right">'+item.descripcion+'</td>'+
                    '<td style="width:15%;" class="border-right">'+item.sigla+'</td>'+
                    '<td style="width:5%;" class="border-right"><center><button class="btn btn-primary btn-sm btn-transparent border-transparent" onclick="param(`'+item.descripcion+'`,`'+item.sigla+'`,`'+item.id+'`)" ><i class="fas fa-edit text-info-app font-weight-bold"></i></button></center></td>'+
                    '</tr>'
                )
            });
            $("#table-medida").DataTable({
                language:{
                    "processing": "Procesando...",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "zeroRecords": "No se encontraron resultados",
                    "emptyTable": "Ningún dato disponible en esta tabla",
                    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "search": "Buscar:",
                    "infoThousands": ",",
                    "loadingRecords": "Cargando...",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "<i class='fas fa-chevron-right'></i>",
                        "previous": "<i class='fas fa-chevron-left'></i>"
                    }
                }
            });
        }
    })
}

const listOff = () => {
    var table = $('#table_med_hab').DataTable();
    table.destroy();
    var respuesta;
    $("#med_haboff").html('')
    $.ajax({
        url:url+'medidas/listOff',
        type:'GET',
        dataType : 'json',
        success:function(response){
            if(response.length > 0){
                respuesta = response;
                $("#btn_habil_med").removeClass('display-none');
            }else{
                $("#btn_habil_med").addClass('display-none');
            }
        },
        complete:function(){
            $.each(respuesta,function(i,item){
                $("#med_haboff").append(
                    '<tr class="row_med_hab">'+
                    '<td style="width:2%;"><input type="checkbox" class="check_hab" val="'+item.id+'" onclick="validarCheckHab()"></td>'+
                    '<td style="width:78%;">'+item.descripcion+'</td>'+
                    '</tr>'
                )
            });
            $("#table_med_hab").DataTable({
                language:{
                    "processing": "Procesando...",
                    "lengthMenu": "Mostrar _MENU_ registros",
                    "zeroRecords": "No se encontraron resultados",
                    "emptyTable": "Ningún dato disponible en esta tabla",
                    "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "infoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "search": "Buscar:",
                    "infoThousands": ",",
                    "loadingRecords": "Cargando...",
                    "paginate": {
                        "first": "Primero",
                        "last": "Último",
                        "next": "<i class='fas fa-chevron-right'></i>",
                        "previous": "<i class='fas fa-chevron-left'></i>"
                    }
                }
            });
        }
    })
}

const selectAll = () => {

    if($("#che_med_all").is(':checked')){
        $(".row_med input[type=checkbox]").each(function(){
            $(".check").prop('checked',true);
            validarCheckListDelete();
        })
    }else{
        $(".row_med input[type=checkbox]:checked").each(function(){
            $(".check").prop('checked',false);
            validarCheckListDelete();
        })
    }

}

const delete_med = () => {
    idSelect = [];
    $(".row_med input[type=checkbox]:checked").each(function(){
        var id = $(this).attr('id');
        var idVal = $(this).attr('val');
        idSelect.push({'id':idVal});
    })
    if(idSelect.length > 0){
        swal({
            title: "",
            text: "¿Esta seguro de eliminar las medidas seleecionadas?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function(isConfirm) {
            if (isConfirm) {
                var data = {'data':idSelect}
                $.ajax({
                    url:url+'medidas/delete',
                    type:'POST',
                    //dataType : 'json',
                    data:data,
                    beforeSend:function(){
                        block();
                    },
                    success:function(response){
                        if(idSelect.length == 1){
                            response === '1' 
                            ? swal("exito", "Se elimino la medida con èxito", "success") 
                            : swal("Warning", "Ocurrio un error, verifique la con administrador del sistema", "error")
                        }else{
                            response === '1' 
                            ? swal("exito", "Se eliminaron las medidas con èxito", "success") 
                            : swal("Warning", "Ocurrio un error, verifique la con administrador del sistema", "error")
                        }
                    },complete:function(){
                        unBlock();
                        list();
                        listOff();
                        validarCheckListDelete();
                    }
                })
                
            } else {
                
            }
          });       
    }else{
        swal("Error", "Debe seleccionar al menos un item para realizar esta acciòn", "error")
    }
}

const param = (descripcion, sigla, id) => {
    $("#txt_med_description").val(descripcion);
    $("#txt_med_sigla").val(sigla);
    $("#txt_med_id").val(id);
    $("#btn-guardar-medida").attr('onclick', 'updated_medida()');
    $("#btn-guardar-medida").prop('disabled', false)
}

const cleanInputs = () => {
    $("#txt_med_description").val('');
    $("#txt_med_description").focus();
    $("#txt_med_sigla").val('');
    $("#btn-guardar-medida").attr('onclick', 'guardar_med()')
}

const updated_medida = () => {
    var descripcion     = $("#txt_med_description").val();
    var sigla           = $("#txt_med_sigla").val();
    var id              = $("#txt_med_id").val();

    if(descripcion.trim() === '' || sigla.trim() === ''){
        swal("Advertencia", "Los campos son obligatorios", "warning");
        $("#txt_med_description").addClass('border-error');
        $("#txt_med_sigla").addClass('border-error');
        $("#btn-guardar-medida").prop('disabled', true)
    }else{
        var data = {
            'descripcion':descripcion,
            'sigla':sigla,
            'id':id
        }
        $.ajax({
            url:url+'medidas/update',
            type:'POST',
            //dataType : 'json',
            data:data,
            beforeSend:function(){
                block();
            },
            success:function(response){
                response === '1' 
                    ? swal("exito", "Se actualizo con èxito", "success") 
                    : swal("Warning", "Ocurrio un error, verifique la con administrador del sistema", "error")
                
                    cleanInputs();
                    
            },
            complete:function(){
                unBlock();
                list();
            }
            
        })
    }
}

const quitarClassError = (id) => {
    
    var text = $("#"+id+"").val();
    if(text === ''){
        $("#"+id+"").addClass('border-error');
        $("#btn-guardar-medida").prop('disabled', true)
    }else{
        $("#"+id+"").removeClass('border-error');
        $("#btn-guardar-medida").prop('disabled', false)
    }
}

const hablitar_med = () => {
    $("#modal_medidas").modal('show')
}

const habilitar_med_che = () =>{
    var idSelecthab = [];
      
      $(".row_med_hab input[type=checkbox]:checked").each(function(){
        var idVal = $(this).attr('val');
        idSelecthab.push({'id':idVal});
      });

      if(idSelecthab.length > 0){
        $("#modal_medidas").modal('hide')
        swal({
            title: "",
            text: "¿Esta seguro de habilitar las medidas seleecionadas?",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-success",
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
          },
          function(isConfirm) {
            if (isConfirm) {
                var data = {'data':idSelecthab}
                $.ajax({
                    url:url+'medidas/habilitar',
                    type:'POST',
                    //dataType : 'json',
                    data:data,
                    beforeSend:function(){
                        block();
                    },
                    success:function(response){
                        if(idSelecthab.length == 1){
                            response === '1' 
                            ? swal("exito", "Se habilito la medida con èxito", "success") 
                            : swal("Warning", "Ocurrio un error, verifique la con administrador del sistema", "error")
                        }else{
                            response === '1' 
                            ? swal("exito", "Se habilitaron las medidas con èxito", "success") 
                            : swal("Warning", "Ocurrio un error, verifique la con administrador del sistema", "error")
                        }
                    },complete:function(){
                        unBlock();
                        list();
                        listOff();
                        $("#chc_all_hab_med").prop('checked',false);
                        $("#btn_hab_med").prop('disabled', true);
                    }
                })
            } else {
                $("#modal_medidas").modal('show')
            }
          });
    }else{
        swal("Error", "Debe seleccionar al menos 1 item para poder habiltar", "error")
    }
}

const validarCheckHab = () => {
    var cont = 0;
    $(".row_med_hab input[type=checkbox]:checked").each(function(){
        cont++;
    });
    if(cont >= 1){
        $("#btn_hab_med").prop('disabled', false);
    }else{
        cont = 0;
        $("#btn_hab_med").prop('disabled', true);
    }
}

const validarCheckListDelete = () => {
    var cont = 0;
    $(".row_med input[type=checkbox]:checked").each(function(){
        cont++;
    });
    if(cont >= 1){
        $("#btn_delete_med").removeClass('display-none');
    }else{
        cont = 0;
        $("#btn_delete_med").addClass('display-none');
    }
}



const selectAllHab = () => {
    if($("#chc_all_hab_med").is(':checked')){
        $(".row_med_hab input[type=checkbox]").each(function(){
            $(".check_hab").prop('checked',true);
        })
        validarCheckHab();
    }else{
        $(".row_med_hab input[type=checkbox]:checked").each(function(){
            $(".check_hab").prop('checked',false);
        })
        validarCheckHab();
    }
}

const option_pdf = () => {
    $("#modal_medidas_pdf").modal('show')
}

    