<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
 
    
    $header = apache_request_headers();
    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {

        $DecodedData=json_decode($EncodedData,true);
        $slot_id = $DecodedData['slot'];
        $shopId = $DecodedData['shopId'];
        $userId= $DecodedData['id'];
        

        $sql1="SELECT * FROM  shop_working_time WHERE  slot_id='$slot_id' AND shopId='$shopId' ";
        $result1 = mysqli_query($CN,$sql1);
        $row = mysqli_fetch_row($result1);
        if(empty($row))
        {
       $sql="insert into  shop_working_time( userId,shopId,slot_id) values('$userId','$shopId','$slot_id')";
      
        if($result = mysqli_query($CN,$sql))
        {
      echo json_encode(
           array(
             "message"=>"Successfully submitted"
            ));
      
           $Message='success';
        	http_response_code(201);
          }
          else{
         
          echo json_encode(
            array(
              "message"=>"Something went wrong try again"
             
            ));
       
            $Message='success';
            http_response_code(201);
        }
       
      }
      else{
         
        echo json_encode(
          array(
            "message"=>"Slot is already added"
           
          ));
     
          $Message='success';
          http_response_code(201);
      }

    }
?>