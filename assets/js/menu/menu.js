var url = 'http://localhost/granja/';
$(document).ready(function(){
    $(".btn-menu").click(function(e){
        e.preventDefault();
        $("#content-wrapper").toggleClass('toggle');
    })
});

const menu = (file, view) => {
    var data = {
        'file':file,
        'view':view
    }
    $.ajax({
        url:url+'home/menu',
        type:'POST',
        //dataType : 'html',
        data:data,
        beforeSend:function(){
            block();
        },
        success:function(response){
            
            $("#contenido").html(response)
            InitGlobal();

            // medidas
            
        },
        complete:function(){
            $("#content-wrapper").removeClass('toggle');
            unBlock();
        }
        
    })
}

const InitGlobal = () => {
    inti();
    intitProd();
}

