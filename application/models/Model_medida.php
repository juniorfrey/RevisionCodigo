<?php

class Model_medida extends CI_Model{
    /* constructor */
    function __construct(){
        parent::__construct();
        //$this->load->library('session');
    }

    public function save($data){
        $this->db->insert('tb_medidas', $data);
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
        $this->db->update('tb_medidas',$data);
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
        $this->db->select('*');
        $this->db->from('tb_medidas');
        $this->db->where('estado', 0);
        $this->db->order_by('descripcion','asc');
        $query = $this->db->get();
        $this->db->trans_complete();
        if ($this->db->trans_status() === FALSE) {
            return 'Error en la consulta';
        } else {
            return $query->result();
        }        
    }

    public function listOff(){
        $this->db->select('*');
        $this->db->from('tb_medidas');
        $this->db->where('estado', 1);
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
        $this->db->update('tb_medidas',$data);
        return 1;
    }
}