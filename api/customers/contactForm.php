<?php 
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

        $name=$DecodedData['name'];
        $contact=$DecodedData['contact'];
        $sub=$DecodedData['subject'];
        $msg=$DecodedData['message'];

        $to = 'info@direct-buy.in';
        $subject = 'Enquiry By - ' . $name;
        
        $message    = 
        "   Customer Details
            Name :".$name."
            Mobile Number :".$contact."
            Subject :".$sub."
            Message :".$msg."
        ";

        $headers = 'From: info@direct-buy.in' . "\r\n" .

        'Reply-To: info@direct-buy.in' . "\r\n" .

        'X-Mailer: PHP/' . phpversion();

        mail($to, $subject, $message, $headers);

        if(true)
        {
            echo 'success';
        }
        else{
            http_response_code(422);
        }
    }
?>