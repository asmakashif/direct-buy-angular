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

    // $payment_name = 'AsmaPaytm';
    
    // $count = mysqli_query($CN, "SELECT attachToStr FROM payment_integration WHERE `payment_name` = '$payment_name'");
    // $total = 0;
    // while($row = mysqli_fetch_assoc($count)) {
    //     $total += $row['attachToStr'];
    // }
    // $total;

    // $qry="UPDATE `payment_integration` SET `attachToStr` = 1 + '{$total}'  WHERE `payment_name`='{$payment_name}' LIMIT 1  ";
    // if(mysqli_query($CN,$qry))
    // {
    //     http_response_code(201);
    // }
    // else
    // {
    //     http_response_code(422);
    // }

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        //print_r($DecodedData);
       
        $user_id=$DecodedData['user_id']; 
        $shopId=$DecodedData['shopId']; 
        $str=$DecodedData['payment_name']; 
        $payment_name = addslashes($str);
        //echo $payment_name;
        
         
        $sql="INSERT INTO `shop_payment_info`(pInfo_userId,pInfo_shopId,pInfo_payment_name) values('$user_id','$shopId','$payment_name')";
        $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    
        if($R)
        {
            $qry="UPDATE `shop_details` SET `payment_status`=1 WHERE `shopId`='{$shopId}' LIMIT 1  ";
            if($result=mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
            {
                $count = mysqli_query($CN, "SELECT attachToStr FROM payment_integration WHERE `payment_name` = '$payment_name'")  or die("database error:". mysqli_error($CN));
                $total = 0;
                while($row = mysqli_fetch_assoc($count)) {
                    $total += $row['attachToStr'];
                }
                $total;

                $qry="UPDATE `payment_integration` SET `attachToStr` = 1 + '{$total}'  WHERE `payment_name`='{$payment_name}' LIMIT 1  ";
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
        	// echo 'success';
         //    http_response_code(201);
            
        }
        else{
        	http_response_code(422);
        }
         
    }
?>