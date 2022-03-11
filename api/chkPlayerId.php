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

        $player_id = $DecodedData['player_id'];
        $user_id = $DecodedData['user_id'];
        $added_date = date('Y-m-d');

        $sql = "SELECT * FROM `retailer_player_ids`as rp JOIN `tbl_user` as tu ON tu.id=rp.user_id WHERE `player_id` = '$player_id' AND `user_id` = '$user_id'";
        $result=mysqli_fetch_assoc(mysqli_query($CN,$sql));
        if($result)
        {
            echo json_encode(
                array(
                  "player_id"=>$result['player_id']
                 
                ));
        }
        else{
            http_response_code(422);
        }
    }
?>