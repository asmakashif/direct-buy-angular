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


    $qry = "SELECT oi.order_code,oi.shopId,oi.order_status FROM `order_items` as oi JOIN `shop_details` as sd ON sd.shopId=oi.shopId WHERE order_status = 1 GROUP BY order_code";
    
    $orders = [];
    if($result = mysqli_query($CN,$qry))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $orders[$cr]['order_code'] = $row['order_code'];
            $orders[$cr]['shopId'] = $row['shopId'];
            $orders[$cr]['order_status'] = $row['order_status'];
            $shopId = array_column($orders, 'shopId');
            $count = array_count_values($shopId);
            $cr++;
            //print_r($count);
        }
        echo json_encode($count);
    }
    else
    {
        http_response_code(404);
    }

?>