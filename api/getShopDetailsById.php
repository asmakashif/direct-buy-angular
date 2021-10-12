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
    $shopId = $_GET['shopId'];
    $user_id = 12;
    //$shopId = 'i3s6wp';
    //print_r($shopId);

    $sql = "SELECT * FROM `shop_details`as sd JOIN `tbl_user` as tu ON tu.id=sd.user_id WHERE `shopId` = '$shopId' AND `user_id` = '$user_id'";
    //$sql = "SELECT * FROM `shop_details` WHERE `shopId` = '$shopId'  LIMIT 1 ";

    if($result = mysqli_query($CN,$sql))
    {
        //print_r($result);
        while($row = mysqli_fetch_assoc($result))
        {
            $users['shop_id'] = $row['shop_id'];
            $users['shopId'] = $row['shopId'];
            $users['shop_name'] = $row['shop_name'];
            $users['shop_address'] = $row['shop_address'];
            $users['shopType'] = $row['shopType'];
            $users['product_status'] = $row['product_status'];
            $users['payment_g_status'] = $row['payment_g_status'];
            $users['payment_status'] = $row['payment_status'];
            $users['productUpdate_status'] = $row['productUpdate_status'];
            $users['shop_payment_status'] = $row['shop_payment_status'];
            $users['trail_activate'] = $row['trail_activate'];
            $users['domainname'] = $row['domainname'];
            $users['shop_payment_status'] = $row['shop_payment_status'];
            
            
        }

        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }

?>