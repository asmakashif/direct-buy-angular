<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    
        $shopName = $_POST['shopName'];
        $shops=[];

        $sql = "SELECT * FROM `shop_details` WHERE `shopName` = '$shopName';";

        if($result = mysqli_query($CN,$sql))
        {
            // //$cr = 0;
            while($row = mysqli_fetch_assoc($result))
            {
                $shops['shopName'] = $row['shopName'];
                
            }
            //echo $shops;
            echo json_encode($shops);
        }
        else
        {
            //echo  0;
            http_response_code(404);
        }
    

?>