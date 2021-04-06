<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div class="w-100">
    <nav class="navbar navbar-expand-lg navbar-light navbar-app fixed-top nav_app">
        <a class="navbar-brand" href="#"><img src="<?= base_url() ?>assets/img/logo/logo_r.png" alt="" style="width:250px; height:40px;"></a>
         <button type="button" class="btn btn-outline-primary-app btn-menu" id="btn-menu">
             <i class="fas fa-bars text-primary-app"></i>
            </button> 
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            
            <li class="nav-item">
               
            </li>

            
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <h6></h6>
                
                    <a href="javascript:;" class="avatar rounded-circle">
                        <img alt="Image placeholder" src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/team-1.jpg" style="width:30px; height:30px; border-radius:50% !important; border:2px solid #fff !important;">
                    </a>
                
                <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-outline-primary-app dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <?=  ucfirst(strtolower($this->session->userdata('s_name_p'))).' '.ucfirst(strtolower($this->session->userdata('s_apellido_p')))  ?>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                        <a class="dropdown-item text-info-app" href="#"><i class="fas fa-user-edit"></i> Mi perfil</a>
                        <a class="dropdown-item text-danger-app" href="login/NotLogin" ><i class="fas fa-sign-out-alt"></i> salir</a>
                    </div>
                </div>


                
            </form>
        </div>
    </nav>
