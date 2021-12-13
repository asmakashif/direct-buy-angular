<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


// $to = $email;
// $last_id;
$to = 'chaithraramachandraa@gmail.com';
include('smtp/PHPMailerAutoload.php');
//$html='Testing';
$rndno = rand(100000, 999999);
$html = 'The One Time Password for your account is ' .$rndno. '. - Regards, Direct-Buy';
smtp_mailer($to,'subject',$html,$rndno);
function smtp_mailer($to,$subject, $msg,$rndno)
{
	//$id = $last_id;
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
		// $CN= mysqli_connect("localhost","root","");
		// $DB=mysqli_select_db($CN,"formal_store"); 
		// $id;
		// $rndno;

		// $sql="UPDATE `tbl_user` SET `otp`='$rndno' WHERE `id`='{$id}' LIMIT 1  ";

  //       $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
  //       if($R)
  //       {
  //       	echo 'success';
  //       	http_response_code(204);
  //       }
  //       else{
  //       	http_response_code(422);
  //       }
	}
}
?>