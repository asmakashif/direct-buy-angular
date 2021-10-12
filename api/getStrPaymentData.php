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
    //$shopId = 'zaSBHA';
    $user_id = 12;
    
    $sql = "SELECT * FROM `shop_payment_info`as spi WHERE `pInfo_shopId` = '$shopId' AND `pInfo_userId` = '$user_id'";
    //$sql = "SELECT * FROM `shop_details` WHERE `shopId` = '$shopId'  LIMIT 1 ";

    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $users[$cr]['shop_pInfo_id'] = $row['shop_pInfo_id'];
            $users[$cr]['pInfo_shopId'] = $row['pInfo_shopId'];
            $users[$cr]['pInfo_payment_name'] = $row['pInfo_payment_name'];
            $users[$cr]['default_payment'] = $row['default_payment'];
            $cr++;
        }

        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }

?>