<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    //$users = [];
    $order_code = $_GET['order_code'];
    //$order_code = 'A000000';

    $sql = "SELECT * FROM `order_items` as oi JOIN `cust_payment_details` as cpd ON cpd.order_code=oi.order_code WHERE oi.order_code = '$order_code' AND cpd.payment_status = 1 GROUP BY oi.order_code";

    if($result = mysqli_query($CN,$sql))
    {
        
        while($row = mysqli_fetch_assoc($result))
        {
            $orders['order_code'] = $row['order_code'];
            $orders['c_fname'] = $row['c_fname'];
            $orders['total'] = $row['total'];
            $orders['order_placed_date'] = $row['order_placed_date'];
        }

        echo json_encode($orders);
    }
    else
    {
        http_response_code(404);
    }

?>