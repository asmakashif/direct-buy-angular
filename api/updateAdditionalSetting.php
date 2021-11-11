<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $shopId = $DecodedData['shopId'];
        $home_delivery = $DecodedData['home_delivery'];
        $min_order_val = $DecodedData['min_order_val'];
        
        if(empty($min_order_val))
        {
            $sql="UPDATE `shop_details` SET `home_delivery`='$home_delivery' WHERE `shopId`='{$shopId}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql);
            if($R)
            {
                echo 'success';
            	http_response_code(204);
            }
            else{
            	http_response_code(422);
            }
        }
        else
        {
            $sql="UPDATE `shop_details` SET `min_order_val`='$min_order_val' WHERE `shopId`='{$shopId}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql);
            if($R)
            {
                echo 'success';
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        }
        
    }
?>