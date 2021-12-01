<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
    
    // $password='asma1234';
    // $encryptedPassword = base64_encode(json_encode($password));
    // $decryptedPassword = base64_decode($encryptedPassword);
    // echo json_decode($decryptedPassword);

    $EncodedData=file_get_contents('php://input');

    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $email=$DecodedData['email'];
        $password=$DecodedData['password'];
        $encryptedPassword = base64_encode(json_encode($password));
        

        $user = [];
        $Sql_Query = "SELECT * from `tbl_user` WHERE `email` = '$email' and `password` = '$encryptedPassword' ";

        if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
        {
            while($row = mysqli_fetch_assoc($result))
            {
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
?>