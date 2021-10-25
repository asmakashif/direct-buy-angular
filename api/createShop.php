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

        //print_r($DecodedData);
        //die();
        $user_id=$DecodedData['user_id'];
        $shopId=$DecodedData['shopId'];
        
        $shop_name=$DecodedData['shop_name'];
        $shop_address=$DecodedData['shop_address'];
        // $checkbox1=$DecodedData['shopType']; 

        // $chk="";  
        // foreach($checkbox1 as $chk1)  
        // { 
        //     $chk .= $chk1.",";  
        // }  
        
        $sql="INSERT INTO `shop_details`(user_id,shopId,shop_name,shop_address) values('$user_id','$shopId','$shop_name','$shop_address')";
        
        $R=mysqli_query($CN,$sql);
        
        if($R)
        {
            http_response_code(201);
            // $sql1="insert into shop_detail_type(shop_type_id,shop_id) values ('$chk','$R')";
            // $R1=mysqli_query($CN,$sql1);
            // if($R1)
            // {
        	   // http_response_code(201);
            //     // $Message = "Student has been registered successfully";
            // }
            // else{
            //     http_response_code(422);
            //     // $Message = "Server error please try later";
            // }
        }
        else{
        	http_response_code(422);
            // $Message = "Server error please try later";
        }
        // $response[] = array("Message"=>$Message);
        // echo json_encode($response);
    }
?>