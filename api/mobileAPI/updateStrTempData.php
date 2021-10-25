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

        //print_r($DecodedData);
        
        //$shopId=$DecodedData['shopId'];
        $id=$DecodedData['temp_str_config_id'];
        // print_r($id);
        $category=$DecodedData['category'];
        $sub_category=$DecodedData['sub_category'];
        $brand=$DecodedData['brand'];
        $product_name=$DecodedData['product_name'];
        $product_type=$DecodedData['product_type'];
        $product_weight=$DecodedData['product_weight'];
        $product_qty=$DecodedData['product_qty'];
        $product_price=$DecodedData['product_price'];
        $offer_price=$DecodedData['offer_price'];

        $db_SKU=$category.$sub_category.$brand.$product_name.$product_type.$product_weight;
        
        $sql="UPDATE `temp_str_config` SET `db_SKU`='$db_SKU',`category`='$category',`sub_category`='$sub_category',`brand`='$brand',`product_name`='$product_name',`product_type`='$product_type',`product_weight`='$product_weight',`product_qty`='$product_qty',`product_price`='$product_price',`offer_price`='$offer_price' WHERE `temp_str_config_id`='{$id}'";
        
        $R=mysqli_query($CN,$sql);
        
        if($R)
        {
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
    }
?>