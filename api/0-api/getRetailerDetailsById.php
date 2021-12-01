<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $retailer = [];

    $user_id = $_GET['user_id'];

    $sql = "SELECT * FROM `tbl_user`as tu  WHERE `id` = '$user_id'";

    if($result = mysqli_query($CN,$sql))
    {
        while($row = mysqli_fetch_assoc($result))
        {
            $retailer['firstname'] = $row['firstname'];
            $retailer['lastname'] = $row['lastname'];
            $retailer['domainname'] = $row['domainname'];
            $retailer['contact'] = $row['contact'];
            $retailer['email'] = $row['email'];
            $retailer['password'] = $row['password'];
            $retailer['address'] = $row['address'];
            $retailer['logo'] = $row['logo'];
            $retailer['str_msg'] = $row['str_msg'];
            $retailer['deviceId'] = $row['deviceId'];
        }

        echo json_encode($retailer);
    }
    else
    {
        http_response_code(404);
    }

?>