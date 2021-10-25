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

    // $shopId='zaSBHA'; 
    // $shop_pInfo_id=27; 

 
    // $update = "UPDATE `shop_payment_info` SET `default_payment` = 0 WHERE `pInfo_shopId`='{$shopId}' ";
    // if(mysqli_query($CN,$update))
    // {
    //     //echo 1;
    //     $sql="UPDATE `shop_payment_info` SET `default_payment` = 1 WHERE `shop_pInfo_id`='{$shop_pInfo_id}' ";
    //     $R=mysqli_query($CN,$sql);
    //     if($R)
    //     {
    //         http_response_code(204);
    //     }
    //     else{
    //         http_response_code(422);
    //     }
          
    // }
    // else
    // {
    //     http_response_code(422);
    // }

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        
     
        $shopId=$DecodedData['shopId']; 
        $shop_pInfo_id=$DecodedData['shop_pInfo_id']; 
        // $shopId='zaSBHA'; 
        // $shop_pInfo_id=27; 


        $update = "UPDATE `shop_payment_info` SET `default_payment` = 0 WHERE `pInfo_shopId`='{$shopId}' ";
        if(mysqli_query($CN,$update))
        {
            foreach($shop_pInfo_id as $key)  
            {
                $sql="UPDATE `shop_payment_info` SET `default_payment` = 1 WHERE `shop_pInfo_id`='{$key}' ";

                $R=mysqli_query($CN,$sql);
                if($R)
                {
                    echo 1;
                    http_response_code(204);
                }
                else{
                    http_response_code(422);
                }
            }
        }
        else
        {
            http_response_code(422);
        }
    }
?>