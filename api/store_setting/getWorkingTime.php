<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
 
    
    
        $userId = $_GET['userId'];
        
        
    $products = [];
   
    
    $sql="SELECT * FROM user_time_slots WHERE userId='$userId'";
      
        if($result = mysqli_query($CN,$sql))
        {
         
          $i = 0;
  
 
          while($row = mysqli_fetch_assoc($result))
          {
            $products[$i]['id'] = $row['id'];
            $products[$i]['day'] = $row['day'];
            $products[$i]['from_time'] = $row['from_time'];
            $products[$i]['to_time'] = $row['to_time'];
            $products[$i]['userId'] = $row['userId'];
            
            $i++;
          }
          echo json_encode($products);
      
           
        	http_response_code(201);
          }
          else{
         
          
            http_response_code(404);
        }
       
    
  
?>