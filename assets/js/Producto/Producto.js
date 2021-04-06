function intitProd(){
    listProd();
    listProdHab();
    listCbx();
    //$('#txt_pro_med').select2({placeholder: 'Select an option'});
    
}


const new_product = () => {
    $("#div_form").removeClass('display-none');
    $("#div_form").addClass('animate__animated animate__fadeInDown');
    $("#new_pro").addClass('display-none');
    $("#close_pro").removeClass('display-none');
    $("#txt_pro_nombre").focus();
}

const close_form_pro = () => {
    $("#new_pro").removeClass('display-none ');
    $("#new_pro").addClass('animate__animated animate__fadeInDown');
    $("#close_pro").addClass('display-none');
    $("#div_form").addClass('display-none');
}


const guardar_prod = () => {
    
    var nombre         = $("#txt_pro_nombre").val();
    var unidadmedida   = $("#txt_pro_med").val();
    if(nombre.trim() === '' || unidadmedida.trim() === '0'){
        $("#info_prod").removeClass('display-none')
        $("#txt_pro_nombre").addClass('border-error');
        $("#txt_pro_med").addClass('border-error');
        $("#btn-guardar-producto").prop('disabled', true)
    }else{
        var data = {
            'nombre':nombre,
            'unidadmedida':unidadmedida
        }
        $.ajax({
            url:url+'productos/save',
            type:'POST',
            //dataType : 'json',
            data:data,
            beforeSend:function(){
                block();
            },
            success:function(response){

                if(response === '1' ){
                    //$("#info_prod").addClass('display-none');
                    $("#check_prod").removeClass('display-none')
                }else{
                    $("#error_prod").removeClass('display-none')
                }
                
                    
            },
            complete:function(){
                unBlock();
                listProd();
                listCbx();
                cleanInputsProd();
            }
            
        })
    }
}

const listProd = () => {
    var table = $('#table-producto').DataTable();
    table.destroy();
    var respuesta;
    $("#tb_producto_table").html('')
    $.ajax({
        url:url+'productos/list',
        type:'GET',
        dataType : 'json',
        success:function(response){
            if(response.length > 0){
                respuesta = response;
            }
        },
        complete:function(){
            $.each(respuesta,function(i,item){
                moment.locale('es');
                var date_ = moment(item.created).format('LL');
                var hours = moment(item.created).format('h:mm:A');
                $("#tb_producto_table").append(
                    '<tr class="row_prod">'+
                    '<td style="width:2%;" class="border-right"><input type="checkbox" class="check_prod text-info" id="checkProd_'+item.idpro+'" val="'+item.idpro+'" onchange="validarCheckProdListDelete()"></td>'+
                    '<td style="width:50%;" class="border-right">'+item.nombre.toUpperCase()+'</td>'+
                    '<td style="width:20%;" class="border-right">'+item.descripcion+'</td>'+
                    '<td style="width:20%;" class="border-right"><b>'+date_+'</b> <br> <span class="text-info">'+hours+'</span></td>'+
                    '<td style="width:5%;" class="border-right"><center><button class="btn btn-primary btn-sm btn-transparent border-transparent" onclick="paramProd(`'+item.idmed+'`,`'+item.nombre+'`,`'+item.idpro+'`)" ><i class="fas fa-edit text-info-app font-weight-bold"></i></button></center></td>'+
                    '</tr>'
                )
            });
            $("#table-producto").DataTable({
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
                },
                "ordering": true
            });
        }
    })
}

const listProdHab = () => {
    var table = $('#table_pro_hab').DataTable();
    table.destroy();
    var respuesta;
    $("#pro_haboff").html('')
    $.ajax({
        url:url+'productos/listoff',
        type:'GET',
        dataType : 'json',
        success:function(response){
            if(response.length > 0){
                respuesta = response;
                //btn_prod_hab
                $("#btn_pro_hab").removeClass('display-none');
            }else{
                $("#btn_pro_hab").addClass('display-none');
            }
        },
        complete:function(){
            $.each(respuesta,function(i,item){
                $("#pro_haboff").append(
                    '<tr class="row_prod_hab">'+
                    '<td style="width:2%;" class="border-right"><input type="checkbox" class="check_prod_hab text-info" id="checkProdhab_'+item.idpro+'" val="'+item.idpro+'" onchange="validarCheckProdListDelete()"></td>'+
                    '<td style="width:50%;" class="border-right">'+item.nombre.toUpperCase()+'</td>'+
                    '</tr>'
                )
            });
            $("#table_pro_hab").DataTable({
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
                },
                "ordering": true
            });
        }
    })
}

const selectAllHabProd = () => {
    if($("#chc_all_hab_prod").is(':checked')){
        $(".row_prod_hab input[type=checkbox]").each(function(){
            $(".check_prod_hab").prop('checked',true);
        })
        //validarCheckHab();
    }else{
        $(".row_prod_hab input[type=checkbox]:checked").each(function(){
            $(".check_prod_hab").prop('checked',false);
        })
        //validarCheckHab();
    }
}


const habilitar_prod_che = () =>{
    var idSelecthabProd = [];
      
      $(".row_prod_hab input[type=checkbox]:checked").each(function(){
        var idVal = $(this).attr('val');
        idSelecthabProd.push({'id':idVal});
      });

      if(idSelecthabProd.length > 0){
        $("#table-producto-modal").modal('hide');
            var data = {'data':idSelecthabProd}
                $.ajax({
                    url:url+'productos/habilitar',
                    type:'POST',
                    //dataType : 'json',
                    data:data,
                    beforeSend:function(){
                        block();
                        if(idSelecthabProd.length == 1){
                            $("#title_message_prod").text('Producto Habilitado');
                        }else{
                            $("#title_message_prod").text('Productos Habilitados');
                        }
                    },
                    success:function(response){
                        response === '1'
                        ? $("#check_prod").removeClass('display-none')
                        : $("#error_prod").removeClass('display-none')
                    },complete:function(){
                        unBlock();
                        listProd();
                        listProdHab();
                        $("#chc_all_hab_prod").prop('checked',false);
                    }
                })



    }else{

        //swal("Error", "Debe seleccionar al menos 1 item para poder habiltar", "error")
    }
}


const paramProd = (idmed,nombre,idpro) => {
    $("#txt_pro_med").val(idmed).trigger('change');
    $("#txt_pro_nombre").val(nombre);
    $("#idPro_text").val(idpro);
    $("#div_form").removeClass('display-none');
    $("#div_form").addClass('animate__animated animate__fadeInDown');
    $("#new_pro").addClass('display-none');
    $("#close_pro").removeClass('display-none');
    $("#btn-guardar-producto").attr('onclick','updateProd()')
}

const updateProd = () => {
    var nombre         = $("#txt_pro_nombre").val();
    var unidadmedida   = $("#txt_pro_med").val();
    var id             = $("#idPro_text").val();
    if(nombre.trim() === '' || unidadmedida.trim() === '0'){
        $("#info_prod").removeClass('display-none')
        $("#txt_pro_nombre").addClass('border-error');
        $("#txt_pro_med").addClass('border-error');
        $("#btn-guardar-producto").prop('disabled', true)
    }else{
        var data = {
            'nombre':nombre,
            'unidadmedida':unidadmedida,
            'id' :id
        }
        $.ajax({
            url:url+'productos/update',
            type:'POST',
            //dataType : 'json',
            data:data,
            beforeSend:function(){
                block();
            },
            success:function(response){

                if(response === '1' ){
                    //$("#info_prod").addClass('display-none');
                    $("#check_prod").removeClass('display-none')
                }else{
                    $("#error_prod").removeClass('display-none')
                }
                
                    
            },
            complete:function(){
                unBlock();
                listProd();
                listCbx();
                cleanInputsProd();
            }
            
        })

    }
}

const view_delete_prod = () => {
    var idSelect = [];
    $(".row_prod input[type=checkbox]:checked").each(function(){
        var idVal = $(this).attr('val');
        idSelect.push({'id':idVal});
    })
    if(idSelect.length > 0){
        $("#delete_prod").removeClass('display-none');
    }else{
        swal("Error", "Debe seleccionar al menos un item para realizar esta acciòn", "error")
    }
}

const delete_prod = () => {
    $("#delete_prod").addClass('display-none');
    var idSelectPro = [];
    $(".row_prod input[type=checkbox]:checked").each(function(){
        var idVal = $(this).attr('val');
        idSelectPro.push({'id':idVal});
    })
    var data = {'data':idSelectPro}
    $.ajax({
        url:url+'productos/delete',
        type:'POST',
        //dataType : 'json',
        data:data,
        beforeSend:function(){
            block();
            if(idSelectPro.length == 1){
                $("#title_message_prod").text('Producto eliminado');
            }else{
                $("#title_message_prod").text('Productos eliminados');
            }
            
        },
        success:function(response){
            response === '1' 
            ? $("#check_prod").removeClass('display-none')
            : $("#error_prod").removeClass('display-none')
        },complete:function(){
            unBlock();
            listProd();
            listProdHab();
            validarCheckProdListDelete();
        }
    })
    
}

const hablitar_prod = () => {
    $("#table-producto-modal").modal('show')
}

const selectProdAll = () => {

    if($("#che_pro_all").is(':checked')){
        $(".row_prod input[type=checkbox]").each(function(){
            $(".check_prod").prop('checked',true);
            validarCheckProdListDelete();
        })
    }else{
        $(".row_prod input[type=checkbox]:checked").each(function(){
            $(".check_prod").prop('checked',false);
            validarCheckProdListDelete();
        })
    }

}

const validarCheckProdListDelete = () => {
    var cont = 0;
    $(".row_prod input[type=checkbox]:checked").each(function(){
        cont++;
    });
    if(cont >= 1){
        $("#btn_prod_delete").removeClass('display-none');
    }else{
        cont = 0;
        $("#btn_prod_delete").addClass('display-none');
    }
}

const listCbx = () => {
    $("#txt_pro_med").html('')
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
            $("#txt_pro_med").append(
            '<option value="0">Seleccione</option>'
            )

            $.each(respuesta,function(i,item){
                $("#txt_pro_med").append(
                    '<option value="'+item.id+'">'+item.descripcion+'</option>'
                )
            });
            $('#txt_pro_med').select2({
                placeholder: 'Select an option',
                height:'20px'
            });
        }
    })
}


const cleanInputsProd = () => {
    $("#txt_pro_nombre").val('');
    $("#txt_pro_nombre").focus();
    $("#txt_pro_med").val('0');
    $("#btn-guardar-producto").attr('onclick', 'guardar_prod()')
}


// Funciones modales
const closeCheck = () =>{
    $("#check_prod").addClass('display-none');
    $("#btn-guardar-producto").prop('disabled', false);
}

const closeInfo = () =>{
    $("#info_prod").addClass('display-none');
    $("#btn-guardar-producto").prop('disabled', false);
}

const closeQuestion = () =>{
    $("#question_prod").addClass('display-none');
    $("#btn-guardar-producto").prop('disabled', false);
}

const closeDelete = () =>{
    $("#delete_prod").addClass('display-none');
    $("#btn-guardar-producto").prop('disabled', false);
    $(".row_prod input[type=checkbox]").each(function(){
        $(".check_prod").prop('checked',false);
        validarCheckProdListDelete();
    })
}


const closeError = () =>{
    $("#error_prod").addClass('display-none');
    $("#btn-guardar-producto").prop('disabled', false);
}


/*
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
 */