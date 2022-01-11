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

    $shopId = $_GET['shopId'];
    //$shopId = 'i3s6wp';
    
    $fulfilledorders = [];

    $sql = "SELECT * From order_items as oi JOIN `cust_payment_details` as cpd ON cpd.order_code=oi.order_code WHERE oi.shopId = '{$shopId}' AND MONTH(oi.order_placed_date) = MONTH(CURRENT_DATE - INTERVAL 1 MONTH) AND oi.order_status = 1 AND cpd.payment_status = 1 GROUP BY oi.order_code";
    
    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $fulfilledorders[$cr]['order_code'] = $row['order_code'];
            $fulfilledorders[$cr]['c_fname'] = $row['c_fname'];
            $fulfilledorders[$cr]['total'] = $row['total'];
            $fulfilledorders[$cr]['order_placed_date'] = $row['order_placed_date'];
            $cr++;
            
        }
        
        echo json_encode($fulfilledorders);
    }
    else
    {
        http_response_code(404);
    }

?>