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

$createqry1="CREATE TABLE brand LIKE formal_store.brand";
$res = mysqli_query($con,$createqry1) or die("database error:". mysqli_error($con));
if($res){
  $createqry2="CREATE TABLE category LIKE formal_store.category";
  $res1=mysqli_query($con,$createqry2) or die("database error:". mysqli_error($con));
  if($res1){
    $createqry3="CREATE TABLE customers LIKE formal_store.customers";
    $res2 = mysqli_query($con,$createqry3) or die("database error:". mysqli_error($con));
    if($res2){
      $createqry4="CREATE TABLE customer_default_store LIKE formal_store.customer_default_store";
      $res3=mysqli_query($con,$createqry4) or die("database error:". mysqli_error($con));
      if($res3){
        $createqry5="CREATE TABLE cust_payment_details LIKE formal_store.cust_payment_details;";
        $res4=mysqli_query($con,$createqry5) or die("database error:". mysqli_error($con));
        if($res4){
          $createqry6="CREATE TABLE home_delivery_time_slots LIKE formal_store.home_delivery_time_slots;";
          $res5=mysqli_query($con,$createqry6) or die("database error:". mysqli_error($con));
          if($res5){
            $createqry7="CREATE TABLE min_order_value LIKE formal_store.min_order_value;";
            $res6=mysqli_query($con,$createqry7) or die("database error:". mysqli_error($con));
            if($res6){
              $createqry8="CREATE TABLE order_items LIKE formal_store.order_items;";
              $res7=mysqli_query($con,$createqry8) or die("database error:". mysqli_error($con));
              if($res7){
                $createqry9="CREATE TABLE payment_integration LIKE formal_store.payment_integration;";
                $res8=mysqli_query($con,$createqry9) or die("database error:". mysqli_error($con));
                if($res8){
                  $createqry10="CREATE TABLE payment_provider LIKE formal_store.payment_provider;";
                  $res9=mysqli_query($con,$createqry10) or die("database error:". mysqli_error($con));
                  if($res9){
                    $createqry11="CREATE TABLE product_type LIKE formal_store.product_type;";
                    $res10=mysqli_query($con,$createqry11) or die("database error:". mysqli_error($con));
                    if($res10){
                      $createqry12="CREATE TABLE shop_details LIKE formal_store.shop_details;";
                      $res11=mysqli_query($con,$createqry12) or die("database error:". mysqli_error($con));
                      if($res11){
                        $createqry13="CREATE TABLE shop_detail_type LIKE formal_store.shop_detail_type;";
                        $res12=mysqli_query($con,$createqry13) or die("database error:". mysqli_error($con));
                        if($res12){
                          $createqry14="CREATE TABLE shop_payment_info LIKE formal_store.shop_payment_info;";
                          $res13=mysqli_query($con,$createqry14) or die("database error:". mysqli_error($con));
                          if($res13){
                            $createqry15="CREATE TABLE store_type LIKE formal_store.store_type;";
                            $res14=mysqli_query($con,$createqry15) or die("database error:". mysqli_error($con));
                            if($res14){
                              $createqry16="CREATE TABLE shop_working_days LIKE formal_store.shop_working_days;";
                              $res15=mysqli_query($con,$createqry16) or die("database error:". mysqli_error($con));
                              if($res15){
                                $createqry17="CREATE TABLE shop_working_time LIKE formal_store.shop_working_time;";
                                $res16=mysqli_query($con,$createqry17) or die("database error:". mysqli_error($con));
                                if($res16){
                                  $createqry18="CREATE TABLE tbl_user LIKE formal_store.tbl_user;";
                                  $res17=mysqli_query($con,$createqry18) or die("database error:". mysqli_error($con));
                                  if($res17){
                                    $createqry19="CREATE TABLE temp_str_config LIKE formal_store.temp_str_config;";
                                    $res18=mysqli_query($con,$createqry19) or die("database error:". mysqli_error($con));
                                    if($res18){
                                      $createqry20="CREATE TABLE user_time_slots LIKE formal_store.user_time_slots;";
                                      $res19=mysqli_query($con,$createqry20) or die("database error:". mysqli_error($con));
                                      if($res19){
                                        $createqry21="CREATE TABLE base_products LIKE formal_store.base_products;";
                                        $res20=mysqli_query($con,$createqry21) or die("database error:". mysqli_error($con));
                                        if($res20){
                                          $CN= mysqli_connect("localhost","root","");
                                          $DB=mysqli_select_db($CN,"formal_store");

                                          $updateqry="UPDATE `shop_details` SET `dbcreation_status`=2 WHERE `shopId`='{$shopId}' LIMIT 1  ";
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
        }
      }
    }
  }
}