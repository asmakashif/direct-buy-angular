<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");


    $order_code = $_GET['order_code'];
    $shopId = $_GET['shopId'];
    // $order_code = 'A000004';
    // $shopId = 'zaSBHA';

    $orders = [];
    //$sql = "SELECT oi.order_code,oi.product_qty,oi.product_subtotal,tsc.product_name,tsc.product_price FROM `order_items` as oi JOIN `cust_payment_details` as cpd ON cpd.order_code=oi.order_code JOIN `temp_str_config` as tsc ON tsc.base_product_id=oi.product_id WHERE oi.order_code = '$order_code' and tsc.temp_shopId = '$shopId' ";

    $sql = "SELECT oi.order_code,oi.product_qty,oi.product_subtotal,tsc.product_name,tsc.product_price FROM `order_items` as oi JOIN `cust_payment_details` as cpd ON cpd.order_code=oi.order_code JOIN `base_products` as tsc ON tsc.base_product_id=oi.product_id WHERE oi.order_code = '$order_code' AND cpd.payment_status = 1 ";


    if($result = mysqli_query($CN,$sql))
    {
        
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $orders[$cr]['product_name'] = $row['product_name'];
            $orders[$cr]['product_price'] = $row['product_price'];
            $orders[$cr]['product_qty'] = $row['product_qty'];
            $orders[$cr]['product_subtotal'] = $row['product_subtotal'];
            $cr++;
            
        }
        
        echo json_encode($orders);
        
    }
    else
    {
        http_response_code(404);
    }

?>