<?php
$shopId = $_GET['shopId'];
$dblink1=mysqli_connect('localhost', 'root', ''); // connect server 1

mysqli_select_db($dblink1,'formal_store');  // select database 1

$dblink2=mysqli_connect('localhost', 'root', ''); // connect server 2   

mysqli_select_db($dblink2,$shopId); // select database 2

//$tables = mysqli_query($dblink1, "SHOW table temp_str_config ") or die(mysqli_error($dblink1));

$result = mysqli_query($dblink1,"SELECT * FROM temp_str_config WHERE `temp_shopId` = '$shopId' "); // select all content        


while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC) ) {  
   $res=mysqli_query($dblink2,"INSERT INTO temp_str_config (".implode(", ",array_keys($row)).") VALUES ('".implode("', '",array_values($row))."')")  or die("database error:". mysqli_error($dblink2)); // insert one row into new table
   if($res)
   {
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
   else
   {
        http_response_code(422);
   }
}





//$con=mysqli_connect("localhost","formal_store","",$db2) or die(mysqli_error());

// $copy_qry1="INSERT temp_str_config SELECT * FROM dblink1.temp_str_config;";
// mysqli_query($dblink2,$copy_qry1) or die("database error:". mysqli_error($dblink2));

// mysqli_query($dblink2,"INSERT INTO temp_str_config")or die(mysqli_error());
// mysqli_query($dblink1,"SELECT * FROM temp_str_config")or die(mysqli_error());


// $re=mysqli_query("SELECT * FROM temp_str_config",$dblink1);
// while($i=mysql_fetch_assoc($re))
// {
//     $u=array();
//     foreach($i as $k=>$v) if($k!=$keyfield) $u[]="$k='$v'";
//     mysql_query("INSERT INTO temp_str_config (".implode(',',array_keys($i)).") VALUES ('".implode("','",$i)."') ON DUPLICATE KEY UPDATE ".implode(',',$u),$L2) or die(mysql_error());
// }