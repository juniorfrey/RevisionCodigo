<?php

    class Model_home extends CI_Model{
        /* constructor */
        function __construct(){
            parent::__construct();
        }

        public function agregarCliente($param){
            // ejecutamos la funciòn "insert" para agregar un nuevo cliente
            $this->db->insert('clientes', $param);
            return $this->db->insert_id();
        }

        public function actualizarCliente($data, $id){
            $this->db->where('cp_id', $id);
            $this->db->update('clientes',$data);
            return 1;
        }

        public function getClientesList(){
            $this->db->select('clientes.cp_id as idcliente, clientes.cp_nombres as nomcliente, clientes.cp_apellidos as apllcliente, 
            clientes.cp_direccion, clientes.cp_email, clientes.cp_ncelular, clientes.cp_ntelefono, clientes.cp_fechacreacion, clientes.cp_identificacion,
            ,DATE_FORMAT(clientes.cp_fehcanacimiento, "%Y-%m-%d") as fehcanac,
            servicios.cp_id as idservicio,servicios.cp_valordia, servicios.cp_cantidaddia, servicios.cp_valorservicio, servicios.cp_fechacreacion as fechaservicio,
            manpago.cp_id as idmanerapago, manpago.cp_nombre as nombrepago, tipohb.cp_id as idtipohabitacion, 
            tipohb.cp_nombre as nombrehabitacion, tipohb.cp_valor as valorhab');
            $this->db->from('clientes clientes');
            $this->db->join('servicios servicios','servicios.cp_idcliente = clientes.cp_id');
            $this->db->join('manera_pago manpago','manpago.cp_id = servicios.cp_manerapago');
            $this->db->join('tipo_habitaciones tipohb','tipohb.cp_id = servicios.cp_thabitacion');
            $this->db->order_by('clientes.cp_fechacreacion','desc');
            $query = $this->db->get();
            return $query->result();
        }

        public function postValorHabitacion($id){
            $this->db->select('cp_valor');
            $this->db->from('tipo_habitaciones tipohb');
            $this->db->where('cp_id', $id);
            $query = $this->db->get();
            return $query->result();
        }

        public function postEliminarCliente($id){
            $this->db->where('cp_id', $id);
            $this->db->delete('clientes'); 
        }
        
        public function ValidarClienteExiste($id){
            $this->db->select('*');
            $this->db->from('clientes');
            $this->db->where('cp_identificacion', $id);
            $query = $this->db->get();
            return $query->result();
        }

        public function ValidarEmailExiste($email){
            $this->db->select('cp_email');
            $this->db->from('clientes');
            $this->db->where('cp_email', $email);
            $query = $this->db->get();
            return $query->result();
        }
    }
?>