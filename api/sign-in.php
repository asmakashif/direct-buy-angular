<?php 
    session_start();
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
        
        // $deviceId=$DecodedData['deviceId'];
        $email=$DecodedData['email'];
        $password=$DecodedData['password'];
        $encryptedPassword = base64_encode(json_encode($password));
        $otp=$DecodedData['otp'];

        $timestamp = date('Y-m-d H:i:s');
        $expires = strtotime('+7 days', strtotime($timestamp));
        $iat = strtotime($timestamp);
        $exp = strtotime(date('Y-m-d H:i:s', $expires));

        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode(['iat' => $iat,'exp'=>$exp,'iss'=>'Fuse']);
        $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
        $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
        

        if(empty($otp)){
            $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$encryptedPassword' ";

            $check = mysqli_fetch_array(mysqli_query($CN,$Sql_Query));
            
            if(isset($check))
            {
                $user_id = $check['id'];  
                $firstname = $check['firstname'];
                $domainname = $check['domainname'];
                
                echo json_encode(
                    array(
                        "message" => "Successful login",
                        "accessToken"=> $jwt,
                        "email"=>$email,
                        "firstname"=>$firstname,
                        "user_id"=>$user_id,
                        "domainname"=>$domainname,
                    )
                );
                http_response_code(200);
                   
            }
            else
            {
                http_response_code(401);
                
            }
        }
        else
        {
            $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$encryptedPassword' and `otp` = '$otp' ";

            $check = mysqli_fetch_array(mysqli_query($CN,$Sql_Query));
            
            if(isset($check))
            {
                $user_id = $check['id'];
                
                $qry="UPDATE `tbl_user` SET `otpVerify`=1 WHERE `id`='{$user_id}' LIMIT 1  ";
                if(mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
                {
                    $sql = "SELECT * from `tbl_user` WHERE `id`='{$user_id}' ";
                    $res = mysqli_fetch_array(mysqli_query($CN,$sql)) or die("database error:". mysqli_error($CN));
                    if(isset($res))
                    {
                        $user_id = $res['id'];
                        $firstname = $res['firstname'];
                        $domainname = $res['domainname'];
                        
                        echo json_encode(
                            array(
                                "message" => "Successful login",
                                "accessToken"=> $jwt,
                                "email"=>$email,
                                "firstname"=>$firstname,
                                "user_id"=>$user_id,
                                "domainname"=>$domainname,
                            )
                        );
                        http_response_code(200);
                    }
                }
                else{
                    http_response_code(422);
                }
            }
            else
            {
                http_response_code(401);
            }
        }
    }
?>