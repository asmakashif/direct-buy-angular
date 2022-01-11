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
        $shopId = $DecodedData['shopId'];
        $category = $DecodedData['category'];
        $sub_category=$DecodedData['sub_category'];
        $created_date=date('Y-m-d');
        $updated_date=date('Y-m-d');


        $sql="INSERT INTO `category`(user_id,shopId,category,sub_category,created_date,updated_date) values('$user_id','$shopId','$category','$sub_category','$created_date','$updated_date')";

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