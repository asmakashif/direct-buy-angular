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

    $orders = [];
    $user_id = $_GET['user_id'];
    $sql = "SELECT * FROM `payment_integration`as pi JOIN `tbl_user` as tu ON tu.id=pi.user_id WHERE `user_id` = '$user_id' ";

    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row1 = mysqli_fetch_assoc($result))
        {
            $users[$cr]['user_id'] = $row1['user_id'];
            $users[$cr]['payment_name'] = $row1['payment_name'];
            
            $cr++;
        }
        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }
?>