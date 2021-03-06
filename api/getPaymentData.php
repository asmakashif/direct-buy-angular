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

    $user_id = $_GET['user_id'];
    $shopId = $_GET['shopId'];
    $payment = [];

    $qry="SELECT * from ((SELECT pi.payment_id,pi.user_id,pi.payment_name,pi.provider_type,pi.provider_img,spi.shop_pInfo_id,spi.pInfo_payment_name,spi.pInfo_shopId,spi.default_payment FROM payment_integration as pi LEFT JOIN shop_payment_info as spi ON spi.pInfo_payment_name=pi.payment_name WHERE pi.user_id = '$user_id' AND spi.pInfo_shopId = '$shopId' ORDER BY spi.shop_pInfo_id DESC) UNION (SELECT pi.payment_id,pi.user_id,pi.payment_name,pi.provider_type,pi.payment_api_key,pi.payment_secret_key,pi.payment_status,pi.payment_added_date,pi.provider_img FROM payment_integration as pi WHERE pi.user_id='$user_id')) as payment group by payment.payment_name";

    if($result = mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
             
            $payment[$cr]['payment_id'] = $row['payment_id'];
            $payment[$cr]['provider_type'] = $row['provider_type'];
            $payment[$cr]['provider_img'] = $row['provider_img'];
            $payment[$cr]['payment_name'] = $row['payment_name'];
            $payment[$cr]['pInfo_payment_name'] = $row['pInfo_payment_name'];
            $payment[$cr]['shop_pInfo_id'] = $row['shop_pInfo_id'];
            $payment[$cr]['pInfo_shopId'] = $row['pInfo_shopId'];
            $payment[$cr]['default_payment'] = $row['default_payment'];
            
            $cr++;
        }

        echo json_encode($payment);
    }
    else
    {
        http_response_code(404);
    }
    
    

    

    // $payment = [];
    // $storeId = $_GET['shopId'];
    // print_r($storeId);
    // $user_id = 5;
    // $sql = "SELECT * FROM payment_integration WHERE  `user_id` = '{$user_id}' ";

    // if($result = mysqli_query($CN,$sql))
    // {
    //     $cr = 0;
    //     while($row = mysqli_fetch_assoc($result))
    //     {
             
    //         $payment[$cr]['payment_id'] = $row['payment_id'];
    //         $payment[$cr]['provider_type'] = $row['provider_type'];
    //         $payment[$cr]['payment_name'] = $row['payment_name'];
    //         $cr++;
    //     }

    //     echo json_encode($payment);
    // }
    // else
    // {
    //     http_response_code(404);
    // }

?>