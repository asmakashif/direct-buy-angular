<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    
        $id = $_POST['id'];
        //print_r($id);
        $users = [];

        $sql = "SELECT * FROM `base_products` WHERE `base_product_id` = '$id' ";

        if($result = mysqli_query($CN,$sql))
        {
            $cr = 0;
            while($row = mysqli_fetch_assoc($result))
            {
                $users['base_product_id'] = $row['base_product_id'];
                $users['shop_type'] = $row['shop_type'];
                $users['category'] = $row['category'];
                $users['sub_category'] = $row['sub_category'];
                $users['brand'] = $row['brand'];
                $users['product_name'] = $row['product_name'];
                $users['product_type'] = $row['product_type'];
                $users['product_sub_type'] = $row['product_sub_type'];
                $users['product_weight'] = $row['product_weight'];
                $users['product_weight_type'] = $row['product_weight_type'];
                $users['product_qty'] = $row['product_qty'];
                $users['product_price'] = $row['product_price'];
                $users['offer_price'] = $row['offer_price'];
            }

            echo json_encode($users);
        }
        else
        {
            http_response_code(404);
        }
    

?>