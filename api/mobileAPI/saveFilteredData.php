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

    $EncodedData=file_get_contents('php://input');
    
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $user_id=$DecodedData['user_id'];
        $shopId=$DecodedData['shopId'];
        $id=$DecodedData['base_product_id'];
        $base_product_id = "'" . implode ( "', '", $id ) . "'";

        $qry = "DELETE FROM `temp_str_config` WHERE  `temp_shopId` = '{$shopId}'";
        if(mysqli_query($CN,$qry))
        {
            $product = [];
            $sql="SELECT * FROM `base_products` WHERE `base_product_id` IN ($base_product_id)";
        
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
                $encode = json_encode($product);
                $decode=json_decode($encode);
                
                foreach($decode as $row) {
                    $base_product_id= $row->base_product_id;
                    $shop_type=$row->shop_type;
                    $category=$row->category;
                    $sub_category=$row->sub_category;
                    $brand=$row->brand;
                    $product_name=$row->product_name;
                    $product_type=$row->product_type;
                    $product_sub_type=$row->product_sub_type;
                    //$product_description = $row->product_description;
                    $product_weight=$row->product_weight;
                    $product_weight_type=$row->product_weight_type;
                    $product_qty=$row->product_qty;
                    $product_price=$row->product_price;
                    $offer_price=$row->offer_price;
                    //$product_img = $row->product_img;
                    $db_SKU = $category.$sub_category.$brand.$product_name.$product_type.$product_sub_type.$product_weight.$product_weight_type;

                    $qry1="INSERT INTO temp_str_config(user_id,temp_shopId,base_product_id,db_SKU,category,sub_category,brand,product_name,product_type,product_sub_type,product_weight,product_weight_type,product_qty,product_price,offer_price) values('$user_id','$shopId','$base_product_id','$db_SKU','$category','$sub_category','$brand','$product_name','$product_type','$product_sub_type','$product_weight','$product_weight_type','$product_qty','$product_price','$offer_price')";
            
                    $R=mysqli_query($CN,$qry1);
                    
                    if($R)
                    {
                        $qry2="UPDATE `shop_details` SET `product_status`=1 WHERE `shopId`='{$shopId}' ";

                        $R=mysqli_query($CN,$qry2);
                        if($R)
                        {
                            echo 'success';
                            http_response_code(204);
                        }
                        else{
                            http_response_code(422);
                        }
                        http_response_code(201);
                    }
                    else{
                        http_response_code(422);
                    }
                }
                http_response_code(201);
            }
            else{
                http_response_code(422);
            }
        }
        else{
            http_response_code(422);
        }
    }
?>