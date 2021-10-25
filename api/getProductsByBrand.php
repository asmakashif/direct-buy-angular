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

    // $string = 'Sammy says: "This string\'s in single quotes."' ;
    // echo $string;
    
    $EncodedData=file_get_contents('php://input');
    //print_r($EncodedData);

    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        
        $brand=$DecodedData['brand'];
        $brand = "'" . implode ( "', '", $brand ) . "'";
        //$ids = implode(', ', $shopType);

        $product = [];
        $sql="SELECT * FROM `base_products` WHERE `brand` IN ($brand)";
        //$sql = "SELECT category FROM base_products WHERE shop_type IN (".$ids.") GROUP BY category ";
        //echo $sql;
    
        if($result=mysqli_query($CN,$sql))
        {
            $cr = 0;
            while($row = mysqli_fetch_assoc($result))
            {
                $product[$cr]['base_product_id'] = $row['base_product_id'];
                $product[$cr]['shop_type'] = $row['shop_type'];
                $product[$cr]['category'] = $row['category'];
                $product[$cr]['sub_category'] = $row['sub_category'];
                $product[$cr]['brand'] = $row['brand'];
                $product[$cr]['product_name'] = $row['product_name'];
                $product[$cr]['product_type'] = $row['product_type'];
                $product[$cr]['product_sub_type'] = $row['product_sub_type'];
                $product[$cr]['product_weight'] = $row['product_weight'];
                $product[$cr]['product_weight_type'] = $row['product_weight_type'];
                $product[$cr]['product_qty'] = $row['product_qty'];
                $product[$cr]['product_price'] = $row['product_price'];
                $product[$cr]['offer_price'] = $row['offer_price'];
                $cr++;
            }

            echo json_encode($product);
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
    }
?>