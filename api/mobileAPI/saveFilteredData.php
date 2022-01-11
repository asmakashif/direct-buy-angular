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
        
        
        $product = [];
        $sql="SELECT * FROM `base_products` WHERE `base_product_id` IN ($base_product_id)";
    
        if($result=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN)))
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
                $product[$cr]['product_description'] = $row['product_description'];
                $product[$cr]['product_weight'] = $row['product_weight'];
                $product[$cr]['product_weight_type'] = $row['product_weight_type'];
                $product[$cr]['product_qty'] = $row['product_qty'];
                $product[$cr]['product_price'] = $row['product_price'];
                $product[$cr]['offer_price'] = $row['offer_price'];
                $product[$cr]['product_img'] = $row['product_img'];
                
                $cr++;
            }
            $encode = json_encode($product);
            $decode=json_decode($encode);
            //echo $decode;
            foreach($decode as $row) {
                //echo $row;
            
                $base_product_id= $row->base_product_id;
                $shop_type=addslashes($row->shop_type);
                $category=addslashes($row->category);
                $sub_category=addslashes($row->sub_category);
                $brand=addslashes($row->brand);
                $product_name=addslashes($row->product_name);
                $product_type=addslashes($row->product_type);
                $product_sub_type=addslashes($row->product_sub_type);
                $product_description = addslashes($row->product_description);
                $product_weight=$row->product_weight;
                $product_weight_type=addslashes($row->product_weight_type);
                $product_qty=$row->product_qty;
                $product_price=$row->product_price;
                $offer_price=$row->offer_price;
                $product_img = addslashes($row->product_img);
                $upload_format=0;
                $product_added_date = date('Y-m-d');
                $product_updated_date = date('Y-m-d');
                $product_status = 1;
                $db_SKU = $category.$sub_category.$brand.$product_name.$product_type.$product_sub_type.$product_weight.$product_weight_type;

                $qry1="INSERT INTO temp_str_config(user_id,temp_shopId,base_product_id,db_SKU,shop_type,category,sub_category,brand,product_name,product_type,product_sub_type,product_description,product_weight,product_weight_type,product_qty,product_price,offer_price,product_img,upload_format,product_added_date,product_updated_date,product_status) values('$user_id','$shopId','$base_product_id','$db_SKU','$shop_type','$category','$sub_category','$brand','$product_name','$product_type','$product_sub_type','$product_description','$product_weight','$product_weight_type','$product_qty','$product_price','$offer_price','$product_img','$upload_format','$product_added_date','$product_updated_date','$product_status')";
        
                $R=mysqli_query($CN,$qry1) or die("database error:". mysqli_error($CN));
                
                if($R)
                {
                    $qry2="UPDATE `shop_details` SET `product_status`=1 WHERE `shopId`='{$shopId}' ";

                    $R=mysqli_query($CN,$qry2) or die("database error:". mysqli_error($CN));
                    if($R)
                    {
                        http_response_code(204);
                    }
                    else{
                        http_response_code(422);
                    }
                }
                else{
                    http_response_code(422);
                }
            }
            die();
        }
        else{
            http_response_code(422);
        }
        
    }
?>