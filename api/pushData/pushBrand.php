<?php
$shopId = 'asma';

$con=mysqli_connect("localhost","root","",$shopId) or die(mysqli_error());

$copyqry7="INSERT brand SELECT base_product_id,brand FROM formal_store.base_products GROUP BY brand";

$res7=mysqli_query($con,$copyqry7) or die("database error:". mysqli_error($con));
if($res7){
    echo 'success';
}