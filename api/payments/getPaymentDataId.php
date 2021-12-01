<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $users = [];
    $payment_id = $_GET['payment_id'];
    $user_id = $_GET['user_id'];
    // $payment_id = 3;
    // $user_id = 5;
    

    $sql = "SELECT * FROM `payment_integration`as pi WHERE `payment_id` = '$payment_id' AND `user_id` = '$user_id'";

    if($result = mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN)))
    {
        while($row = mysqli_fetch_assoc($result))
        {
            $users['payment_id'] = $row['payment_id'];
            $users['provider_type'] = $row['provider_type'];
            $users['provider_img'] = $row['provider_img'];
            $users['payment_name'] = $row['payment_name'];
            $users['payment_api_key'] = $row['payment_api_key'];
            $users['payment_secret_key'] = $row['payment_secret_key'];
            $users['transaction_note'] = $row['transaction_note'];
            $users['merchant_code'] = $row['merchant_code'];
            $users['salt_index'] = $row['salt_index'];
            $users['attachToStr'] = $row['attachToStr'];
            $users['payment_added_date'] = $row['payment_added_date'];
            $users['payment_status'] = $row['payment_status'];
        }

        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }

?>