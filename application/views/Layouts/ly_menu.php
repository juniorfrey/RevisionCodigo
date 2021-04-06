<?php
    defined('BASEPATH') OR exit('No direct script access allowed');
?>
<div id="sidebar-container">
    <button class="btn btn-primary btn-menu" type="button"><i class="fas fa-times"></i></button>
    <div class="logo pt-4">
        <h4 class="text-light font-weight-bold">MENU</h4>
    </div>
    <div class="menu">
        <a  onclick="menu('views_app/Medidas/','medida')" class="d-block pb-1">
            <i class="fas fa-ruler mr-2 leed"></i>Unidad de medida 
        </a>
        <hr>
        <a onclick="menu('views_app/Productos/','producto')" class="d-block  ">
            <i class="fas fa-cart-arrow-down mr-2 leed"></i> Productos
        </a>
    </div>
</div>