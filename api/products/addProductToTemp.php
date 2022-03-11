<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");


    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        //print_r($DecodedData);
        $user_id = $DecodedData['user_id'];
        $temp_shopId = $DecodedData['temp_shopId'];
        $base_product_id=0;
        $category = $DecodedData['category'];
        $sub_category=$DecodedData['sub_category'];
        $brand=$DecodedData['brand'];
        $product_name=$DecodedData['product_name'];
        $product_type=$DecodedData['product_type'];
        $product_sub_type=$DecodedData['product_sub_type'];
        $product_description=$DecodedData['product_description'];
        $product_weight=$DecodedData['product_weight'];
        $product_weight_type=$DecodedData['product_weight_type'];
        $product_qty=$DecodedData['product_qty'];
        $product_price=$DecodedData['product_price'];
        $offer_price=$DecodedData['offer_price'];
        $str=$DecodedData['product_image'];
        $product_img= str_replace(' ', '', $str);
        if(!empty($product_img))
        {
            $upload_format=1;
        }
        else
        {
            $upload_format=0;
        }
        $productStatus=$DecodedData['product_status'][0];
        if($productStatus=='')
        {
            $product_status=0;
        }
        else{
            $product_status=$productStatus;
        }
        $store_SKU=$category.$sub_category.$brand.$product_name.$product_type.$product_weight;
        $product_added_date=date('Y-m-d');
        $product_updated_date=date('Y-m-d');
        $sold_count=0;

        
            $sql="INSERT INTO `temp_str_config`(user_id,temp_shopId,base_product_id,category,sub_category,brand,product_name,product_type,product_sub_type,product_description,product_weight,product_weight_type,product_qty,product_price,offer_price,product_img,upload_format,product_status,store_SKU,product_added_date,product_updated_date,sold_count) values('$user_id','$temp_shopId','$base_product_id','$category','$sub_category','$brand','$product_name','$product_type','$product_sub_type','$product_description','$product_weight','$product_weight_type','$product_qty','$product_price','$offer_price','$product_img','$upload_format','$product_status','$store_SKU','$product_added_date','$product_updated_date','$sold_count')";
    
            $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
            if($R)
            {
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        
    }
?>