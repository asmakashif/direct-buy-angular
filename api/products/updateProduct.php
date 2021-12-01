<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    // $target_dir="uploads/";
    // $target_file = $target_dir.basename($_FILES["myFile"]["name"]);
    // move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file);

    // $temp_str_config_id = $_POST['temp_str_config_id'];
    // $category = $_POST['category'];
    // $sub_category=$_POST['sub_category'];
    // $brand=$_POST['brand'];
    // $product_name=$_POST['product_name'];
    // $product_type=$_POST['product_type'];
    // $product_sub_type=$_POST['product_sub_type'];
    // $product_weight=$_POST['product_weight'];
    // $product_weight_type=$_POST['product_weight_type'];
    // $product_qty=$_POST['product_qty'];
    // $product_price=$_POST['product_price'];
    // $offer_price=$_POST['offer_price'];
    // $product_image = basename($_FILES["myFile"]["name"]);

    // $sql="UPDATE `temp_str_config` SET `category`='$category',`sub_category`='$sub_category',`brand`='$brand',`product_name`='$product_name',`product_type`='$product_type',`product_sub_type`='$product_sub_type',`product_weight`='$product_weight',`product_weight_type`='$product_weight_type',`product_qty`='$product_qty',`product_price`='$product_price',`offer_price`='$offer_price',`product_img`='$product_image' WHERE `temp_str_config_id`='{$temp_str_config_id}' LIMIT 1  ";

    // $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    // if($R)
    // {
    //     http_response_code(204);
    // }
    // else{
    //     http_response_code(422);
    // }
    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        
        // print_r($product_status);
        $temp_str_config_id = $DecodedData['temp_str_config_id'];
        
        $category = $DecodedData['category'];
        $sub_category=$DecodedData['sub_category'];
        $brand=$DecodedData['brand'];
        $product_name=$DecodedData['product_name'];
        $product_type=$DecodedData['product_type'];
        $product_sub_type=$DecodedData['product_sub_type'];
        $product_weight=$DecodedData['product_weight'];
        $product_weight_type=$DecodedData['product_weight_type'];
        $product_qty=$DecodedData['product_qty'];
        $product_price=$DecodedData['product_price'];
        $offer_price=$DecodedData['offer_price'];
        $product_status=$DecodedData['product_status'][0];
        //print_r($product_status);

        $sql="UPDATE `temp_str_config` SET `category`='$category',`sub_category`='$sub_category',`brand`='$brand',`product_name`='$product_name',`product_type`='$product_type',`product_sub_type`='$product_sub_type',`product_weight`='$product_weight',`product_weight_type`='$product_weight_type',`product_qty`='$product_qty',`product_price`='$product_price',`offer_price`='$offer_price',`product_status`='$product_status' WHERE `temp_str_config_id`='{$temp_str_config_id}' LIMIT 1  ";

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