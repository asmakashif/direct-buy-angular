

<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test";
    // Checking connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    // sql code to create table
    $sql = "CREATE TABLE employees (
            id INT(2)  PRIMARY KEY, 
            firstname VARCHAR(30) NOT NULL,
            lastname VARCHAR(30) NOT NULL,
            email VARCHAR(50)
            )";

    if (mysqli_query($conn, $sql)) {
        echo "Table employees created successfully";
        $id = 'id';
        $sql1 = "CREATE TABLE tbl_users (
            `".$id."` INT(2)  PRIMARY KEY)";

        if (mysqli_query($conn, $sql1)) {
            echo "Table employees created successfully";
        } 
        else {
            echo "Error creating table: " . mysqli_error($conn);
        }
    } else {
        echo "Error creating table: " . mysqli_error($conn);
    }
    //mysqli_close($conn);
?>