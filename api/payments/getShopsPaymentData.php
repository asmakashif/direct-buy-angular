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
    $payment_name = $_GET['payment_name'];
    // $user_id = '5';
    // $payment_name = 'Asma Paytm';
    
    $payment = [];

    //$qry="SELECT * from ((SELECT sd.shop_id,sd.user_id,sd.shop_name,spi.shop_pInfo_id,spi.pInfo_payment_name,spi.pInfo_shopId FROM shop_details as sd LEFT JOIN payment_integration as pi ON pi.user_id=sd.user_id LEFT JOIN shop_payment_info as spi ON spi.pInfo_payment_name=pi.payment_name WHERE sd.user_id = '$user_id' AND spi.pInfo_shopId = '$shopId' ORDER BY spi.shop_pInfo_id DESC) UNION (SELECT sd.shop_id,sd.shopId,sd.shop_name FROM shop_details as sd WHERE sd.user_id='$user_id')) as payment group by payment.payment_name";

    //$qry="SELECT * from ((SELECT pi.payment_name,sd.shopId,sd.shop_name,spi.shop_pInfo_id,spi.pInfo_payment_name,spi.pInfo_shopId FROM payment_integration as pi LEFT JOIN shop_payment_info as spi ON spi.pInfo_payment_name=pi.payment_name LEFT JOIN shop_details as sd ON spi.pInfo_shopId=sd.shopId WHERE sd.user_id = '$user_id' AND spi.pInfo_payment_name = '$payment_name' ORDER BY spi.shop_pInfo_id DESC) UNION (SELECT sd.shop_id,sd.shopId,sd.shop_name,sd.shop_address,sd.shop_status,sd.shop_payment_status FROM shop_details as sd WHERE sd.user_id='$user_id')) as payment group by payment.payment_name";

    $qry="SELECT * from ((SELECT pi.payment_name,sd.shopId,sd.shop_name,spi.shop_pInfo_id,spi.pInfo_payment_name,spi.pInfo_shopId FROM payment_integration as pi LEFT JOIN shop_payment_info as spi ON spi.pInfo_payment_name=pi.payment_name LEFT JOIN shop_details as sd ON spi.pInfo_shopId=sd.shopId WHERE sd.user_id = '$user_id' AND spi.pInfo_payment_name = '$payment_name') UNION (SELECT sd.shop_id,sd.shopId,sd.shop_name,sd.shop_address,sd.shop_status,sd.shop_payment_status FROM shop_details as sd WHERE sd.user_id='$user_id')) as shops group by shops.shopId ";

    if($result = mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $payment[$cr]['shopId'] = $row['shopId'];
            $payment[$cr]['shop_name'] = $row['shop_name'];
            $payment[$cr]['pInfo_shopId'] = $row['pInfo_shopId'];
            
            $payment[$cr]['payment_name'] = $row['payment_name'];
            $payment[$cr]['pInfo_payment_name'] = $row['pInfo_payment_name'];
            $payment[$cr]['pInfo_shopId'] = $row['pInfo_shopId'];
            
            $cr++;
        }
        
        echo json_encode($payment);
        
    }
    else
    {
        http_response_code(404);
    }
?>