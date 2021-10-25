<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $shopId = $_GET['shopId'];
    //$shopId = 'i3s6wp';
    
    $sql = "SELECT COUNT(*) From (Select * From customer_default_store WHERE `shopId` = '{$shopId}') As Z";
    
    if($result = mysqli_query($CN,$sql))
    {
        $row = mysqli_fetch_array($result);
        $total = $row[0];
        echo json_encode($total);
    }
    else
    {
        http_response_code(404);
    }

?>