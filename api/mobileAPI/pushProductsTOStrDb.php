<?php
$shopId = $_GET['shopId'];

$con=mysqli_connect("localhost","root","",$shopId) or die(mysqli_error());

$delete = "DELETE FROM temp_str_config";
    $res1=mysqli_query($con,$delete) or die("database error:". mysqli_error($con));
    if($res1){
        $copyqry13="INSERT temp_str_config SELECT * FROM formal_store.temp_str_config WHERE temp_shopId ='$shopId'";
        $res13=mysqli_query($con,$copyqry13) or die("database error:". mysqli_error($con));
        if($res13){
            $CN= mysqli_connect("localhost","root","");
            $DB=mysqli_select_db($CN,$shopId);

            $shop=[];
            $Sql_Query = "SELECT * from `shop_details` WHERE `shopId` = '$shopId' ";

            if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
            {
                while($row = mysqli_fetch_assoc($result))
                {
                    $shop['shopId'] = $row['shopId'];
                    $shop['dbcreation_status'] = $row['dbcreation_status'];
                }
                echo json_encode($shop);
            }
            else
            {
                http_response_code(404);
            }
        }
    }

// $ip_server = $_SERVER['SERVER_ADDR'];
// $cPanel = new cPanel("direcbuy", "Default!@#123", $ip_server);

// // Check the example_test database.
// $check_db = $cPanel->uapi(
//     'Mysql', 'check_database',
//     array(
//         'name'       => "direcbuy_".$shopId,
//     )
// );
// if($check_db->status == 0 )
// {
//     http_response_code(404);
// }
// else
// {

//     $delete = "DELETE FROM temp_str_config";
//     $res1=mysqli_query($con,$delete) or die("database error:". mysqli_error($con));
//     if($res1){
//         $copyqry13="INSERT temp_str_config SELECT * FROM formal_store.temp_str_config WHERE temp_shopId ='$shopId'";
//         $res13=mysqli_query($con,$copyqry13) or die("database error:". mysqli_error($con));
//         if($res13){
//             $CN= mysqli_connect("localhost","root","");
//             $DB=mysqli_select_db($CN,$shopId);

//             $shop=[];
//             $Sql_Query = "SELECT * from `shop_details` WHERE `shopId` = '$shopId' ";

//             if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
//             {
//                 while($row = mysqli_fetch_assoc($result))
//                 {
//                     $shop['shopId'] = $row['shopId'];
//                     $shop['dbcreation_status'] = $row['dbcreation_status'];
//                 }
//                 echo json_encode($shop);
//             }
//             else
//             {
//                 http_response_code(404);
//             }
//         }
//     }
    
    
// }



