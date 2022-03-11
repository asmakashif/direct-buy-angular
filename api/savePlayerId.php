<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $playerId = [];
    $player_id = $_GET['player_id'];
    $user_id = $_GET['user_id'];
    $added_date = date('Y-m-d');

    $sql = "SELECT * FROM `retailer_player_ids`as rp JOIN `tbl_user` as tu ON tu.id=rp.user_id WHERE `player_id` = '$player_id' AND `user_id` = '$user_id'";

    if($result = mysqli_fetch_assoc(mysqli_query($CN,$sql)))
    {
        echo json_encode($result['player_id']);
        // $cr = 0;
        // while($row = mysqli_fetch_assoc($result))
        // {
        //     $playerId[$cr]['player_id'] = $row['player_id'];
        //     $cr++;
        // }
        // echo json_encode($playerId);
    }
    else
    {
        $sql="INSERT INTO retailer_player_ids(user_id,player_id,added_date) VALUES ('$user_id','$player_id','$added_date')";
        $res=mysqli_query($CN,$sql);
        if($res)
        {
            echo json_encode(
                array(
                  "message"=>"Success"
                ));
            http_response_code(201);
        }
        else{
            //echo  0;
            http_response_code(422);
        }
    }

    // $EncodedData=file_get_contents('php://input');
    // if(isset($EncodedData) && !empty($EncodedData))
    // {
    //     $DecodedData=json_decode($EncodedData,true);

    //     $player_id = $DecodedData['player_id'];
    //     $user_id = $DecodedData['user_id'];
    //     $added_date = date('Y-m-d');
        
    //     $player_id = [];

    //     $sql = "SELECT * FROM `retailer_player_ids`as rp JOIN `tbl_user` as tu ON tu.id=rp.user_id WHERE `player_id` = '$player_id' AND `user_id` = '$user_id'";
    //     $result=mysqli_query($CN,$sql);
    //     if($result)
    //     {
    //         $cr = 0;
    //         while($row = mysqli_fetch_assoc($result))
    //         {
    //             $player_id[$cr]['player_id'] = $row['player_id'];
    //             $cr++;
    //         }

    //         echo json_encode($player_id);
    //     }
    //     else{
    //         $sql="INSERT INTO retailer_player_ids(user_id,player_id,added_date) VALUES ('$user_id','$player_id','$added_date')";
    //         $res=mysqli_query($CN,$sql);
    //         if($res)
    //         {
    //             http_response_code(201);
    //         }
    //         else{
    //             //echo  0;
    //             http_response_code(422);
    //         }
    //     }
    // }
?>