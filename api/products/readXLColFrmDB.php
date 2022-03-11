<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    // $shopId = $_GET['shopId'];
    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");


    $query = $CN->query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'formal_store' AND TABLE_NAME = 'zasbha_temp'");

    while($row = $query->fetch_assoc()){
        $result[] = $row;
        //echo json_encode($result);
    }
    // Array of all column names
    $columnArr = array_column($result, 'COLUMN_NAME');
    echo json_encode($columnArr);
?>