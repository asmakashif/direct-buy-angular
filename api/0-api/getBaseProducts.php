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

    $users = [];
    $sql = "SELECT * FROM base_products";

    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $users[$cr]['base_product_id'] = $row['base_product_id'];
            $users[$cr]['shop_type'] = $row['shop_type'];
            $users[$cr]['category'] = $row['category'];
            $users[$cr]['sub_category'] = $row['sub_category'];
            $users[$cr]['brand'] = $row['brand'];
            $users[$cr]['product_name'] = $row['product_name'];
            $users[$cr]['product_type'] = $row['product_type'];
            $users[$cr]['product_sub_type'] = $row['product_sub_type'];
            $users[$cr]['product_weight'] = $row['product_weight'];
            $users[$cr]['product_weight_type'] = $row['product_weight_type'];
            $users[$cr]['product_qty'] = $row['product_qty'];
            $users[$cr]['product_price'] = $row['product_price'];
            $users[$cr]['offer_price'] = $row['offer_price'];
            // $users[$cr]['product_img'] = $row['product_img'];
            // $users[$cr]['product_description'] = $row['product_description'];
            $cr++;
            //print_r($users);
        }

        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }

?>