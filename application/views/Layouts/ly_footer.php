<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?> 

    </div>

        <script src="<?php echo base_url() ?>assets/jquery/jquery.min.js"></script>
        <script src="<?php echo base_url() ?>assets/js/bootstrap.min.js"></script>
        <script src="<?php echo base_url() ?>assets/js/plugin/datatables/jquery.dataTables.min.js"></script>
        <script src="<?php echo base_url() ?>assets/js/plugin/datatables/dataTables.bootstrap4.min.js"></script>
        <script src="<?php echo base_url() ?>assets/blockUI/blockUI.min.js"></script>
        <script src="<?php echo base_url() ?>assets/sweetalert/sweetalert.min.js"></script>
        <script src="<?php echo base_url() ?>assets/librerias/select2/js/select2.min.js"></script>
        <script src="<?php echo base_url() ?>assets/librerias/moment/moment.js"></script>
        <script src="<?php echo base_url() ?>assets/librerias/moment/moment-with-locales.min.js"></script>
        <!--<script src="https://kit.fontawesome.com/c1a8a9a557.js" crossorigin="anonymous"></script>-->

        <script>

            
        </script>

        <script>

        function unBlock(){
            $.unblockUI();
        }

        </script>

        <?php if($this->uri->segment(1)=='home') { ?>
            <script src="<?php echo base_url(); ?>assets/js/menu/menu.js"></script>
            <script src="<?php echo base_url(); ?>assets/js/medidas/medida.js"></script>
            <script src="<?php echo base_url(); ?>assets/js/Producto/Producto.js"></script>
        <?php
        }
        ?>


    </body>
</html>