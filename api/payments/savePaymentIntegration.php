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
        $user_id = $DecodedData['user_id'];
        $provider_type=$DecodedData['provider_type'];
        $payment_name=$DecodedData['payment_name'];
        $payment_api_key=$DecodedData['payment_api_key'];
        $payment_secret_key=$DecodedData['payment_secret_key'];


        
        
        $sql="INSERT INTO `payment_integration`(user_id,provider_type,payment_name,payment_api_key,payment_secret_key) values('$user_id','$provider_type','$payment_name','$payment_api_key','$payment_secret_key')";
        
        $R=mysqli_query($CN,$sql);
        
        if($R)
        {
            //http_response_code(201);
            $qry="UPDATE `tbl_user` SET `payment_g_status`=1 WHERE `id`= 5 LIMIT 1  ";
            if($result=mysqli_query($CN,$qry))
            {
                http_response_code(201);
            }
            else
            {
                http_response_code(422);
            }
            
        }
        else{
            http_response_code(422);
        }
    }
?>