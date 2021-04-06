<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Medidas extends CI_Controller {

	/* constructor */
	function __construct(){
		parent::__construct();
		$this->load->model('model_medida');
		if($this->session->userdata('logueado') !='log'){
			header('location:'.base_url());
		}
		
	}

	/*public function index()
	{
		$this->load->view('Layouts/ly_header');
		$this->load->view('Layouts/ly_menu');
		$this->load->view('Layouts/ly_navbar');
		$this->load->view('views_app/Medidas/medida');
		$this->load->view('Layouts/ly_footer');
	}*/

	public function save(){
		$descripcion 	= $this->input->post('descripcion');
		$sigla 			= $this->input->post('sigla');

		$data = array(
			'descripcion'	=> $descripcion,
			'sigla'			=> $sigla
		);

		if(isset($descripcion) && isset($sigla)){
			if($this->model_medida->save($data) == 1){
				echo '1';
			}else{
				echo '2';
			}
		}
	}

	public function list(){
		$data = $this->model_medida->list();
		echo json_encode($data);
	}

	public function listOff(){
		$data = $this->model_medida->listOff();
		echo json_encode($data);
	}

	public function update(){
		$descripcion 	= $this->input->post('descripcion');
		$sigla 			= $this->input->post('sigla');
		$id				= $this->input->post('id');

		$data = array(
			'descripcion'	=> $descripcion,
			'sigla'			=> $sigla,
			//'created'		=> date('Y-m-d h:i:s')
		);

		if(isset($descripcion) && isset($sigla)){
			if($this->model_medida->update($data, $id) == 1){
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
					$this->model_medida->delete($datos, $id);
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
					$this->model_medida->delete($datos, $id);
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

	public function ListOnMedidasPdf(){
		$data = $this->model_medida->list();
		$this->generatePdf($data);
		
	}

	public function generatePdf($data){
		
		$html = '';
		$cont = 0;
		//require_once __DIR__ . '/vendor/autoload.php';
		$mpdf = new \Mpdf\Mpdf();
		$head = $this->load->view('Pdf/headPdf',[],true);
		$footer = $this->load->view('Pdf/footerPdf',[],true);
		$html .= '
				<div class="title-date">
					<div class="title">
						<h3>Lista de medidas</h3>
					</div>
				</div>
				<div class="cantidad">
					<span>Cantidad: </span> <span>'.count($data).'</span>
				</div>
				<div class="list">
					<table class="table-collapse"> 
						<thead class="thead-background">
							<tr class="table-collapse thead-background">
								<th style="color:#fff;">#</th>
								<th style="color:#fff;">Descripciòn</th>
								<th style="color:#fff;">Sigla</th>
							</tr>
						</thead>
						<tbody class="table-collapse">';
							foreach($data as $val){
								$cont++;
								$html .= '<tr class="table-collapse">
											<td>'.$cont.'</td>
											<td>'.$val->descripcion.'</td>
											<td>'.$val->sigla.'</td>
										  </tr>';
							}
						$html .='</tbody>
					</table>
				</div>';
		$mpdf->WriteHTML($head.''.$html.''.$footer);

		//$mpdf->WriteHTML($footer);
		$mpdf->Output('Lista_medidas.pdf','I');
		//$mpdf->Output('Lista_medidas.pdf','D');
	}

	public function dowloadPdf(){
		$data = $this->model_medida->list();
		$html = '';
		$cont = 0;
		//require_once __DIR__ . '/vendor/autoload.php';
		$mpdf = new \Mpdf\Mpdf();
		$head = $this->load->view('Pdf/headPdf',[],true);
		$footer = $this->load->view('Pdf/footerPdf',[],true);
		$html .= '
				<div class="title-date">
					<div class="title">
						<h3>Lista de medidas</h3>
					</div>
				</div>
				<div class="cantidad">
					<span>Cantidad: </span> <span>'.count($data).'</span>
				</div>
				<div class="list">
					<table class="table-collapse"> 
						<thead class="thead-background">
							<tr class="table-collapse thead-background">
								<th style="color:#fff;">#</th>
								<th style="color:#fff;">Descripciòn</th>
								<th style="color:#fff;">Sigla</th>
							</tr>
						</thead>
						<tbody class="table-collapse">';
							foreach($data as $val){
								$cont++;
								$html .= '<tr class="table-collapse">
											<td>'.$cont.'</td>
											<td>'.$val->descripcion.'</td>
											<td>'.$val->sigla.'</td>
										  </tr>';
							}
						$html .='</tbody>
					</table>
				</div>';
		$mpdf->WriteHTML($head.''.$html.''.$footer);

		//$mpdf->WriteHTML($footer);
		$mpdf->Output('Lista_medidas.pdf','D');
		//$mpdf->Output('Lista_medidas.pdf','D');
	}

	// Excel
	public function generar_excel(){
		$data = $this->model_medida->list();
		if(count($data) > 0){
			//Cargamos la librería de excel.
			$this->load->library('excel'); $this->excel->setActiveSheetIndex(0);
			$this->excel->getActiveSheet()->setTitle('Medidas');
			//Contador de filas
			$contador = 1;
			//Le aplicamos ancho las columnas.
			$this->excel->getActiveSheet()->getColumnDimension('A')->setWidth(5);
			$this->excel->getActiveSheet()->getColumnDimension('B')->setWidth(40);
			$this->excel->getActiveSheet()->getColumnDimension('C')->setWidth(20);
			//Le aplicamos negrita a los títulos de la cabecera.
			$this->excel->getActiveSheet()->getStyle("A{$contador}")->getFont();
			$this->excel->getActiveSheet()->getStyle("B{$contador}")->getFont();
			$this->excel->getActiveSheet()->getStyle("C{$contador}")->getFont();

			// color de las celdas
			$this->excel->getActiveSheet()->getStyle('A1')->getFill()->setFillType(\PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('17a2b8');;
			$this->excel->getActiveSheet()->getStyle('B1')->getFill()->setFillType(\PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('17a2b8');;
			$this->excel->getActiveSheet()->getStyle('C1')->getFill()->setFillType(\PHPExcel_Style_Fill::FILL_SOLID)->getStartColor()->setRGB('17a2b8');;

			// Color de letra
			$styleArray = array(
			'font'  => array(
				'bold'  => false,
				//'color' => array('rgb' => 'fff'),
				'size'  => 12,
				'name'  => 'Arial'
			));      
			$this->excel->getActiveSheet()->getStyle('A1')->applyFromArray($styleArray);
			$this->excel->getActiveSheet()->getStyle('B1')->applyFromArray($styleArray);
			$this->excel->getActiveSheet()->getStyle('C1')->applyFromArray($styleArray);
			

			//Definimos los títulos de la cabecera.
			//
			$this->excel->getActiveSheet()->setCellValue("A{$contador}", '#');
			$this->excel->getActiveSheet()->setCellValue("B{$contador}", 'Descripciòn');
			$this->excel->getActiveSheet()->setCellValue("C{$contador}", 'Sigla');
			//Definimos la data del cuerpo.        
			foreach($data as $l){
			   //Incrementamos una fila más, para ir a la siguiente.
			   $contador++;
			   //Informacion de las filas de la consulta.
			   $this->excel->getActiveSheet()->setCellValue("A{$contador}", $contador - 1);
			   $this->excel->getActiveSheet()->setCellValue("B{$contador}", $l->descripcion);
			   $this->excel->getActiveSheet()->setCellValue("C{$contador}", $l->sigla);

			   $styleArrayColum = array(
				'font'  => array(
					'bold'  => false,
					'size'  => 10,
					'name'  => 'Arial'
				));  
				$this->excel->getActiveSheet()->getStyle("A{$contador}")->applyFromArray($styleArrayColum);
				$this->excel->getActiveSheet()->getStyle("B{$contador}")->applyFromArray($styleArrayColum);
				$this->excel->getActiveSheet()->getStyle("C{$contador}")->applyFromArray($styleArrayColum);
			}
			//Le ponemos un nombre al archivo que se va a generar.
			$archivo = "lista de Medidas.xls"; 
			header('Content-Type: application/vnd.ms-excel');
			header('Content-Disposition: attachment;filename="'.$archivo.'"');
			header('Cache-Control: max-age=0');
			$objWriter = PHPExcel_IOFactory::createWriter($this->excel, 'Excel5');
			//Hacemos una salida al navegador con el archivo Excel.
			$objWriter->save('php://output');
		 }else{
			echo 'No se han encontrado Medidas';
			exit;        
		 }
	  }
}