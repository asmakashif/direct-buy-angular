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

        $shopId=$DecodedData['shopId'];
        $product_status = 1;


        $sql="UPDATE `shop_details` SET `product_status`='$product_status' WHERE `shopId`='{$shopId}' ";

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
    
?>