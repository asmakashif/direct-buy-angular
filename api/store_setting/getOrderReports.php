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
    $user_id=$_GET['user_id'];
       
        $sql="SELECT * FROM cust_payment_details as p  JOIN order_items as o ON p.order_code=o.order_code
      LEFT JOIN  shop_details as s ON o.shopId=s.shopId WHERE s.user_id='$user_id'  GROUP BY o.order_code";
        //  $sql="SELECT * FROM order_items as o JOIN cust_payment_details as p ON p.order_code=o.order_code
        //  LEFT JOIN  shop_details as s ON o.shopId=s.shopId WHERE s.user_id='$user_id'";
        if($result = mysqli_query($CN,$sql))
        {
          $i = 0;
  
 
          while($row = mysqli_fetch_assoc($result))
          {
            
            $products[$i]['id'] = $row['id'];
            $products[$i]['order_code'] = $row['order_code'];
            $products[$i]['c_fname'] = $row['c_fname'];
           
            $i++;
          }
          echo json_encode($products);
        	http_response_code(201);
          }
          else{
         
          
            http_response_code(404);
        }
       
      
  
?>