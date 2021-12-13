<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = $db;
    $user_id;
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // sql to create table
    $sql = "CREATE TABLE MyGuests (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";

    if ($conn->query($sql) === TRUE) 
    {
        echo "Table MyGuests created successfully";
        $qry = "CREATE TABLE tbl_user (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(30) NOT NULL,
            lastname VARCHAR(30) NOT NULL,
            email VARCHAR(50),
            reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        if ($conn->query($qry) === TRUE) 
        {
            $qry="UPDATE `shop_details` SET `dbcreation_status`=1 WHERE `shopId`='{$dbname}' LIMIT 1  ";
            if(mysqli_query($CN,$qry))
            {
                http_response_code(422);
            }
            else{
                http_response_code(204);
            }
            
        }
        else{
            echo "Error creating table: " . $conn->error;
        }
    } else {
        echo "Error creating table: " . $conn->error;
    }

//$conn->close();
?>