<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Productos extends CI_Controller {

	/* constructor */
	function __construct(){
		parent::__construct();
		$this->load->model('model_productos');
	}

	public function index()
	{
		$this->load->view('views_app/Productos/producto');
	}

	public function save(){
		$nombre 		= $this->input->post('nombre');
		$medida			= $this->input->post('unidadmedida');

		$data = array(
			'nombre'		=> $nombre,
			'unidadmedida' 	=> $medida
		);

		if(isset($nombre) && isset($medida)){
			if($this->model_productos->save($data) == 1){
				echo '1';
			}else{
				echo '2';
			}
		}
	}

	public function update(){
		$nombre 		= $this->input->post('nombre');
		$unidadmedida 	= $this->input->post('unidadmedida');
		$id				= $this->input->post('id');

		$data = array(
			'nombre'		=> strtolower($nombre),
			'unidadmedida'	=> $unidadmedida,
			'updated'		=> date('Y-m-d h:i:s')
		);

		if(isset($nombre) && isset($unidadmedida)){
			if($this->model_productos->update($data, $id) == 1){
				echo '1';
			}else{
				echo '2';
			}
		}
	}

	public function delete(){
		$data = $this->input->post('data');
		$mensaje = '';
		if(isset($data)){
			if(!empty($data)){
				foreach($data as $val){
					$id = $val['id'];
					$datos = array(
						'estado' => 1
					);
					$this->model_productos->delete($datos, $id);
				}
				$mensaje = '1';
			}else{
				$mensaje = '0';
			}
		}else{
			$mensaje = '0';
		}

		echo $mensaje;
	}

	public function list(){
		$data = $this->model_productos->list();
		echo json_encode($data);
	}

	public function listoff(){
		$data = $this->model_productos->listOff();
		echo json_encode($data);
	}

	public function habilitar(){
		$data = $this->input->post('data');
		$mensaje = '';
		if(isset($data)){
			if(!empty($data)){
				foreach($data as $val){
					$id = $val['id'];
					$datos = array(
						'estado' => 0
					);
					$this->model_productos->delete($datos, $id);
				}
				$mensaje = '1';
			}else{
				$mensaje = '0';
			}
		}else{
			$mensaje = '0';
		}

		echo $mensaje;
	}


}