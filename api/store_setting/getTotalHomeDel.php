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
    
    $shopId=$_GET['shop_id']; 
   
     
       
        $sql="SELECT * FROM  shop_working_time WHERE shopId='$shopId'";
      
        if($result = mysqli_query($CN,$sql))
        {
          $i = 0;
  
 
          $rowcount=mysqli_num_rows($result);
        
          echo json_encode($rowcount);
      
           
        	http_response_code(201);
          }
          else{
         
          
            http_response_code(404);
        }
       
  
?>