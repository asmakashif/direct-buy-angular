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
      JOIN  shop_details as s ON o.shopId=s.shopId
       WHERE o.order_code='$ordercode' GROUP BY o.order_code";
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
            $products[$i]['c_lname'] = $row['c_lname'];
            $products[$i]['c_mobile'] = $row['c_mobile'];
            $products[$i]['c_address1'] = $row['c_address1'];
            $products[$i]['c_address2'] = $row['c_address2'];
            $products[$i]['city'] = $row['city'];
            $products[$i]['pincode'] = $row['pincode'];
            $products[$i]['total'] = $row['total'];
            $products[$i]['shop_name'] = $row['shop_name'];
            $products[$i]['shop_address'] = $row['shop_address'];
            $products[$i]['store_pickup'] = $row['store_pickup'];
            $products[$i]['order_fulfilled_date'] = $row['order_fulfilled_date'];
            $i++;
          }
          echo json_encode($products);
          http_response_code(201);
          
          }
          else{
         
          
            http_response_code(404);
        }
       
      
  
?>