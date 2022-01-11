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
    $ordercode=$_GET['order_code'];
       $products=[];
        $sql="SELECT * FROM cust_payment_details as p  JOIN order_items as o ON p.order_code=o.order_code
     
       WHERE o.order_code='$ordercode' ";
        
        if($result = mysqli_query($CN,$sql))
        {
          $i = 0;
  
 
          while($row = mysqli_fetch_assoc($result))
          {
            $products[$i]['id'] = $row['id'];
            $products[$i]['product_name'] = $row['product_name'];
            $products[$i]['product_qty'] = $row['product_qty'];
            $products[$i]['product_price'] = $row['product_price'];
            $products[$i]['product_subtotal'] = $row['product_subtotal'];
           $i++;
          }
          echo json_encode($products);
          http_response_code(201);
          
          }
          else{
         
          
            http_response_code(404);
        }
       
      
  
?>