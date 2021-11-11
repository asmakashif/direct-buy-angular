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

    
    $user_id=$_POST['user_id'];
    $storeId=$_POST['storeId'];
    
    $base_product_id=$_POST['base_product_id'];
    
    $shop_type=$_POST['shop_type'];
    
    $category=$_POST['category'];
    
    $sub_category=$_POST['sub_category'];
    $brand=$_POST['brand'];
    $product_name=$_POST['product_name'];
    $product_type=$_POST['product_type'];
    $product_sub_type=$_POST['product_sub_type'];
    $pro_desc=$_POST['product_description'];
    $product_description = addslashes($pro_desc);
    $product_weight=$_POST['product_weight'];
    $product_weight_type=$_POST['product_weight_type'];
    $product_qty=$_POST['product_qty'];
    $product_price=$_POST['product_price'];
    $offer_price=$_POST['offer_price'];
    $pro_img=$_POST['product_img'];
    $product_img = addslashes($pro_img);

    $db_SKU=$category.$sub_category.$brand.$product_name.$product_type.$product_sub_type.$product_weight.$product_weight_type;
    //$sql="insert into temp_str_config(temp_shopId,category,sub_category) values('$storeId','$category','$sub_category')";
    
    $sql="INSERT INTO temp_str_config(user_id,temp_shopId,base_product_id,db_SKU,shop_type,category,sub_category,brand,product_name,product_type,product_sub_type,product_description,product_weight,product_weight_type,product_qty,product_price,offer_price,product_img) VALUES ('$user_id','$storeId','$base_product_id','$db_SKU','$shop_type','$category','$sub_category','$brand','$product_name','$product_type','$product_sub_type','$product_description','$product_weight','$product_weight_type','$product_qty','$product_price','$offer_price','$product_img')";

    $R=mysqli_query($CN,$sql);
    if($R)
    {
        $qry2="UPDATE `shop_details` SET `product_status`=1 WHERE `shopId`='{$storeId}' ";

        $R=mysqli_query($CN,$qry2);
        if($R)
        {
            //echo 'success';
            http_response_code(204);
        }
        else{
            http_response_code(422);
        }
        http_response_code(201);
    }
    else{
        //echo  0;
    	http_response_code(422);
    }
    
?>