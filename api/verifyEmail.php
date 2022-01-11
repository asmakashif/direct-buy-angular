<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store"); 
    
    
    // $password='Malatesh@1';
    // $encryptedPassword = base64_encode(json_encode($password));
    // echo $encryptedPassword;
    
    // $encryptedPassword = 'ImFzbWExMjM0Ig==';
    // $decryptedPassword = base64_decode($encryptedPassword);
    // echo json_decode($decryptedPassword);
    // die();
    $EncodedData=file_get_contents('php://input');

    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $email=$DecodedData['email'];
        
        $password=$DecodedData['password'];
        $encryptedPassword = base64_encode(json_encode($password));
        
        $rndno = rand(100000, 999999);

        require 'Email/PHPMailerAutoload.php';
        require 'Email/credential.php';

        $mail = new PHPMailer;

        // $mail->SMTPDebug = 4;                               // Enable verbose debug output

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = EMAIL;                 // SMTP username
        $mail->Password = PASS;                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        $mail->setFrom(EMAIL, 'Direct-buy');
        $mail->addAddress($email);     // Add a recipient

        $mail->addReplyTo(EMAIL);
        // print_r($_FILES['file']); exit;
        // for ($i=0; $i < count($_FILES['file']['tmp_name']) ; $i++) { 
        //  $mail->addAttachment($_FILES['file']['tmp_name'][$i], $_FILES['file']['name'][$i]);    // Optional name
        // }
        $mail->isHTML(true);                                  // Set email format to HTML

        $mail->Subject = 'Your One time password';
        $mail->Body    = 'The One Time Password for your account is ' .$rndno. '. - Regards, Direct-Buy';
        //$mail->AltBody = 'The One Time Password for your account is ' .$rndno. '. - Regards, Direct-Buy';

        if(!$mail->send()) {
            echo 'Message could not be sent.';
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        } else {
            
            $rndno;
            $sql="UPDATE `tbl_user` SET `otp`='$rndno' WHERE `email`='{$email}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
            if($R)
            {
                $user = [];
                $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$encryptedPassword' ";

                if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
                {
                    while($row = mysqli_fetch_assoc($result))
                    {
                        $user['id'] = $row['id'];
                        $user['email'] = $row['email'];
                        $decryptedPassword = base64_decode($row['password']);
                        $user['password'] = json_decode($decryptedPassword);
                        $user['otpVerify'] = $row['otpVerify'];
                    }

                    echo json_encode($user);
                }
                else
                {
                    http_response_code(404);
                }
            }
            else{
                http_response_code(422);
            }
        }
    }
?>