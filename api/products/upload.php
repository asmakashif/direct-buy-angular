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
    $target_file = $target_dir.basename($_FILES["myFile"]["name"]);
    move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file);

    $temp_str_config_id = $_POST['temp_str_config_id'];
    $product_image = basename($_FILES["myFile"]["name"]);

    $sql="UPDATE `temp_str_config` SET `product_img`='$product_image' WHERE `temp_str_config_id`='{$temp_str_config_id}' LIMIT 1  ";

    $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
    if($R)
    {
        http_response_code(204);
    }
    else{
        http_response_code(422);
    }

      // $uploadok=1;
    // $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

    // if(isset($_POST)){
    // 	$check = getimagesize($_FILES["myFile"]["tmp_name"]);
    // 	if($check!==false){
    // 		echo "File is an image - ".$check["mime"] . ".";
    // 		$uploadok=1;
    // 	}
    // 	else
    // 	{
    // 		echo "File is not an image";
    // 		$uploadok=0;
    // 	}
    // }


    //echo $filename = $_FILES['myFile']['name'];
    // print_r($_FILES);
?>