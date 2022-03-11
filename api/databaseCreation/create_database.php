<?php
	$servername = "localhost";
	$username = "root";
	$password = "";

	$shopId = $_GET['shopId'];

	// $CN= mysqli_connect("localhost","root","");
 //   	$DB=mysqli_select_db($CN,"formal_store");

 //    $sql = "SELECT * FROM credentials WHERE `host` = 'cPanel'";
    
	// $row = mysqli_fetch_assoc( mysqli_query($CN,$sql) );
	// $username = $row['email'];
	// $encryptedPassword = $row['password'];
	// $decryptedPassword = base64_decode($encryptedPassword);
 //    $password = json_decode($decryptedPassword);
	// die();

	// $ip_server = $_SERVER['SERVER_ADDR'];
 //    $cpanel = new CPANEL($username, $password, $ip_server);

	//$user_id = $_GET['user_id'];
	//$shopId = 'asma';
	//Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	// Create database
	$sql = "CREATE DATABASE " . $shopId;;
	if ($conn->query($sql) === TRUE) 
	{
		$CN= mysqli_connect("localhost","root","");
    	$DB=mysqli_select_db($CN,"formal_store");

    	$sql="UPDATE `shop_details` SET `dbcreation_status`=1 WHERE `shopId`='{$shopId}' LIMIT 1  ";

        $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
        if($R)
        {
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
        else{
            http_response_code(422);
        }

		
		// setcookie("dbcreated", "true", time()+3600, "/","", 0); 
		// $db = $shopId;
		// $user_id;	
	 //   	include "create_table.php";
	  	//echo "Database created successfully";
	} else {
	  	echo "Error creating database: " . $conn->error;
	}

	// $conn->close();
?>