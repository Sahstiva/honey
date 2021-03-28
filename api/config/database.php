<?php

class Database {

    // укажите свои учетные данные базы данных 
    private $host = "localhost";
    private $db_name = "avitshas_apidb";
    private $username = "046277372_user";
    private $password = "1234Pass";
    public $conn;

    // получаем соединение с БД 
    public function getConnection(){

        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>