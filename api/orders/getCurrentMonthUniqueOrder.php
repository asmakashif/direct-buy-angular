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
    $uniqueorders = [];
    //$sql = "SELECT COUNT(*) From (Select * From order_items WHERE `shopId` = '{$shopId}' AND MONTH(order_placed_date) = MONTH(CURRENT_DATE) AND order_status = 0 GROUP BY order_items.order_code) As Z";

    $qry = "SELECT * From order_items WHERE `shopId` = '{$shopId}' AND MONTH(order_placed_date) = MONTH(CURRENT_DATE) AND order_status = 0 GROUP BY order_items.order_code";

    if($result = mysqli_query($CN,$qry))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $uniqueorders[$cr]['order_code'] = $row['order_code'];
            $uniqueorders[$cr]['c_fname'] = $row['c_fname'];
            $uniqueorders[$cr]['total'] = $row['total'];
            $uniqueorders[$cr]['order_placed_date'] = $row['order_placed_date'];
            $cr++;
            
        }
        
        echo json_encode($uniqueorders);
    }
    else
    {
        http_response_code(404);
    }

?>