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

        $shop_id = $DecodedData['shop_id'];
        $shopId = $DecodedData['shopId'];
        $shop_name=$DecodedData['shop_name'];
        $shop_address=$DecodedData['shop_address'];
        $shop_gst=$DecodedData['shop_gst'];

        $sql="UPDATE `shop_details` SET `shopId`='$shopId',`shop_name`='$shop_name',`shop_address`='$shop_address',`shop_gst`='$shop_gst' WHERE `shopId`='{$shopId}' LIMIT 1  ";

        $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
        if($R)
        {
        	http_response_code(204);
        }
        else{
        	http_response_code(422);
        }
    }
?>