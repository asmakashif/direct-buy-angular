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

    

    
        
    $user_id=5;
    $shopId='ccdsD45';
    $shop_name = str_replace(' ', '_', 'Asma Sultana');
    $shopName='Asma Sultana';
    $shop_address='Asma Sultana';
    
    
    $shops=[];
    
    $sql="INSERT INTO shop_details (user_id,shopId,shop_name,shopName,shop_address) values('$user_id','$shopId','$shop_name','$shopName','$shop_address')";
    echo $sql;
    die();
    $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    
    if($R)
    {
        http_response_code(201);
    }
    else{
        http_response_code(422);
    }
    
    
?>