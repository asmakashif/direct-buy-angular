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
        $user_id=$DecodedData['user_id']; 
        $shopId=$DecodedData['shopId']; 
        $payment_name=$DecodedData['payment_name']; 

        $del = "DELETE FROM `shop_payment_info` WHERE  `pInfo_shopId` = '{$shopId}' ";
        if(mysqli_query($CN,$del))
        {
            foreach($payment_name as $key)  
            { 
            	//echo $key;
                //$payment_name = $DecodedData['payment_name'][$key];  
                $sql="INSERT INTO `shop_payment_info`(pInfo_userId,pInfo_shopId,pInfo_payment_name) values('$user_id','$shopId','$key')";
                $R=mysqli_query($CN,$sql);
            
    	        if($R)
    	        {
                    $qry="UPDATE `shop_details` SET `payment_status`=1 WHERE `shopId`='{$shopId}' LIMIT 1  ";
                    if($result=mysqli_query($CN,$qry))
                    {
                        http_response_code(201);
                    }
                    else
                    {
                        http_response_code(422);
                    }
    	        	// echo 'success';
    	         //    http_response_code(201);
    	            
    	        }
    	        else{
    	        	http_response_code(422);
    	        }
            }  
        }
        else
        {
            http_response_code(422);
        }
        
        
        
    }
?>