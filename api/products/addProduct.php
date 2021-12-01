<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $shopId = $_GET['shopId'];
    $user_id = $_GET['user_id'];
    $product_name = 'A New Product';    

    $sql="INSERT INTO `temp_str_config`(user_id,temp_shopId,product_name) values('$user_id','$shopId','$product_name')";
    
    $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    
    if($R)
    {
        $last_id = $CN->insert_id;
        $sql = "SELECT * FROM `temp_str_config` WHERE `temp_str_config_id` = '$last_id'";

        if($result = mysqli_query($CN,$sql))
        {
            
            while($row = mysqli_fetch_assoc($result))
            {
                $product['temp_str_config_id'] = $row['temp_str_config_id'];
                //$product['id'] = $row['id'];
                // $product['temp_shopId'] = $row['temp_shopId'];
                $product['category'] = $row['category'];
                $product['sub_category'] = $row['sub_category'];
                $product['brand'] = $row['brand'];
                $product['product_name'] = $row['product_name'];
                $product['product_type'] = $row['product_type'];
                $product['product_sub_type'] = $row['product_sub_type'];
                $product['product_weight'] = $row['product_weight'];
                $product['product_weight_type'] = $row['product_weight_type'];
                $product['product_qty'] = $row['product_qty'];
                $product['product_price'] = $row['product_price'];
                $product['offer_price'] = $row['offer_price'];
                $product['product_status'] = $row['product_status'];
                
            }

            echo json_encode($product);
        }
        else
        {
            http_response_code(404);
        }
    }
    else{
        http_response_code(422);
    }
    
?>