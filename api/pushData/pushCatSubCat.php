<?php
$shopId = 'asma';

$con=mysqli_connect("localhost","root","",$shopId) or die(mysqli_error());

$copyqry7="INSERT category SELECT base_product_id,category,sub_category FROM `base_products` GROUP BY sub_category";

$res7=mysqli_query($con,$copyqry7) or die("database error:". mysqli_error($con));
if($res7){
    echo 'success';
}