<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    // print_r(date('Y-m-d',strtotime("-1 days")));
    // die();

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $shopId = $_GET['shopId'];
    $today=date('Y-m-d');
    //$shopId = 'i3s6wp';
    
    $sql = "SELECT * From order_items as oi JOIN `cust_payment_details` as cpd ON cpd.order_code=oi.order_code WHERE oi.shopId = '{$shopId}' AND oi.order_fulfilled_date = '{$today}' AND oi.order_status = 1 AND cpd.payment_status = 1 GROUP BY oi.order_code";

    if($result = mysqli_query($CN,$sql))
    {
        $rowcount = mysqli_num_rows( $result );
        echo json_encode($rowcount);
    }
    else
    {
        http_response_code(404);
    }

    // $sql = "SELECT COUNT(*) From (Select * From order_items as oi JOIN `cust_payment_details` as cpd ON cpd.order_code=oi.order_code WHERE oi.shopId = '{$shopId}' AND oi.order_fulfilled_date = '{$today}' AND oi.order_status = 1 GROUP BY oi.order_code) As Z";
    
    // if($result = mysqli_query($CN,$sql))
    // {
    //     $row = mysqli_fetch_array($result);
    //     $total = $row[0];
    //     echo json_encode($total);
    // }
    // else
    // {
    //     http_response_code(404);
    // }

?>