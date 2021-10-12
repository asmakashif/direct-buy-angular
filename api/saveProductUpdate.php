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
        
        $shopId=$DecodedData['shopId']; 
        $productUpdate_status=$DecodedData['productUpdate_status']; 

        
        foreach($productUpdate_status as $key)  
        {  
            $sql="UPDATE `shop_details` SET `productUpdate_status` = '$key',`shop_status`= 1  WHERE `shopId`='{$shopId}' ";

            
            $R=mysqli_query($CN,$sql);
        
	        if($R)
	        {
                http_response_code(201);
            }
	        else{
	        	http_response_code(422);
	        }
        } 
    }
?>