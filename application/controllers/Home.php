<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	/* constructor */
	function __construct(){
		parent::__construct();
		$this->load->model('model_home');
		if($this->session->userdata('logueado') !='log'){
			header('location:'.base_url());
		}
		$this->lang->load('producto','spanish');
	}

	public function index()
	{
		$this->load->view('Layouts/ly_header');
		$this->load->view('Layouts/ly_menu');
		$this->load->view('Layouts/ly_navbar');
		$this->load->view('home');
		$this->load->view('Layouts/ly_footer');
	}

	public function menu(){
		$file = $this->input->post('file');
		$view = $this->input->post('view');
		
		return $this->load->view($file.'/'.$view);
	}
}
