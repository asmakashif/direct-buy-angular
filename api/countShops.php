<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $user_id = $_GET['user_id'];
    //$user_id = 5;
    $sql = "SELECT * FROM shop_details WHERE `user_id` = '$user_id' ";

    if($result = mysqli_query($CN,$sql))
    {
        $rowcount = mysqli_num_rows( $result );
        echo json_encode($rowcount);
        // $row = mysqli_fetch_array($result);
        // $total = $row;
        // echo json_encode($total);

        //echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }

?>