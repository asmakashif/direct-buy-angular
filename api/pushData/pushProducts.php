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


$copyqry13="INSERT temp_str_config SELECT * FROM formal_store.temp_str_config WHERE temp_shopId ='$shopId'";
$res13=mysqli_query($con,$copyqry13) or die("database error:". mysqli_error($con));
if($res13){
  echo 'success';
}
                      