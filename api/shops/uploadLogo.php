<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $target_dir="uploads/";
    //$product_image = basename($_FILES["myFile"]["name"]);
    $shop_logo = str_replace(' ', '', basename($_FILES["myFile"]["name"]));
    $target_file = $target_dir.$shop_logo;
    move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file);

    $shopId = $_POST['shopId'];
    // $product_image = basename($_FILES["myFile"]["name"]);

    $sql="UPDATE `shop_details` SET `shop_logo`='$shop_logo' WHERE `shopId`='{$shopId}' LIMIT 1  ";

    $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    if($R)
    {
        $qry = "SELECT * FROM `shop_details`as sd WHERE `shopId` = '$shopId'";
        if($result = mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
        {
            //print_r($result);
            while($row = mysqli_fetch_assoc($result))
            {
                $users['shopId'] = $row['shopId'];
                $users['shop_logo'] = $row['shop_logo'];
            }
            echo json_encode($users);
        }
        else
        {
            http_response_code(404);
        }
        http_response_code(204);
    }
    else{
        http_response_code(422);
    }
?>