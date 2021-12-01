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

    // $string = 'Sammy says: "This string\'s in single quotes."' ;
    // echo $string;

    // $sql="INSERT INTO `payment_integration`(payment_name) values('Asma''s Paytm')";
        
    // $R=mysqli_query($CN,$sql);
    
    // if($R)
    // {
    //     echo 'success';
    //     http_response_code(201);
    // }
    // else{
    //     http_response_code(422);
    // }

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        //print_r($DecodedData);
        //die();
        $user_id = $DecodedData['user_id'];
        $provider_type=$DecodedData['provider_type'];
        $str=$DecodedData['payment_name'];
        $payment_name = addslashes($str);
        $payment_api_key=$DecodedData['payment_api_key'];
        $payment_secret_key=$DecodedData['payment_secret_key'];
        $transaction_note=$DecodedData['transaction_note'];
        $merchant_code=$DecodedData['merchant_code'];
        $salt_index=$DecodedData['salt_index'];
        $paytm="assets/icons/paytm.png";
        $gpay="assets/icons/gpay.png";
        $cod = "assets/icons/cod.png";
        $phonepe = "assets/icons/phonepe.png";
        
        $qry = "SELECT * FROM `payment_integration`as pi WHERE `user_id` = '$user_id' AND `payment_name` = '$payment_name' ";
        $res=mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN));
            

        if(mysqli_num_rows($res) > 0)
        {
            echo 0;
            http_response_code(422);
        }
        else
        {
            if($provider_type=='GooglePay')
            {
                $sql="INSERT INTO `payment_integration`(user_id,provider_type,provider_img,payment_name,payment_api_key,payment_secret_key,transaction_note,merchant_code) values('$user_id','$provider_type','$gpay','$payment_name','$payment_api_key','$payment_secret_key','$transaction_note','$merchant_code')";
            
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
            
            elseif($provider_type=='Phonepe'){
                $sql="INSERT INTO `payment_integration`(user_id,provider_type,provider_img,payment_name,payment_api_key,payment_secret_key,salt_index) values('$user_id','$provider_type','$phonepe','$payment_name','$payment_api_key','$payment_secret_key','$salt_index')";
            
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
            elseif($provider_type=='Paytm'){
                $sql="INSERT INTO `payment_integration`(user_id,provider_type,provider_img,payment_name,payment_api_key,payment_secret_key) values('$user_id','$provider_type','$paytm','$payment_name','$payment_api_key','$payment_secret_key')";
            
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
            else
            {
                http_response_code(422);
            }
        }
        
    }
?>