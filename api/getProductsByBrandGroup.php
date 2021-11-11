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

    // $string = 'Sammy says: "This string\'s in single quotes."' ;
    // echo $string;
    
    $EncodedData=file_get_contents('php://input');
    //print_r($EncodedData);

    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        
        $brand=$DecodedData['brand'];
        $brand = "'" . implode ( "', '", $brand ) . "'";
        //$ids = implode(', ', $shopType);

        $product = [];
        $sql="SELECT shop_type,category,sub_category,brand FROM `base_products` WHERE `brand` IN ($brand) GROUP BY shop_type,category,sub_category,brand";
        //$sql = "SELECT category FROM base_products WHERE shop_type IN (".$ids.") GROUP BY category ";
        //echo $sql;
    
        if($result=mysqli_query($CN,$sql))
        {
            $cr = 0;
            while($row = mysqli_fetch_assoc($result))
            {
                $product[$cr]['shop_type'] = $row['shop_type'];
                $product[$cr]['category'] = $row['category'];
                $product[$cr]['sub_category'] = $row['sub_category'];
                $product[$cr]['brand'] = $row['brand'];
                $cr++;
            }

            echo json_encode($product);
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
    }
?>