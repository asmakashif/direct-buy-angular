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

    $brand = [];
    //$sql="SELECT product_sub_type FROM `product_type` GROUP BY product_sub_type";
    $product_type = $_GET['product_type'];
    // print_r($category);
    // die();

    //$sql="SELECT sub_category FROM `category` GROUP BY sub_category";
    $sql="SELECT product_sub_type FROM `product_type` WHERE `product_type` = '$product_type' GROUP BY product_sub_type";

    if($result = mysqli_query($CN,$sql))
    {
        
        $cr = 0;
        while($row1 = mysqli_fetch_assoc($result))
        {
            $brand[$cr]['product_sub_type'] = $row1['product_sub_type'];
            $cr++;
        }
        echo json_encode($brand);
    }
    else
    {
        http_response_code(404);
    }

?>