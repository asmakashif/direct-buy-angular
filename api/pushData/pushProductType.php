<?php
$shopId = 'asma';

$con=mysqli_connect("localhost","root","",$shopId) or die(mysqli_error());

$copyqry7="INSERT product_type SELECT base_product_id,product_type,product_sub_type FROM `base_products` GROUP BY product_type";

$res7=mysqli_query($con,$copyqry7) or die("database error:". mysqli_error($con));
if($res7){
    echo 'success';
}