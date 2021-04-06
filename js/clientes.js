const urlraiz = 'https://pruebanuvola.herokuapp.com/';
//const urlraiz = 'http://localhost/cliente-nuvola/';

// variables globales
var swValidacion = 0;
var swValidacionEmail = '';

const InciarFormulario = () => {
    $("#idvalordia").prop('disabled',true);
    $("#idvalorser").prop('disabled',true);
    $("#idcantdia").prop('disabled',true);
}

$("#btn-cliente-add").click(function(){
    formClear();
    $("#modal_sede").modal('show')
    $("#btn-guardar").attr('onclick','agregarCliente()');
    $("#namebtn").text('Agregar nuevo cliente');
    //$("#divClientes").show()
});


// Mensaje de exito ----------------------------------
const messageExit = (mensaje) => {
    $.toast({
        heading:'éxito',
        text: ''+mensaje+'',
        showHideTransition: 'plain',
        icon: 'success',
        position:'top-center',
        hideAfter: 3000
    });
}
// -----------------------------------------------------


InciarFormulario();

const  agregarCliente = () => {
    //var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const expr = /\w+@\w+\.+[a-z]/;

    // datos del cliente
     const ididentificacion     = $("#ididentificacion").val();
     const idnombre             = $("#idnombre").val();
     const idapellido           = $("#idapellido").val();
     const iddireccion          = $("#iddireccion").val();
     const idemail              = $("#idemail").val();
     const idcelular            = $("#idcelular").val();
     const idtelefono           = $("#idtelefono").val();
     const idfechanac           = $("#idfechanac").val();
     
     // datos del servicio
     const idhabitacion          = $("#idhabitacion").val();
     const idvalordia            = $("#idvalordia").val();
     const idcantdia             = $("#idcantdia").val();
     const idvalorser            = $("#idvalorser").val();
     const idmanerapago          = $("#idmanerapago").val();

     // validacion de campos vacios
     if(ididentificacion.trim() === '' || idnombre.trim() === '' || idapellido.trim() === ''
        || iddireccion.trim() === '' || idcelular.trim() === '' || idemail.trim() === '' || idfechanac.trim() === '' || idhabitacion.trim() === '0' 
        || idcantdia.trim() === '' || idmanerapago.trim() === '0' ){
         $.toast({
             heading: 'Advertencia',
             text: 'Los campos con (*) son obligatorios que debe llenar',
             showHideTransition: 'plain',
             icon: 'warning',
             position:'top-center',
             hideAfter: 6000
         });
         return false;
     }else if(isNaN(ididentificacion)){
        $.toast({
            heading: 'Error',
            text: 'Campo (Identificación) solo acepta numeros',
            showHideTransition: 'plain',
            icon: 'error',
            position:'top-center',
            hideAfter: 6000
        });
        return false;
     }else if(isNaN(idcelular)){
        $.toast({
            heading: 'Error',
            text: 'Campo (Celular) solo acepta numeros',
            showHideTransition: 'plain',
            icon: 'error',
            position:'top-center',
            hideAfter: 6000
        });
        return false;
     }else if(isNaN(idtelefono)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Telfono) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
        
        return false;
     }else if(!expr.test(idemail)){
            $.toast({
                heading: 'Error',
                text: 'El E-mail ingresado no es valido,ingrese uno nuevamente',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
        
        return false;
     }else if(isNaN(idcantdia)){
        $.toast({
            heading: 'Error',
            text: 'Campo (Cantidad de dias) solo acepta numeros',
            showHideTransition: 'plain',
            icon: 'error',
            position:'top-center',
            hideAfter: 6000
        });
        return false;
     }else{
        $("#modal_sede").modal('hide');
        // ejecutamos la peticion ajax
        $.ajax({
            url: urlraiz+'home/postAgregarCliente',
            type:'POST',
            dataType : 'json',
            beforeSend:function(){
                block('Se esta guardando la información');
            },
            data:{
                'ididentificacion':ididentificacion,
                'idnombre':idnombre,
                'idapellido':idapellido,
                'iddireccion':iddireccion,
                'idemail':idemail,
                'idcelular':idcelular,
                'idtelefono':idtelefono,
                'idfechanac':idfechanac,
                'idhabitacion':idhabitacion,
                'idvalordia':idvalordia,
                'idcantdia':idcantdia,
                'idvalorser':idvalorser,
                'idmanerapago':idmanerapago
            },
            success:function(res){
                if (res === 1){
                    messageExit('La información se registro con éxito');
                }
            },
            complete:function(){
                //unBlock();
                formClear();
                getClientes();
            }
        })
        


     }
    

}


const GetServicios = () => {
    
    $.ajax({
        url: urlraiz+'servicio/GetServicios',
        type:'GET',
        dataType : 'json',
        success:function(res){
            if(res.length > 0){
                $.each(res,function(i,item){
                    $("#idhabitacion").append(
                        '<option value="'+item.cp_id+'">'+item.cp_nombre+'</option>'
                    )
                })
            }
        }
    })

}

GetServicios();

const getManerPago =  () => {
    $.ajax({
        url: urlraiz+'manera_pagos/getManerPago',
        type:'GET',
        dataType : 'json',
        success:function(res){
            if(res.length > 0){
                $.each(res,function(i,item){
                    $("#idmanerapago").append(
                        '<option value="'+item.cp_id+'">'+item.cp_nombre+'</option>'
                    )
                })
            }
        }
    })
}

getManerPago();

 var datatable = (id)=>{
    $('#tbody').DataTable({
        language: {
            processing:     "Procesando...",
            search:         "Buscar&nbsp;:",
            lengthMenu:    "Mostrar _MENU_ registros",
            info:           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty:      "Mostrando registros del 0 al 0 de un total de 0 registros",
            infoFiltered:   "filtrado de un total de _MAX_ registros)",
            infoPostFix:    "",
            loadingRecords: "Cargando...",
            zeroRecords:    "No se encontraron resultados",
            emptyTable:     "Ningún dato disponible en esta tabla",
            paginate: {
                sFirst:    "Primero",
                sLast:     "Último",
                sNext:     "Siguiente",
                sPrevious: "Anterior"
            },
            aria: {
                sortAscending:  ": activer pour trier la colonne par ordre croissant",
                sortDescending: ": activer pour trier la colonne par ordre décroissant"
            }
        },
        responsive: true
    });
}


const getClientes = () => {
    $("#tbody").DataTable().destroy();
    var cont = 0;
    $.ajax({
        url: urlraiz+'home/getClientesList',
        type:'GET',
        dataType : 'json',
        beforeSend:function(){
            block('Se esta actualizando la información');
        },
        success:function(res){
            $("#idtbcliente").html('')
            if(res.length > 0){
                $.each(res,function(i,item){
                    cont++;
                    $("#idtbcliente").append(
                        '<tr>'+
                            '<td> </td>'+
                            '<td >'+item.cp_identificacion +'</td>'+
                            '<td >'+item.nomcliente +' '+item.apllcliente+'</td>'+
                            '<td>'+item.cp_direccion+'</td>'+
                            '<td>'+item.cp_ncelular+' - '+item.cp_ntelefono+'</td>'+
                            '<td>'+
                                '<button type="button" class="btn btn-primary btn-sm mr-2" '+
                                'onclick="getParam(\''+item.cp_identificacion+'\', \''+item.nomcliente+'\', \''+item.apllcliente+'\',\''+item.cp_direccion+'\', '+
                                '\''+item.cp_ncelular+'\', \''+item.cp_ntelefono+'\', \''+item.cp_email+'\', \''+item.fehcanac+'\', '+
                                '\''+item.idtipohabitacion+'\',\''+item.valorhab+'\', \''+item.cp_cantidaddia+'\',\''+item.cp_valorservicio+'\',\''+item.idmanerapago+'\', \''+item.idcliente+'\', \''+item.idservicio+'\')" title="Editar">'+
                                '<i class="icon ion-md-create"></i></button>'+
                                '<button type="button" class="btn btn-danger btn-sm mr" onclick="postEliminarCliente(\''+item.idcliente+'\', \''+item.idservicio+'\')" title="Eliminar"><i class="icon ion-md-trash"></i></button>'+
                            '</td>'+
                            '<td>'+item.cp_email+'</td>'+
                        '</tr>'
                    )
                })
                datatable();
            }
        },
        complete:function(){
            unBlock()
        }
    })

}

getClientes();

function verInfoCliente(idcliente, idclient) {
    //$("#divservices").html('')
    // consultarServicios
    $("#modal_info").modal('show');
    $("#idclienteform").val(idcliente);
    var cont = 0;
    $.ajax({
        url: urlraiz+'home/consultarServicios',
        type:'POST',
        dataType : 'json',
        data:{
            'identificacion':idcliente
        },
        success:function(res){
            
            if(res.length > 0){
                $.each(res,function(i,item){
                    cont++;
                    $("#divservices").append(
                        '<div class="col-lg-12 bg-primary">'+
							'<label class="font-weight-bold text-color-lime">Servicio: '+cont+' </label>'+
                        '</div>'+
                        '<div class="col-lg-12">'+
							'<label class="font-weight-bold">Clase de habitación: </label>'+
							'<label class="text-color-lime">'+item.nomhab+'</label>'+
                        '</div>'+
                        '<div class="col-lg-6">'+
							'<label class="font-weight-bold">Valor de habitación: </label>'+
							'<label class="text-color-lime">'+item.valorhab+'</label>'+
                        '</div>'+
                        '<div class="col-lg-6">'+
							'<label class="font-weight-bold">Estadia: </label>'+
							'<label class="text-color-lime">'+item.cp_cantidaddia+'</label>'+
                        '</div>'+
                        '<div class="col-lg-12">'+
							'<label class="font-weight-bold">Fecha y hora del servicio: </label>'+
							'<label class="text-color-lime">'+item.cp_fechacreacion+'</label>'+
                        '</div>'+
                        '<div class="col-lg-12">'+
							'<label class="font-weight-bold">Manera de  pago: </label>'+
							'<label class="text-color-lime">'+item.nombremp+'</label>'+
                        '</div>'+
                        '<div class="col-lg-12">'+
							'<label class="font-weight-bold">Valor de servicio:</label>'+
                            '<label class="text-color-lime">'+item.cp_valorservicio+'</label>'+
						'</div>'
                    )
                })
            }
        }
    })

}

function getParam(identificacion,nombre,apellido, direccion, celular, telefono,email,fechanacimiento,
        tipohabitacion, valor,cantidadias,valorservicio,manerapago, idcliente,idservicio){
           
            $("#ididentificacion").val(identificacion);
            swValidacion = identificacion;
            $("#idnombre").val(nombre);
            $("#idapellido").val(apellido);
            $("#iddireccion").val(direccion);
            $("#idemail").val(email);
            swValidacionEmail = email;
            $("#idcelular").val(celular);
            $("#idtelefono").val(telefono);
            //document.getElementById("idfechanac").value = fechanacimiento;
            $("#idfechanac").val(fechanacimiento);
            
            // datos del servicio
            $("#idhabitacion").val(tipohabitacion);
            $("#idvalordia").val(valor);
            $("#idcantdia").val(cantidadias);
            $("#idvalorser").val(valorservicio);
            $("#idmanerapago").val(manerapago);
            
            $("#idclienteform").val(idcliente);
            $("#idservicioForm").val(idservicio);


            $("#btn-guardar").attr('onclick','actualizarCliente()');
            $("#namebtn").text('Guardar');
            $("#idcantdia").prop('disabled',false);
            //$("#divClientes").show();
            $("#modal_sede").modal('show');

}

const actualizarCliente = () => {
     //var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     const expr = /\w+@\w+\.+[a-z]/;

     // datos del cliente
      const ididentificacion     = $("#ididentificacion").val();
      const idnombre             = $("#idnombre").val();
      const idapellido           = $("#idapellido").val();
      const iddireccion          = $("#iddireccion").val();
      const idemail              = $("#idemail").val();
      const idcelular            = $("#idcelular").val();
      const idtelefono           = $("#idtelefono").val();
      const idfechanac           = $("#idfechanac").val();
      
      // datos del servicio
      const idhabitacion          = $("#idhabitacion").val();
      const idvalordia            = $("#idvalordia").val();
      const idcantdia             = $("#idcantdia").val();
      const idvalorser            = $("#idvalorser").val();
      const idmanerapago          = $("#idmanerapago").val();

      const idclienteform          = $("#idclienteform").val();
      const idservicioForm         = $("#idservicioForm").val();
 

    // validacion de campos vacios
      if(ididentificacion.trim() === '' || idnombre.trim() === '' || idapellido.trim() === ''
        || iddireccion.trim() === '' || idcelular.trim() === '' || idemail.trim() === '' || idfechanac.trim() === '' || idhabitacion.trim() === '0' 
        || idcantdia.trim() === '' || idmanerapago.trim() === '0' ){

            $.toast({
                heading: 'Advertencia',
                text: 'Los campos con (*) son obligatorios que debe llenar',
                showHideTransition: 'plain',
                icon: 'warning',
                position:'top-center',
                hideAfter: 6000
            });
            return false;

        }else if(isNaN(ididentificacion)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Identificación) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
            return false;
        }else if(isNaN(idcelular)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Celular) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
            return false;
        }else if(isNaN(idtelefono)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Telfono) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
        
            return false;
        }else if(!expr.test(idemail)){
            $.toast({
                heading: 'Error',
                text: 'El E-mail ingresado no es valido,ingrese uno nuevamente',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
        
        return false;
        }else if(isNaN(idcantdia)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Cantidad de dias) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
            });
            return false;
        }else{

            $("#modal_sede").modal('hide');
            // ejecutamos la peticion ajax
            $.ajax({
                url: urlraiz+'home/actualizarCliente',
                type:'POST',
                dataType : 'json',
                beforeSend:function(){
                    block('Se esta guardando la información');
                },
                data:{
                    'ididentificacion':ididentificacion,
                    'idnombre':idnombre,
                    'idapellido':idapellido,
                    'iddireccion':iddireccion,
                    'idemail':idemail,
                    'idcelular':idcelular,
                    'idtelefono':idtelefono,
                    'idfechanac':idfechanac,
                    'idhabitacion':idhabitacion,
                    'idvalordia':idvalordia,
                    'idcantdia':idcantdia,
                    'idvalorser':idvalorser,
                    'idmanerapago':idmanerapago,
                    'idclienteform':idclienteform,
                    'idservicioForm':idservicioForm
                },
                success:function(res){
                    if (res === 1){
                        messageExit('La información se registro con éxito');
                        getClientes();
                    }
                },
                complete:function(){
                    formClear();
                    //unBlock();
                }
            })

      }    
}

const formClear = () => {
    $("#ididentificacion").val('');
    $("#idnombre").val('');
    $("#idapellido").val('');
    $("#iddireccion").val('');
    $("#idemail").val('');
    $("#idcelular").val('');
    $("#idtelefono").val('');
    $("#idfechanac").val('');
    
    // datos del servicio
    $("#idhabitacion").val('0');
    $("#idvalordia").val('');
    $("#idcantdia").val('');
    $("#idvalorser").val('');
    $("#idmanerapago").val('0');

    $("#idclienteform").val('');
    $("#idservicioForm").val('');
    $("#btn-guardar").prop('disabled',false);
    $("#idcantdia").prop('disabled',true);
}

const postValorHabitacion = () => {
    const ifhabitacion = $("#idhabitacion").val();
    
    if(ifhabitacion !== "0"){
        $("#modal_sede").modal('hide');
        $.ajax({
            beforeSend:function(){
                block('consultando el valor de la habitación');
            },
            url: urlraiz+'home/postValorHabitacion',
            type:'POST',
            dataType : 'json',
            data:{
                'idhabitacion':ifhabitacion
            },
            success:function(res){
                $("#idvalordia").val(res[0]['cp_valor']);
                $("#idcantdia").prop('disabled',false);
                $("#idcantdia").focus();
            },
            complete:function(){
                onchangeCalcularValorTotal();
                unBlock();
                $("#modal_sede").modal('show');

            }
        })
    }
}

const onchangeCalcularValorTotal = (e) => {
    const ifhabitacion = $("#idhabitacion").val();
    
    if(ifhabitacion !== "0") {
        const valordia = $("#idvalordia").val();
        const numerodia = $("#idcantdia").val();
        const resultado = numerodia * valordia;
        $("#idvalorser").val(resultado);
    }
}

const postEliminarCliente = (idcliente, idservicio) => {
    var respuesta = '';

    swal({
        title: "",
        text: "¿Desea eliminar este cliente?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: true,
        closeOnCancel: true
      },
      function(isConfirm) {
        if (isConfirm) {
            $.ajax({
                beforeSend:function(){
                    block('Se esta eliminando la información');
                },
                url: urlraiz+'home/postEliminarCliente',
                type:'POST',
                dataType : 'json',
                data:{
                    'idcliente':idcliente,
                    'idservicio':idservicio
                },
                success:function(res){
                    respuesta = res;                    
                },
                complete:function(){
                    if(respuesta == "1"){
                        messageExit('El cliente se elimino se éxito');                    
                        getClientes();
                    }
                    //unBlock();
                } 
            })
        }
      });


    /*$.ajax({
        beforeSend:function(){
            block('Se esta eliminando la información');
        },
        url: urlraiz+'home/postEliminarCliente',
        type:'POST',
        dataType : 'json',
        data:{
            'idcliente':idcliente,
            'idservicio':idservicio
        },
        success:function(res){
            respuesta = res;
            getClientes();
        },
        complete:function(){
            if(respuesta == "1"){
                $.toast({
                    heading:'éxito',
                    text: 'El cliente se elimino con éxito',
                    showHideTransition: 'plain',
                    icon: 'success',
                    position:'top-center',
                    hideAfter: 6000
                });
            }
            //unBlock();
        } 
    })*/
    
}

const ValidarClienteExiste = (e) => {
    
    const identificacion = $("#ididentificacion").val();
    if(identificacion !== ""){
        if(isNaN(identificacion)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Identificación) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 4000
            });
            return false;
        }else{
            //if (e.keyCode === 13 && !e.shiftKey) {
            if(swValidacion == identificacion){
                $("#btn-guardar").prop('disabled',false);
            }else{
                $("#modal_sede").modal('hide');
                $.ajax({
                    beforeSend:function(){
                        block('consultando identificacion en base de datos');
                    },
                    url: urlraiz+'home/ValidarClienteExiste',
                    type:'POST',
                    dataType : 'json',
                    data:{
                        'identificacion':identificacion
                    },
                    success:function(res){
                        if(res.length > 0){
                            
                            $("#btn-guardar").prop('disabled',true);
                            //$("#idclienteform").val(res[0]['cp_id']);
                            messageExit('La cedula ingresada ya se encuentra registrado')
                        }else{
                            $("#btn-guardar").prop('disabled',false);
                        }
                    },
                    complete:function(){
                        unBlock();
                        $("#modal_sede").modal('show');
                    }
                })
            //}
            }
        }

    }
}

const ValidarEmailExiste = () =>{
    const email = $("#idemail").val();
    const expr = /\w+@\w+\.+[a-z]/;
    if(email !== ""){
        if(swValidacionEmail == email){
            $("#btn-guardar").prop('disabled',false);
        }else{
            if(!expr.test(email)){
                $.toast({
                    heading: 'Error',
                    text: 'El E-mail ingresado no es valido,ingrese uno nuevamente',
                    showHideTransition: 'plain',
                    icon: 'error',
                    position:'top-center',
                    hideAfter: 6000
                });
            }else{
                $("#modal_sede").modal('hide');
                $.ajax({
                    beforeSend:function(){
                        block('consultando E-mail en base de datos');
                    },
                    url: urlraiz+'home/ValidarEmailExiste',
                    type:'POST',
                    dataType : 'json',
                    data:{
                        'email':email
                    },
                    success:function(res){
                        if(res.length > 0){
                            $("#btn-guardar").prop('disabled',true);
                            messageExit('El E-mail ingresado ya se encuentra registrado ')
                        }
                    },
                    complete:function(){
                        unBlock();
                        $("#modal_sede").modal('show');
                    }
                })
            }   
        }
    }
}


const registrarServicioIdenti = () => {
    const identificacion         = $("#idclienteform").val();
    
     const idhabitacion          = $("#idhabitacion").val();
     const idvalordia            = $("#idvalordia").val();

     const idcantdia             = $("#idcantdia").val();
     const idvalorser            = $("#idvalorser").val();
     const idmanerapago          = $("#idmanerapago").val();
     
     if(idhabitacion.trim() === '0' || idcantdia.trim() === '' || idmanerapago.trim() === '0' ){
        $.toast({
            heading: 'Advertencia',
            text: 'Los campos con (*) son obligatorios que debe llenar',
            showHideTransition: 'plain',
            icon: 'warning',
            position:'top-center',
            hideAfter: 6000
        });
        return false;
     }else if(isNaN(idcantdia)){
            $.toast({
                heading: 'Error',
                text: 'Campo (Cantidad de dias) solo acepta numeros',
                showHideTransition: 'plain',
                icon: 'error',
                position:'top-center',
                hideAfter: 6000
         });
        return false;
    }else{
        $("#modal_sede").modal('hide');
        $.ajax({
            beforeSend:function(){
                block('Estamos guardando la informaciòn');
            },
            url: urlraiz+'servicio/registrarServicioIdenti',
            type:'POST',
            dataType : 'json',
            data:{
                'identificacion':identificacion,
                'idhabitacion':idhabitacion,
                'idvalordia':idvalordia,
                'idcantdia':idcantdia,
                'idvalorser':idvalorser,
                'idmanerapago':idmanerapago
            },
            success:function(res){
                if(res === "1"){
                    messageExit('Se agrego el servicio con èxito');
                }
            },
            complete:function(){
                unBlock();
                formClear();
                getClientes();
            }
        })
    }




}

const nuevoServicio = ()  => {
    $("#idclienteform").val();
    $("#divClientes").hide();
    $("#modal_info").modal('hide');
    $("#modal_sede").modal('show');
    $("#btn-guardar").attr('onclick','registrarServicioIdenti()');
    $("#namebtn").text('Agregar nuevo servicio');
}

const cerrarModal =() => {
    formClear();
    $("#modal_sede").modal('hide');
    InciarFormulario();
    swValidacion = 0;
    swValidacionEmail = '';
    $("#btn-guardar").attr('onclick','agregarCliente()');
    $("#namebtn").text('Agregar nuevo cliente');
}




