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

        
        $user_id=$DecodedData['user_id'];
        $shopId=$DecodedData['shopId'];
        $shop_name=$DecodedData['shop_name'];
        $shop_address=$DecodedData['shop_address'];
        // $checkbox1=$DecodedData['shopType']; 

        // $chk="";  
        // foreach($checkbox1 as $chk1)  
        // { 
        //     $chk .= $chk1.",";  
        // }  
        $shops=[];
        $qry = "SELECT * FROM `shop_details`as sd WHERE `user_id` = '$user_id' AND `shop_name` = '$shop_name' ";
        $res=mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN));     

        if(mysqli_num_rows($res) > 0)
        {
            echo 0;
            http_response_code(422);
        }
        else
        {
            $sql="INSERT INTO `shop_details`(user_id,shopId,shop_name,shop_address) values('$user_id','$shopId','$shop_name','$shop_address')";
        
            $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
            
            if($R)
            {
                http_response_code(201);
            }
            else{
                http_response_code(422);
            }
        }
    }
?>