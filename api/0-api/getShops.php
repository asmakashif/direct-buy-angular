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
    $sql = "SELECT * FROM `shop_details`as sd JOIN `tbl_user` as tu ON tu.id=sd.user_id WHERE `user_id` = '$user_id' AND remove_shop=0 ";
    //$sql = "SELECT * FROM shop_details JOIN tbl_user";

    //$qry = "SELECT oi.order_code,oi.shopId,oi.order_status,sd.shop_id,sd.shop_name FROM `order_items` as oi JOIN `shop_details` as sd ON sd.shopId=oi.shopId WHERE order_status = 1 GROUP BY order_code";

    if($result = mysqli_query($CN,$sql))
    {
        
        $cr = 0;
        while($row1 = mysqli_fetch_assoc($result))
        {
            $users[$cr]['user_id'] = $row1['user_id'];
            $users[$cr]['shop_id'] = $row1['shop_id'];
            $users[$cr]['shopId'] = $row1['shopId'];
            $users[$cr]['shop_name'] = $row1['shop_name'];
            $users[$cr]['shop_address'] = $row1['shop_address'];
            $users[$cr]['shop_payment_status'] = $row1['shop_payment_status'];
            $users[$cr]['shop_payment_date'] = $row1['shop_payment_date'];
            $users[$cr]['shop_exp_date'] = $row1['shop_exp_date'];
            $users[$cr]['shop_status'] = $row1['shop_status'];
            $users[$cr]['trail_activate'] = $row1['trail_activate'];
            $users[$cr]['completed_orders'] = $row1['completed_orders'];
            $users[$cr]['pending_orders'] = $row1['pending_orders'];
            $users[$cr]['remove_shop'] = $row1['remove_shop'];
            // $shopId = (array_column($users, 'shopId'));
            // $count = array_count_values($shopId);
            $cr++;
        }
        echo json_encode($users);
        //echo json_encode($count);
    }
    else
    {
        http_response_code(404);
    }

    // if($result = mysqli_query($CN,$qry))
    // {
        
    //     $cr = 0;
    //     while($row2 = mysqli_fetch_assoc($result))
    //     {
    //         $orders[$cr]['order_code'] = $row2['order_code'];
    //         $orders[$cr]['shopId'] = $row2['shopId'];
    //         $orders[$cr]['order_status'] = $row2['order_status'];
    //         $shopId = (array_column($orders, 'shopId'));
    //         $count = array_count_values($shopId);
    //         $cr++;
    //     }
    //     echo json_encode($count);
    // }
    // else
    // {
    //     http_response_code(404);
    // }

?>