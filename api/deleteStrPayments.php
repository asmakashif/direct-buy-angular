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
        $str=$DecodedData['payment_name']; 
        $payment_name = addslashes($str);

        $del = "DELETE FROM `shop_payment_info` WHERE  `pInfo_payment_name` = '{$payment_name}' ";
        if(mysqli_query($CN,$del))
        {
            $count = mysqli_query($CN, "SELECT attachToStr FROM payment_integration WHERE `payment_name` = '$payment_name'")  or die("database error:". mysqli_error($CN));
            $total = 0;
            while($row = mysqli_fetch_assoc($count)) {
                $total += $row['attachToStr'];
            }
            $total;

            $qry="UPDATE `payment_integration` SET `attachToStr` = '{$total}' - 1   WHERE `payment_name`='{$payment_name}' LIMIT 1  ";
            if(mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
            {
                http_response_code(201);
            }
            else
            {
                http_response_code(422);
            }
        }
        else
        {
            http_response_code(422);
        }
    }
?>