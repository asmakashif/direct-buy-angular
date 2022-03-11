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
        $subdomain=$DecodedData['subdomain']; 
        $id=$DecodedData['id']; 

    
        $qry="UPDATE `tbl_user` SET `remove_user` = 1   WHERE `domainname`='{$subdomain}' AND `id`='{$id}'";
        if(mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN)))
        {
            $sql="SELECT * FROM `tbl_user` WHERE `domainname`='{$subdomain}' AND `id`='{$id}'" ;
            $result=mysqli_fetch_assoc(mysqli_query($CN,$sql));
            if($result)
            {
                //echo json_encode($result['remove_user']);
                echo json_encode(
                    array(
                      "message"=>$result['remove_user']
                     
                    ));
            }
            else{
                echo json_encode(
                    array(
                      "message"=>"Something went wrong try again"
                     
                    ));
            }

            // echo json_encode(
            //     array(
            //         "message"=>"Success"
            //     ));
            http_response_code(201);
        }
        else
        {
            // echo json_encode(
            //     array(
            //       "message"=>"Something went wrong try again"
                 
            //     ));
            http_response_code(422);
        }
    }
?>