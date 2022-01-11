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

    

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        // print_r($DecodedData);
        $NotificationID=$DecodedData['NotificationID'];
        
        $sql="UPDATE `notifications` SET `Iscomplete`='1' WHERE `NotificationID`='{$NotificationID}' LIMIT 1  ";
    
        $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
        
        if($R)
        {
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
        
    }
?>