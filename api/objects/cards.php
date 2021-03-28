<?php
class Card {

    // подключение к базе данных и таблице 'cards' 
    private $conn;
    private $table_name = "cards";

    // свойства объекта 
    public $id;
    public $name;
    public $email;
    public $message;

    // конструктор для соединения с базой данных 
    public function __construct($db){
        $this->conn = $db;
    }

    // метод read() - получение списка карточек 
    function read() {

        // выбираем все записи 
        $query = "SELECT id, name, email, message, created FROM " . $this->table_name . "  ORDER BY created DESC";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // выполняем запрос 
        $stmt->execute();

        return $stmt;
    }

    // метод create - создание карточки 
    function create() {

        // запрос для вставки (создания) записей 

        $query = "INSERT INTO " . $this->table_name . " (`name`, `email`, `message`) VALUES (:name, :email, :message)";

        // подготовка запроса 
        $stmt = $this->conn->prepare($query);

        // привязка значений 
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":message", $this->message);

        // выполняем запрос 
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>