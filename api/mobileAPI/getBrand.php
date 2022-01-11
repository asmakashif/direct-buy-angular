<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $brand = [];
    $sql="SELECT brand FROM `brand` GROUP BY brand";


    if($result = mysqli_query($CN,$sql))
    {
        
        $cr = 0;
        while($row1 = mysqli_fetch_assoc($result))
        {
            $brand[$cr]['brand'] = $row1['brand'];
            $cr++;
        }
        echo json_encode($brand);
    }
    else
    {
        http_response_code(404);
    }

?>