<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    
    
        

        // $shopId = 'i3s6wp';
    $storeId=$_POST['storeId'];
        $product_status = 1;


        $sql="UPDATE `shop_details` SET `product_status`='$product_status' WHERE `shopId`='{$storeId}' ";

        $R=mysqli_query($CN,$sql);
        if($R)
        {
            http_response_code(204);
            // $Message = "Student has been registered successfully";
        }
        else{
            http_response_code(422);
            // $Message = "Server error please try later";
        }
        // $response[] = array("Message"=>$Message);
        // echo json_encode($response);
    
?>