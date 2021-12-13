<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


    $target_dir="uploads/";
    $target_file = $target_dir.basename($_FILES["myFile"]["name"]);
    move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file);
?>