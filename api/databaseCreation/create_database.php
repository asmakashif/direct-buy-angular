<?php
	$servername = "localhost";
	$username = "root";
	$password = "";

	$shopId = $_GET['shopId'];
	$user_id = $_GET['user_id'];
	// Create connection
	$conn = new mysqli($servername, $username, $password);
	// Check connection
	if ($conn->connect_error) {
	  die("Connection failed: " . $conn->connect_error);
	}

	// Create database
	$sql = "CREATE DATABASE " . $shopId;;
	if ($conn->query($sql) === TRUE) 
	{
		$db = $shopId;
		$user_id;	
	   	include "create_table.php";
	  	//echo "Database created successfully";
	} else {
	  	echo "Error creating database: " . $conn->error;
	}

	// $conn->close();
?>