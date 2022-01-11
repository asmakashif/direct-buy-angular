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

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $categories=$DecodedData['categories'];
        $category = "'" . implode ( "', '", $categories ) . "'";
        //$ids = implode(', ', $shopType);

        $sub_category = [];
        $sql="SELECT * FROM `base_products` WHERE `category` IN ($category) GROUP BY sub_category";
        //$sql = "SELECT category FROM base_products WHERE shop_type IN (".$ids.") GROUP BY category ";
        //echo $sql;
    
        if($result=mysqli_query($CN,$sql))
        {
            $cr = 0;
            while($row = mysqli_fetch_assoc($result))
            {
                $sub_category[$cr]['sub_category'] = htmlentities($row['sub_category']);
                $cr++;
            }

            echo json_encode($sub_category);
            http_response_code(201);
        }
        else{
            http_response_code(422);
        }
    }
?>