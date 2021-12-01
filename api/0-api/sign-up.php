<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
    
    // $firstname = 'Kashif';
    // $lastname = 'Ahmed';
    // $domainname= 'kashma';
    // $contact = '6363680531';
    // $email = 'kashif.ahmed96@gmail.com';
    // $password = 'kashif1234';
    // $base64 = base64_encode(json_encode($password));
    // print_r($base64);
    // die();

    // $sql="INSERT INTO `tbl_user`(firstname,lastname,domainname,contact,email,password) values('$firstname','$lastname','$domainname','$contact','$email','$password')";
    // $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));

    // if($R)
    // {
    //     $email = 'kashif.ahmed96@gmail.com';
    //     $last_id = $CN->insert_id;
        
    //     include "customers/sendMail.php";
    //     //echo 'success';
    //     http_response_code(201);
        
    // }
    // else{
    //     http_response_code(422);
    // }

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $firstname = $DecodedData['name'];
        $contact = $DecodedData['contact'];
        $domainname= $DecodedData['company'];
        $email = $DecodedData['email'];
        $password = $DecodedData['password'];
        $encryptedPassword = base64_encode(json_encode($password));
         
        $sql="INSERT INTO `tbl_user`(firstname,domainname,contact,email,password) values('$firstname','$domainname','$contact','$email','$encryptedPassword')";
        $R=mysqli_query($CN,$sql);
    
        if($R)
        {
            $email = $DecodedData['email'];
            $last_id = $CN->insert_id;
            include "customers/sendMail.php";
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
    }
?>