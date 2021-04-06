// variables globales
var url = 'http://localhost/granja/';
$(document).ready(function(){

});

const login = () => {
    const user      = $('#txt_user').val();
    const password  = $('#txt_password').val();

    // validar campos vaciòs
    if(user.trim() === '' || password.trim() === ''){
        swal("Good job!", "You clicked the button!", "error")
    }else{
        var data = {
            'user':user,
            'pass':password
        }
        $.ajax({
            url:url+'login/inlogin',
            type:'POST',
            //dataType : 'json',
            data:data,
            beforeSend:function(){
                //block('Se esta guardando la información');
            },
            success:function(response){
                if(response === '1'){
                    location.href =url+"home";
                }
            }
            
        })
    }
}