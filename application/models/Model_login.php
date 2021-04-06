<?php

class Model_login extends CI_Model{
    /* constructor */
    function __construct(){
        parent::__construct();
        //$this->load->library('session');
    }

    public function inlogin($user, $pass){
        $this->db->where('username', $user);
        $this->db->where('password', md5($pass));
        $query = $this->db->get('tb_usuarios');
        
        if($query->num_rows() > 0){
            return true;
        }else{
            return false;
        }
    }

    // funciòn para traer la informaciòn de la persona logueada
    public function infoLogin($user, $pass){
        $this->db->select('usuario.id as idusuario, usuario.username, empleado.p_nombre, empleado.s_nombre, empleado.p_apellido, empleado.s_apellido, empleado.correo, empleado.id as idempleado');
        $this->db->from('tb_usuarios usuario');
        $this->db->join('tb_empleados empleado','usuario.idempleado = empleado.id');
        $this->db->where('username', $user);
        $this->db->where('password', md5($pass));
        $query = $this->db->get();

        if (!empty($user)) {
            $r = $query->row();
            $data_session = array(
                's_user'        => $r->idusuario,
                's_username'    => $r->username,
                's_name_p'      => $r->p_nombre,
                's_name_s'      => $r->s_nombre,
                's_apellido_p'  => $r->p_apellido,
                's_apellido_s'  => $r->s_apellido,
                's_correo'      => $r->correo,
                'logueado'      => 'log'
            );
            //var_dump($data_session);
            $this->session->set_userdata($data_session);
        }

    }

}