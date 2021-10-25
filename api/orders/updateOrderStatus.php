<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $shops = [];
    $order_code = $_GET['order_code'];
    $shopId = $_GET['shopId'];
    // $order_code = 'A000003';
    // $shopId = 'i3s6wp';

    $sql="UPDATE `order_items` SET `order_status`=1 WHERE `order_code`='{$order_code}' ";

    $R=mysqli_query($CN,$sql);
    if($R)
    {
        $count = mysqli_query($CN, "SELECT completed_orders FROM shop_details WHERE `shopId` = '$shopId'");
        $total = 0;
        while($row = mysqli_fetch_assoc($count)) {
            $total += $row['completed_orders'];
        }
        $total;
        
        $qry="UPDATE `shop_details` SET `completed_orders` = 1 + '{$total}'  WHERE `shopId`='{$shopId}' LIMIT 1  ";
        if(mysqli_query($CN,$qry))
        {
            $pending = mysqli_query($CN, "SELECT * FROM shop_details WHERE `shopId` = '$shopId'");
        
            while($row = mysqli_fetch_assoc($pending)) {
                $shops['total_orders'] = $row['total_orders'];
                $shops['completed_orders'] = $row['completed_orders'];
            }
            $total = $shops['total_orders'];
            $completed = $shops['completed_orders'];
            $pending = $total-$completed;
            
            $qry="UPDATE `shop_details` SET `pending_orders` = '{$pending}' WHERE `shopId`='{$shopId}' LIMIT 1  ";
            if(mysqli_query($CN,$qry))
            {
                http_response_code(204);
            }
            else{
             http_response_code(422);
            }
        }
        else{
         http_response_code(422);
        }
    }
    else{
        http_response_code(422);
    }

?>