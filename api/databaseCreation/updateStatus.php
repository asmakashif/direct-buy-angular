<?php
$shopId = 'gqcvje';
$dblink1=mysqli_connect('localhost', 'root', ''); // connect server 1

mysqli_select_db($dblink1,'formal_store');  // select database 1

$dblink2=mysqli_connect('localhost', 'root', ''); // connect server 2   

mysqli_select_db($dblink2,$shopId); // select database 2


$updateqry="UPDATE `shop_details` SET `dbcreation_status`=3 WHERE `shopId`='{$shopId}' LIMIT 1  ";
if(mysqli_query($dblink1,$updateqry))
{
    $shop=[];
    $Sql_Query = "SELECT * from `shop_details` WHERE `shopId` = '$shopId' ";

    if($result = mysqli_query($dblink1,$Sql_Query) or die("database error:". mysqli_error($dblink1)))
    {
        while($row = mysqli_fetch_assoc($result))
        {
            $shop['shopId'] = $row['shopId'];
            $shop['dbcreation_status'] = $row['dbcreation_status'];
        }

        //echo json_encode($shop);
    }
    else
    {
        http_response_code(404);
    }
}
else{
    http_response_code(204);
}


