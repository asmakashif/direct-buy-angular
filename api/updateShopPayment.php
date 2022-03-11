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
        // print_r($DecodedData['shop_payment_id']);
        // die();
        $shopId = $DecodedData['shopId'];
        $shop_payment_amount=$DecodedData['shop_payment_amount'];
        $shop_payment_id=$DecodedData['shop_payment_id']['razorpay_payment_id'];
        $shop_payment_date=date('Y-m-d');
        $shop_exp_date = date('Y-m-d', strtotime('+1 years'));

        $sql="UPDATE `shop_details` SET `shop_payment_amount`='$shop_payment_amount',`shop_payment_id`='$shop_payment_id',`shop_payment_date`='$shop_payment_date',`shop_exp_date`='$shop_exp_date',`shop_payment_status`=1,`shop_status`=1 WHERE `shopId`='{$shopId}' LIMIT 1  ";

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