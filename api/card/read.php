<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// подключение базы данных и файл, содержащий объекты 
include_once '../config/database.php';
include_once '../objects/cards.php';

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// инициализируем объект 
$card = new Card($db);
 
// запрашиваем карточки 
$stmt = $card->read();
$num = $stmt->rowCount();

// проверка, найдено ли больше 0 записей 
if ($num>0) {

    // массив карточек 
    $cards_arr=array();
//    $cards_arr["records"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);

        $card_item=array(
            "id" => $id,
            "name" => $name,
            "email" => $email,
            "message" => html_entity_decode($message),
            
        );

        array_push($cards_arr, $card_item);
    }

    // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о карточках в формате JSON 
    echo json_encode($cards_arr);
}

else {

    // установим код ответа - 404 Не найдено 
    http_response_code(404);

    // сообщаем пользователю, что карточки не найдены 
    echo json_encode(array("message" => "карточки не найдены."), JSON_UNESCAPED_UNICODE);
}