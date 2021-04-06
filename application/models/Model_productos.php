<?php

class Model_productos extends CI_Model{
    /* constructor */
    function __construct(){
        parent::__construct();
        //$this->load->library('session');
    }

    public function save($data){
        $this->db->insert('tb_productos', $data);
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            //return $this->db->insert_id();
            return 0;
        } else {
            // do whatever you want to do on query success
            return 1;
        } 
    }

    public function update($data, $id){
        $this->db->where('id', $id);
        $this->db->update('tb_productos',$data);
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            //return $this->db->insert_id();
            return 0;
        } else {
            // do whatever you want to do on query success
            return 1;
        } 
    }

    public function list(){
        $this->db->select('pro.nombre, pro.id as idpro, med.id as idmed, med.descripcion, pro.created');
        $this->db->from('tb_productos pro');
        $this->db->join('tb_medidas med','med.id = pro.unidadmedida');
        $this->db->where('pro.estado', 0);
        $this->db->order_by('pro.nombre','asc');
        $query = $this->db->get();
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            return 'Error en la consulta';
        } else {
            return $query->result();
        }        
    }

    public function listOff(){
        $this->db->select('pro.nombre, pro.id as idpro, med.id as idmed, med.descripcion, pro.created');
        $this->db->from('tb_productos pro');
        $this->db->join('tb_medidas med','med.id = pro.unidadmedida');
        $this->db->where('pro.estado', 1);
        $query = $this->db->get();
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            return 'Error en la consulta';
        } else {
            return $query->result();
        }        
    }

    public function delete($data, $id){
        $this->db->where('id', $id);
        $this->db->update('tb_productos',$data);
        return 1;
    }
}