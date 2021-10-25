<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
    // "ipv4: 192.168.1.6"
    // $timestamp = date('Y-m-d H:i:s');
    // $expires = strtotime('+7 days', strtotime($timestamp));
    // $iat = strtotime($timestamp);
    // $exp = strtotime(date('Y-m-d H:i:s', $expires));

    // $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    // $payload = json_encode(['iat' => $iat,'exp'=>$exp,'iss'=>'Fuse']);
    // $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
    // $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
    // $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
    // $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
    // $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
    // echo $jwt;

    $EncodedData=file_get_contents('php://input');

    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        //print_r($DecodedData);
        $email=$DecodedData['email'];
        $password=$DecodedData['password'];
        //$pass = substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyz"), 0, 6);
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
        

        $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$password' ";

        $check = mysqli_fetch_array(mysqli_query($CN,$Sql_Query));
        
        if(isset($check))
        {
            $user_id = $check['id'];
            $firstname = $check['firstname'];
            //echo $firstname;
            // $_SESSION["user_id"] = $check['id'];
            // $_SESSION["firstname"] = $check['firstname'];
            // $_SESSION["email"] = $check['email'];
            
            echo json_encode(
                array(
                    "message" => "Successful login",
                    "accessToken"=> $jwt,
                    "email"=>$email,
                    "firstname"=>$firstname,
                    "user_id"=>$user_id
                )
            );
            http_response_code(200);
        }
        else
        {
            //echo json_encode(array("message"=>"login failed"));
            http_response_code(401);
            
        }
    }
?>