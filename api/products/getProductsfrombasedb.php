<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $shopId = $_GET['shopId'];
    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    //print_r($shopId);
    //$shopId = 'GqcVjE';
    //print_r($shopId);
    $products=[];

    $sql = "SELECT * FROM `temp_str_config` WHERE `temp_shopId` = '$shopId' ORDER BY temp_str_config_id DESC";

    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $products[$cr]['temp_str_config_id'] = $row['temp_str_config_id'];
            //$products[$cr]['id'] = $row['id'];
            // $products[$cr]['temp_shopId'] = $row['temp_shopId'];
            $products[$cr]['category'] = $row['category'];
            $products[$cr]['sub_category'] = $row['sub_category'];
            $products[$cr]['brand'] = $row['brand'];
            $products[$cr]['product_name'] = $row['product_name'];
            $products[$cr]['product_type'] = $row['product_type'];
            $products[$cr]['product_sub_type'] = $row['product_sub_type'];
            $products[$cr]['product_weight'] = $row['product_weight'];
            $products[$cr]['product_weight_type'] = $row['product_weight_type'];
            $products[$cr]['product_qty'] = $row['product_qty'];
            $products[$cr]['product_price'] = $row['product_price'];
            $products[$cr]['offer_price'] = $row['offer_price'];
            $products[$cr]['product_img'] = $row['product_img'];
            $products[$cr]['upload_format'] = $row['upload_format'];
            $products[$cr]['product_status'] = $row['product_status'];
            $cr++;
        }

        echo json_encode($products);
    }
    else
    {
        http_response_code(404);
    }
?>