<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $storeId = $_POST['storeId'];
    $sql = "DELETE FROM `temp_str_config` WHERE  `temp_shopId` = '{$storeId}'";
    if(mysqli_query($CN,$sql))
    {
        http_response_code(204);
    }
    else
    {
        http_response_code(422);
    }

?>