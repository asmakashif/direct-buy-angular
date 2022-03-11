<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store"); 
    
    
    // $password='ThisIs@StrongP@ssw0rd';
    // $encryptedPassword = base64_encode(json_encode($password));
    // echo $encryptedPassword;
    
    // $encryptedPassword = 'Ik5vdmVtYmVyIg==';
    // $decryptedPassword = base64_decode($encryptedPassword);
    // echo $decryptedPassword;
    // die();

    // Hani.arsc@123
    
    $EncodedData=file_get_contents('php://input');

    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $email=$DecodedData['email'];
        
        $password=$DecodedData['password'];
        $encryptedPassword = base64_encode(json_encode($password));
        
        $rndno = rand(100000, 999999);

        
        $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$encryptedPassword' and `remove_user` = 0 ";

        $check = mysqli_fetch_array(mysqli_query($CN,$Sql_Query));
        
        if(isset($check))
        {
            $user_id = $check['id'];  
            $firstname = $check['firstname'];
            $domainname = $check['domainname'];
            
            echo json_encode(
                array(
                    "message" => "Successful login",
                    "email"=>$email,
                    "firstname"=>$firstname,
                    "user_id"=>$user_id,
                    "domainname"=>$domainname,
                )
            );
            $sql="UPDATE `tbl_user` SET `otp`='$rndno' WHERE `email`='{$email}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
            if($R)
            {
                http_response_code(200);
            }
            else{
                http_response_code(401);
            }
               
        }
        else
        {
            http_response_code(401);
            
        }

        // if(!$mail->send()) {
        //     echo 'Message could not be sent.';
        //     echo 'Mailer Error: ' . $mail->ErrorInfo;
        // } else {
            
        //     $rndno;
        //     $sql="UPDATE `tbl_user` SET `otp`='$rndno' WHERE `email`='{$email}' LIMIT 1  ";

        //     $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
        //     if($R)
        //     {
        //         $user = [];
        //         $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$encryptedPassword' ";

        //         if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
        //         {
        //             while($row = mysqli_fetch_assoc($result))
        //             {
        //                 $user['id'] = $row['id'];
        //                 $user['email'] = $row['email'];
        //                 $decryptedPassword = base64_decode($row['password']);
        //                 $user['password'] = json_decode($decryptedPassword);
        //                 $user['otpVerify'] = $row['otpVerify'];
        //             }

        //             echo json_encode($user);
        //         }
        //         else
        //         {
        //             http_response_code(404);
        //         }
        //     }
        //     else{
        //         http_response_code(422);
        //     }
        // }
    }
?>