<?php
$shopId = $_GET['shopId'];
$user_id = $_GET['user_id'];
// $shopId = 'lkv2kz';
// $user_id = 5;
// $dblink1=mysqli_connect('localhost', 'root', ''); // connect server 1

// mysqli_select_db($dblink1,'formal_store');  // select database 1

// $dblink2=mysqli_connect('localhost', 'root', ''); // connect server 2   

// mysqli_select_db($dblink2,$shopId); // select database 2

$con=mysqli_connect("localhost","root","",$shopId) or die(mysqli_error());

$copyqry1="INSERT brand SELECT * FROM formal_store.brand";
$res1 = mysqli_query($con,$copyqry1) or die("database error:". mysqli_error($con));
if($res1){
  $copyqry2="INSERT category SELECT * FROM formal_store.category";
  $res2=mysqli_query($con,$copyqry2) or die("database error:". mysqli_error($con));
  if($res2){
    $copyqry3="INSERT min_order_value SELECT * FROM formal_store.min_order_value WHERE userId ='$user_id'";
    $res3 = mysqli_query($con,$copyqry3) or die("database error:". mysqli_error($con));
    if($res3){
      $copyqry4="INSERT payment_integration SELECT * FROM formal_store.payment_integration WHERE user_id ='$user_id'";
      $res4=mysqli_query($con,$copyqry4) or die("database error:". mysqli_error($con));
      if($res4){
        $copyqry5="INSERT product_type SELECT * FROM formal_store.product_type;";
        $res5=mysqli_query($con,$copyqry5) or die("database error:". mysqli_error($con));
        if($res5){
          $copyqry6="INSERT shop_details SELECT * FROM formal_store.shop_details WHERE user_id ='$user_id'";
          $res6=mysqli_query($con,$copyqry6) or die("database error:". mysqli_error($con));
          if($res6){
            $copyqry7="INSERT shop_payment_info SELECT * FROM formal_store.shop_payment_info WHERE pInfo_userId ='$user_id'";
            $res7=mysqli_query($con,$copyqry7) or die("database error:". mysqli_error($con));
            if($res7){
              $copyqry8="INSERT shop_working_days SELECT * FROM formal_store.shop_working_days WHERE userId ='$user_id'";
              $res8=mysqli_query($con,$copyqry8) or die("database error:". mysqli_error($con));
              if($res8){
                $copyqry9="INSERT shop_working_time SELECT * FROM formal_store.shop_working_time WHERE userId ='$user_id'";
                $res9=mysqli_query($con,$copyqry9) or die("database error:". mysqli_error($con));
                if($res9){
                  $copyqry10="INSERT store_type SELECT * FROM formal_store.store_type";
                  $res10=mysqli_query($con,$copyqry10) or die("database error:". mysqli_error($con));
                  if($res10){
                    $copyqry11="INSERT tbl_user SELECT * FROM formal_store.tbl_user WHERE id ='$user_id'";
                    $res11=mysqli_query($con,$copyqry11) or die("database error:". mysqli_error($con));
                    if($res11){
                      $copyqry12="INSERT user_time_slots SELECT * FROM formal_store.user_time_slots WHERE userId ='$user_id'";
                      $res12=mysqli_query($con,$copyqry12) or die("database error:". mysqli_error($con));
                      if($res12){
                        $copyqry13="INSERT temp_str_config SELECT * FROM formal_store.temp_str_config WHERE temp_shopId ='$shopId'";
                        $res13=mysqli_query($con,$copyqry13) or die("database error:". mysqli_error($con));
                        if($res13){
                          $copyqry14="INSERT notification_receivers SELECT * FROM formal_store.notification_receivers WHERE NotificationReceiverID ='$user_id' ";
                          $res14=mysqli_query($con,$copyqry14) or die("database error:". mysqli_error($con));
                          if($res14){

                            $copyqry15="INSERT notifications SELECT * FROM formal_store.notifications ";
                            $res15=mysqli_query($con,$copyqry14) or die("database error:". mysqli_error($con));
                            if($res15){

                              $copyqry14="INSERT base_products SELECT * FROM formal_store.base_products ";
                              $res14=mysqli_query($con,$copyqry14) or die("database error:". mysqli_error($con));
                              if($res14){
                                $CN= mysqli_connect("localhost","root","");
                                $DB=mysqli_select_db($CN,"formal_store");

                                $updateqry="UPDATE `shop_details` SET `dbcreation_status`=3 WHERE `shopId`='{$shopId}' LIMIT 1  ";
                                if(mysqli_query($CN,$updateqry))
                                {
                                  $shop=[];
                                  $Sql_Query = "SELECT * from `shop_details` WHERE `shopId` = '$shopId' ";

                                  if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
                                  {
                                    while($row = mysqli_fetch_assoc($result))
                                    {
                                      $shop['shopId'] = $row['shopId'];
                                      $shop['dbcreation_status'] = $row['dbcreation_status'];
                                    }
                                    echo json_encode($shop);
                                  }
                                  else
                                  {
                                    http_response_code(404);
                                  }
                                }
                                else{
                                  http_response_code(204);
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