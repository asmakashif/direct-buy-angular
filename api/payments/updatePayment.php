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
        
        $payment_id = $DecodedData['payment_id'];
        $provider_type = $DecodedData['provider_type'];
        $payment_name=$DecodedData['payment_name'];
        $payment_api_key=$DecodedData['payment_api_key'];
        $payment_secret_key=$DecodedData['payment_secret_key'];
        $transaction_note=$DecodedData['transaction_note'];
        $merchant_code=$DecodedData['merchant_code'];
        $salt_index=$DecodedData['salt_index'];
        
        if(empty($transaction_note))
        {
            $sql="UPDATE `payment_integration` SET `payment_name`='$payment_name',`payment_api_key`='$payment_api_key',`payment_secret_key`='$payment_secret_key',`merchant_code`='$merchant_code',`salt_index`='$salt_index' WHERE `payment_id`='{$payment_id}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
            if($R)
            {
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        }
        else
        {
            $sql="UPDATE `payment_integration` SET `payment_name`='$payment_name',`payment_api_key`='$payment_api_key',`payment_secret_key`='$payment_secret_key',`merchant_code`='$merchant_code',`transaction_note`='$transaction_note',`salt_index`='$salt_index' WHERE `payment_id`='{$payment_id}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
            if($R)
            {
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        }

        
    }
?>