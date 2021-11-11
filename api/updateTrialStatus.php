<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    
    $user_id = $_GET['user_id'];
    $shopId = $_GET['shopId'];
    //echo $shopId;
    $shop_payment_date=date("Y-m-d H:i:s");
    $shop_exp_date=date('Y-m-d H:i:s', strtotime('+3 months'));

    $sql="UPDATE `shop_details` SET `shop_payment_date`='$shop_payment_date',`shop_exp_date`='$shop_exp_date',`trial_activate`=1,`shop_status`=1,`shop_payment_status`=1 WHERE `shopId`='{$shopId}' LIMIT 1  ";

    $R=mysqli_query($CN,$sql);
    if($R)
    {
        //http_response_code(204);
        $qry="UPDATE `tbl_user` SET `trail_activate`=1 WHERE `id`='{$user_id}' LIMIT 1  ";
        if(mysqli_query($CN,$qry))
        {
            $shopId = $_GET['shopId'];
            include "databaseCreation/create_database.php";
            http_response_code(204);
        }
        else{
         http_response_code(422);
        }
    }
    else{
        http_response_code(422);
    }
    
?>