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
        $day = $DecodedData['day'];
        $id = $DecodedData['userId'];
       $sql="UPDATE shop_working_days SET $day='0' WHERE userId='$id'";
      
        if($result = mysqli_query($CN,$sql))
        {
      echo json_encode(
           array(
             "message"=>"Success"
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
  
?>