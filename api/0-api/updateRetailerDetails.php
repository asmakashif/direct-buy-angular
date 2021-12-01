<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);

        $id = $DecodedData['id'];
        $firstname = $DecodedData['firstname'];
        $lastname=$DecodedData['lastname'];
        $address=$DecodedData['address'];
        $str_msg=$DecodedData['str_msg'];
        if(empty($str_msg))
        {
            $sql="UPDATE `tbl_user` SET `firstname`='$firstname',`lastname`='$lastname',`address`='$address' WHERE `id`='{$id}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql);
            if($R)
            {
            	http_response_code(204);
            }
            else{
            	http_response_code(422);
            }
        }
        else
        {
            $sql="UPDATE `tbl_user` SET `str_msg`='$str_msg' WHERE `id`='{$id}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql);
            if($R)
            {
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        }
    }
?>