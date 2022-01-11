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
        $from = $DecodedData['from'];
        $to = $DecodedData['to'];
        $userId= $DecodedData['userId'];
        
        $day=$DecodedData['day'];

        //$sql1="SELECT * FROM user_time_slots WHERE  day='$day' AND homeDelSlotsId='$id' AND userId='$userId'";
       // $result1 = mysqli_query($CN,$sql1);
       // $row = mysqli_fetch_row($result1);
        
          $sql="SELECT * FROM user_time_slots WHERE userId='$userId' AND day='$day'";
          $result = mysqli_query($CN,$sql);
          $row = mysqli_num_rows($result);
          if($row<=4)
          {
        
       $sql="insert into  user_time_slots( from_time,to_time,userId,day) values('$from','$to','$userId','$day')";
      
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
      else{
         
        echo json_encode(
          array(
            "message"=>"You have already filled 5 slots"
           
          ));
     
          $Message='success';
          http_response_code(201);
      }
    }
?>