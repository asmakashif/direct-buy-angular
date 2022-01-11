<?php
//$shopId = $_GET['shopId'];
//$user_id = $_GET['user_id'];
$user_id = 5;
$shopId='zasbha';
$dblink1=mysqli_connect('localhost', 'root', '');
mysqli_select_db($dblink1,'formal_store'); 
$dblink2=mysqli_connect('localhost', 'root', '');   
mysqli_select_db($dblink2,$shopId); 


$result2 = mysqli_query($dblink1,"SELECT * FROM payment_integration WHERE `user_id` = '$user_id' ");
while ($row = mysqli_fetch_array($result2, MYSQLI_ASSOC) ) {  
  $res2=mysqli_query($dblink2,"INSERT INTO payment_integration (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); // insert one row into new table
  if($res2){
    $result3 = mysqli_query($dblink1,"SELECT * FROM category ");
    while ($row = mysqli_fetch_array($result3, MYSQLI_ASSOC) ) {  
      $res3=mysqli_query($dblink2,"INSERT INTO category (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); // insert one row into new table
      if($res3)
      {
        $result4 = mysqli_query($dblink1,"SELECT * FROM product_type ");
        while ($row = mysqli_fetch_array($result4, MYSQLI_ASSOC) ) {  
          $res4=mysqli_query($dblink2,"INSERT INTO product_type (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
          if($res4)
          {
            $result5 = mysqli_query($dblink1,"SELECT * FROM min_order_value WHERE `user_id` = '$user_id' ");

            while ($row = mysqli_fetch_array($result5, MYSQLI_ASSOC) ) {  
              $res5=mysqli_query($dblink2,"INSERT INTO min_order_value (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
              if($res5)
              {
                $result6 = mysqli_query($dblink1,"SELECT * FROM shop_details WHERE `user_id` = '$user_id' ");

                while ($row = mysqli_fetch_array($result6, MYSQLI_ASSOC) ) {  
                  $res6=mysqli_query($dblink2,"INSERT INTO shop_details (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
                  if($res6)
                  {
                    $result7 = mysqli_query($dblink1,"SELECT * FROM shop_payment_info WHERE `pInfo_userId` = '$user_id' ");

                    while ($row = mysqli_fetch_array($result7, MYSQLI_ASSOC) ) {  
                      $res7=mysqli_query($dblink2,"INSERT INTO shop_payment_info (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
                      if($res7)
                      {
                        $result8 = mysqli_query($dblink1,"SELECT * FROM shop_working_time WHERE `userId` = '$user_id' ");

                        while ($row = mysqli_fetch_array($result8, MYSQLI_ASSOC) ) {  
                          $res8=mysqli_query($dblink2,"INSERT INTO shop_working_time (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
                          if($res8)
                          {
                            $result9 = mysqli_query($dblink1,"SELECT * FROM store_type");

                            while ($row = mysqli_fetch_array($result9, MYSQLI_ASSOC) ) {  
                              $res9=mysqli_query($dblink2,"INSERT INTO store_type (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
                              if($res9)
                              {
                                $result10 = mysqli_query($dblink1,"SELECT * FROM tbl_user WHERE `id` = '$user_id' ");

                                while ($row = mysqli_fetch_array($result10, MYSQLI_ASSOC) ) {  
                                  $res10=mysqli_query($dblink2,"INSERT INTO tbl_user (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
                                  if($res10)
                                  {
                                    $result11 = mysqli_query($dblink1,"SELECT * FROM user_time_slots WHERE `userId` = '$user_id' ");

                                    while ($row = mysqli_fetch_array($result11, MYSQLI_ASSOC) ) {  
                                      $res11=mysqli_query($dblink2,"INSERT INTO user_time_slots (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2));
                                      if($res11)
                                      {
                                        $result1 = mysqli_query($dblink1,"SELECT * FROM temp_str_config WHERE `temp_shopId` = '$shopId' "); 
                                        while ($row = mysqli_fetch_array($result1, MYSQLI_ASSOC) ) {  
                                          $res1=mysqli_query($dblink2,"INSERT INTO temp_str_config (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); 
                                          if($res1){
                                            $updateqry="UPDATE `shop_details` SET `dbcreation_status`=3 WHERE `shopId`='{$shopId}' LIMIT 1  ";
                                            if(mysqli_query($dblink1,$updateqry))
                                            {
                                              http_response_code(404);
                                            }
                                            else
                                            {
                                              http_response_code(422);
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}