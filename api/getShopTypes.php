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

    $users = [];
    $sql = "SELECT * FROM shop_types";

    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $users[$cr]['shop_type_id'] = $row['shop_type_id'];
            $users[$cr]['shop_type_name'] = $row['shop_type_name'];
            $users[$cr]['shop_type_description'] = $row['shop_type_description'];
            // $users[$cr]['lastName'] = $row['last_name'];
            // $users[$cr]['email'] = $row['email'];
            $cr++;
        }

        echo json_encode($users);
    }
    else
    {
        http_response_code(404);
    }

?>