<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {

	/* constructor */
	function __construct(){
        parent::__construct();
        $this->load->model('model_login');
        if($this->session->userdata('logueado') =='log'){
            header('location:'.base_url().'home');
        }
	}

	public function index()
	{
		$this->load->view('login');
    }
    
    public function inlogin(){
        // controlador para hacer el logueo a la apliaciòn
        $user = $this->input->post('user');
        $pass = $this->input->post('pass');
        if(!empty($user) && !empty($pass)){

            $respuesta = $this->model_login->inlogin($user, $pass);
            if($respuesta === true){
                $this->model_login->infoLogin($user, $pass);
                echo 1;
            }else{
                echo 0;
            }
        }
    }

    public function NotLogin(){
        session_destroy();
        $data_session = array(
            'logueado'      => 'dlog'
        );
        //var_dump($data_session);
        $this->session->set_userdata($data_session);
    }

    public function helpLogin(){
        // function para recuperar cuenta
    }
}