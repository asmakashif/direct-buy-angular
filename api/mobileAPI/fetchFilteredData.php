<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    // $CN= mysqli_connect("localhost","root","");
    // $DB=mysqli_select_db($CN,"formal_store");

    // $encode = '{"shopType":[{"shop_type_name":"Retailer"}],"category":[{"category":"Bakery Products"}],"sub_category":[{"sub_category":"Bakery snacks"}],"brand":[{"brand":"Fresho"}]}';
    // $DecodedData=json_decode($encode,true);
    // print_r($DecodedData);
    // foreach($DecodedData['shopType'] as $typeresult) {
    //     foreach($DecodedData['category'] as $cateresult) {
    //         foreach($DecodedData['sub_category'] as $subcatresult) {
    //             foreach($DecodedData['brand'] as $brandresult) {
    //                 $shop_type = "'" . implode ( "', '", $typeresult ) . "'";
    //                 $category = "'" . implode ( "', '", $cateresult ) . "'";
    //                 $sub_category = "'" . implode ( "', '", $subcatresult ) . "'";
    //                 $brand = "'" . implode ( "', '", $brandresult ) . "'";
                    
    //                 $product = [];
    //                 $sql="SELECT * FROM `base_products` WHERE `shop_type` IN ($shop_type) AND `category` IN ($category) AND `sub_category` IN ($sub_category) AND `brand` IN ($brand)" ;

    //                 if($result=mysqli_query($CN,$sql))
    //                 {
    //                     $cr = 0;
    //                     while($row = mysqli_fetch_assoc($result))
    //                     {
    //                         $product[$cr]['base_product_id'] = $row['base_product_id'];
    //                         $product[$cr]['shop_type'] = $row['shop_type'];
    //                         $product[$cr]['category'] = $row['category'];
    //                         $product[$cr]['sub_category'] = $row['sub_category'];
    //                         $product[$cr]['brand'] = $row['brand'];
    //                         $product[$cr]['product_name'] = $row['product_name'];
    //                         $product[$cr]['product_type'] = $row['product_type'];
    //                         $product[$cr]['product_sub_type'] = $row['product_sub_type'];
    //                         $product[$cr]['product_weight'] = $row['product_weight'];
    //                         $product[$cr]['product_weight_type'] = $row['product_weight_type'];
    //                         $product[$cr]['product_qty'] = $row['product_qty'];
    //                         $product[$cr]['product_price'] = $row['product_price'];
    //                         $product[$cr]['offer_price'] = $row['offer_price'];
    //                         $cr++;
    //                     }

    //                     echo json_encode($product);
    //                     http_response_code(201);
    //                 }
    //                 else{
    //                     http_response_code(422);
    //                 }
    //             }
    //         }
    //     }
    // }
    // die();
    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $EncodedData=file_get_contents('php://input');
    
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        //print_r($DecodedData);
        foreach($DecodedData['shopType'] as $typeresult) {
            foreach($DecodedData['category'] as $cateresult) {
                foreach($DecodedData['sub_category'] as $subcatresult) {
                    foreach($DecodedData['brand'] as $brandresult) {
                        $shop_type = "'" . implode ( "', '", $typeresult ) . "'";
                        $category = "'" . implode ( "', '", $cateresult ) . "'";
                        $sub_category = "'" . implode ( "', '", $subcatresult ) . "'";
                        $brand = "'" . implode ( "', '", $brandresult ) . "'";
                        
                        $product = [];
                        $sql="SELECT * FROM `base_products` WHERE `shop_type` IN ($shop_type) AND `category` IN ($category) AND `sub_category` IN ($sub_category) AND `brand` IN ($brand)" ;

                        if($result=mysqli_query($CN,$sql))
                        {
                            $cr = 0;
                            while($row = mysqli_fetch_assoc($result))
                            {
                                $product[$cr]['base_product_id'] = $row['base_product_id'];
                                $product[$cr]['shop_type'] = $row['shop_type'];
                                $product[$cr]['category'] = $row['category'];
                                $product[$cr]['sub_category'] = $row['sub_category'];
                                $product[$cr]['brand'] = $row['brand'];
                                $product[$cr]['product_name'] = $row['product_name'];
                                $product[$cr]['product_type'] = $row['product_type'];
                                $product[$cr]['product_sub_type'] = $row['product_sub_type'];
                                $product[$cr]['product_weight'] = $row['product_weight'];
                                $product[$cr]['product_weight_type'] = $row['product_weight_type'];
                                $product[$cr]['product_qty'] = $row['product_qty'];
                                $product[$cr]['product_price'] = $row['product_price'];
                                $product[$cr]['offer_price'] = $row['offer_price'];
                                $cr++;
                            }

                            echo json_encode($product);
                            http_response_code(201);
                        }
                        else{
                            http_response_code(422);
                        }
                    }
                }
            }
        }
    }
?>