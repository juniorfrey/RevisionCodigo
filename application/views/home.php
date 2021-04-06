    <div class="container-fluid" id="contenido">
        
    </div>
    
</div>

<script>
    function block(){
        $.blockUI(
            {
                message: '<h6> Guardando la información </h6>' ,
                css: { 
                    width: '30%', 
                    border:'0px solid #0b9ce6',
                    cursor:'wait',
                    backgroundColor:'#273746',
                    color:'#FFFFFF',
                    height:"auto",
                    padding:"10px"
                },
            }
        )
    }
</script>