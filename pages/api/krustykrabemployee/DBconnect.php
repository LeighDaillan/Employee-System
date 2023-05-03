<?php

class DBconnect
{
    private $db_server;
    private $db_user;
    private $db_pass;
    private $db_name;

    public function __construct($db_server, $db_user, $db_pass, $db_name)
    {
        $this->db_server = $db_server;
        $this->db_user = $db_user;
        $this->db_pass = $db_pass;
        $this->db_name = $db_name;
    }

    public function connect()
    {
        try {
            $conn = mysqli_connect($this->db_server, $this->db_user, $this->db_pass, $this->db_name);

            return $conn;
        } catch (mysqli_sql_exception $e) {
            echo json_encode(['status' => false, 'error' => $e->getMessage()]);
        }
    }
}

?>