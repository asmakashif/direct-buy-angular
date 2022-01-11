<?php 
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
include('smtp/PHPMailerAutoload.php');
// $user=[];
// while($row = mysqli_fetch_assoc($result))
// {
//     $user['id'] = $row['id'];
//     $user['email'] = $row['email'];
//     $decryptedPassword = base64_decode($row['password']);
//     $user['password'] = json_decode($decryptedPassword);
//     $user['otpVerify'] = $row['otpVerify'];
// }

// echo json_encode($user);
$EncodedData=file_get_contents('php://input');

if(isset($EncodedData) && !empty($EncodedData))
{
    $DecodedData=json_decode($EncodedData,true);

    $email=$DecodedData['email'];
    $password=$DecodedData['password'];
    $encryptedPassword = base64_encode(json_encode($password));
    
    $email;
    $rndno = rand(100000, 999999);
    $html = 'The One Time Password for your account is ' .$rndno. '. - Regards, Direct-Buy';
    smtp_mailer($email,'subject',$html,$rndno);
    function smtp_mailer($email,$subject,$msg,$rndno)
    {
        $mail = new PHPMailer(); 
        $mail->SMTPDebug  = 3;
        $mail->IsSMTP(); 
        $mail->SMTPAuth = true; 
        $mail->SMTPSecure = 'tls'; 
        $mail->Host = "smtp.gmail.com";
        $mail->Port = 587; 
        $mail->IsHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Username = "haniarsc8@gmail.com";
        $mail->Password = "Hani.arsc@123";
        $mail->SetFrom("haniarsc8@gmail.com");
        $mail->Subject = $subject;
        $mail->Body =$msg;
        $mail->AddAddress($email);
        $mail->SMTPOptions=array('ssl'=>array(
            'verify_peer'=>false,
            'verify_peer_name'=>false,
            'allow_self_signed'=>false
        ));
        if(!$mail->Send()){
            // echo $mail->ErrorInfo;
            http_response_code(422);
        }else
        {
            $CN= mysqli_connect("localhost","root","");
            $DB=mysqli_select_db($CN,"formal_store"); 
            $rndno;
            

            $sql="UPDATE `tbl_user` SET `otp`='$rndno' WHERE `email`='{$email}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
            if($R)
            {
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        }
    }
}
?>