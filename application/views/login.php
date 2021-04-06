<?php
    echo $this->session->userdata('logueado');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/sweetalert/css/sweetalert.min.css">

</head>
<body>
    <div>
        <div class="cajas">
            <input type="text" id="txt_user">
        </div>
        <div class="cajas">
            <input type="password" id="txt_password">
        </div>
        <div class="buttoms">
            <button type="button" onclick="login()" id="btn_login">Entrar</button>
        </div>
        <div class="help">
            <a href="#" id="href_help">Olvide mi contraseña</a>
        </div>
    </div>

        <script src="<?php echo base_url() ?>assets/jquery/jquery.min.js"></script>
        <script src="<?php echo base_url() ?>assets/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url() ?>assets/blockUI/blockUI.min.js"></script>
        <script src="<?php echo base_url() ?>assets/sweetalert/sweetalert.min.js"></script>

        <script>
        
        $(document).ready(function(){
                
            })

            // Bloquear la ventanas mientras carga la informaciòn
            function block(mensaje){
                $.blockUI(
                    {
                        message: '<h6> Espere un momento, '+mensaje+'</h6>' ,
                        css: { 
                            width: '30%', 
                            border:'0px solid #0b9ce6',
                            cursor:'wait',
                            backgroundColor:'#0b9ce6',
                            color:'#FFFFFF',
                            height:"auto",
                            padding:"10px"
                        },
                    }
                )
            }
        </script>

        <!-- llamar archivos js -->
        <?php if($this->uri->segment(1)=='') { ?>
            <script src="<?php echo base_url(); ?>assets/js/login/login.js"></script>
        <?php
            }
        ?>


</body>
</html>