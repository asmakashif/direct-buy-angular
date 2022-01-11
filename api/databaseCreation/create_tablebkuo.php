<?php
$shopId = $_GET['shopId'];
$dblink1=mysqli_connect('localhost', 'root', ''); // connect server 1

mysqli_select_db($dblink1,'formal_store');  // select database 1

$dblink2=mysqli_connect('localhost', 'root', ''); // connect server 2   

mysqli_select_db($dblink2,$shopId); // select database 2

$tables = mysqli_fetch_array(mysqli_query($dblink1,"SHOW TABLES  "));

//$table='tabletest';

foreach($tables as $table){

    $tableinfo = mysqli_fetch_array(mysqli_query($dblink1,"SHOW CREATE TABLE $table  ")); // get structure from table on server 1

    mysqli_query($dblink2," $tableinfo[1] "); // use found structure to make table on server 2

    $result = mysqli_query($dblink1,"SELECT * FROM $table  "); // select all content        

    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC) ) {     
       mysqli_query($dblink2,"INSERT INTO $table (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')"); // insert one row into new table
    }

}

 mysqli_close($dblink1); 
 mysqli_close($dblink2);