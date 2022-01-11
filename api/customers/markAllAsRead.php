<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $notifications = [];
    $user_id=$_GET['user_id']; 

    $sql="UPDATE `notification_receivers` SET `IsRead`='1' WHERE `user_id`='{$user_id}' LIMIT 1  ";
    
    $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    
    if($R)
    {
        http_response_code(201);
    }
    else{
        http_response_code(422);
    }
?>