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
    // $password = 'kashma9496';

    // $sql="INSERT INTO `tbl_user`(firstname,lastname,domainname,contact,email,password) values('$firstname','$lastname','$domainname','$contact','$email','$password')";
    // $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));

    // if($R)
    // {
    //     $subDomain = $domainname;
    //     include "subDomain/createSubDomain.php";
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

        $firstname = $DecodedData['name'];
        $contact = $DecodedData['contact'];
        $domainname= $DecodedData['company'];
        $email = $DecodedData['email'];
        $password = $DecodedData['password'];

         
        $sql="INSERT INTO `tbl_user`(firstname,domainname,contact,email,password) values('$firstname','$domainname','$contact','$email','$password')";
        $R=mysqli_query($CN,$sql);
    
        if($R)
        {
            $email = $DecodedData['email'];
            include "customers/sendMail.php";
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
        
    }
?>