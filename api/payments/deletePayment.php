<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    
    $payment_id = $_GET['payment_id'];
    

    $sql = "DELETE FROM `payment_integration` WHERE `payment_id` = '$payment_id'";

    if($result = mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN)))
    {
        http_response_code(204);
    }
    else
    {
        http_response_code(404);
    }
    

?>