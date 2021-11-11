<?php
// $to_email = "chaithraramachandraa@gmail.com";
// $subject = "Simple Email Test via PHP";
// $body = "Hi, This is test email send by PHP Script";
// $headers = "From: haniarsc8@gmail.com";

// if (mail($to_email, $subject, $body, $headers)) {
//     echo "Email successfully sent to $to_email...";
// } else {
//     echo "Email sending failed...";
// }
$to = $email;
include('smtp/PHPMailerAutoload.php');
$html='Testing by AsmaKashif';
smtp_mailer($to,'subject',$html);
function smtp_mailer($to,$subject, $msg){
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
	$mail->AddAddress($to);
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
		http_response_code(201);
	}
}
?>