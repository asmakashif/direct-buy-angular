<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    
        
    $orders = [];

    $sql = "SELECT * FROM `order_items` WHERE order_status = 0 GROUP BY order_code ";

    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $orders[$cr]['order_code'] = $row['order_code'];
            $orders[$cr]['c_fname'] = $row['c_fname'];
            $orders[$cr]['total'] = $row['total'];
            $orders[$cr]['order_placed_date'] = $row['order_placed_date'];
            $cr++;
        }

        echo json_encode($orders);
    }
    else
    {
        http_response_code(404);
    }
    

?>