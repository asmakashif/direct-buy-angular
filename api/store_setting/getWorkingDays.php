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
    $products = [];
    $id=$_GET['userId'];
       
        $sql="SELECT * FROM shop_working_days WHERE userId='$id'";
      
        if($result = mysqli_query($CN,$sql))
        {
          $i = 0;
  
 
          while($row = mysqli_fetch_assoc($result))
          {
            
            $products[$i]['userId'] = $row['userId'];
            $products[$i]['Monday']    = $row['Monday'];
            $products[$i]['Tuesday'] = $row['Tuesday'];
            $products[$i]['Wednesday'] = $row['Wednesday'];
            $products[$i]['Thursday'] = $row['Thursday'];
            $products[$i]['Friday'] = $row['Friday'];
            $products[$i]['Saturday'] = $row['Saturday'];
            $products[$i]['Sunday'] = $row['Sunday'];
            $i++;
          }
          echo json_encode($products);
      
           
        	http_response_code(201);
          }
          else{
         
          
            http_response_code(404);
        }
       
      
  
?>