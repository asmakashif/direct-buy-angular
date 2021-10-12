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

    
    //$storeId=$_POST['storeId'];
    
    $id=$_POST['id'];
    // print_r($id);
    $category=$_POST['category'];
    $sub_category=$_POST['sub_category'];
    $brand=$_POST['brand'];
    $product_name=$_POST['product_name'];
    $product_type=$_POST['product_type'];
    $product_sub_type=$_POST['product_sub_type'];
    //$product_description=$_POST['product_description'];
    $product_weight=$_POST['product_weight'];
    $product_weight_type=$_POST['product_weight_type'];
    $product_qty=$_POST['product_qty'];
    $product_price=$_POST['product_price'];
    $offer_price=$_POST['offer_price'];
    //$product_img=$_POST['product_img'];

    $db_SKU=$category.$sub_category.$brand.$product_name.$product_type.$product_sub_type.$product_weight.$product_weight_type;


    $sql="UPDATE `temp_str_config` SET `db_SKU`='$db_SKU',`category`='$category',`sub_category`='$sub_category',`brand`='$brand',`product_name`='$product_name',`product_type`='$product_type',`product_sub_type`='$product_sub_type',`product_weight`='$product_weight',`product_weight_type`='$product_weight_type',`product_qty`='$product_qty',`product_price`='$product_price',`offer_price`='$offer_price' WHERE `temp_str_config_id`='{$id}'";

    $R=mysqli_query($CN,$sql);
    if($R)
    {
        echo  1;
        http_response_code(201);
    }
    else{
        echo  0;
    	http_response_code(422);
    }
    
?>