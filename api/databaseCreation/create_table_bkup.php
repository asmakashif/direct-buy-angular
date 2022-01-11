<?php
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $shopId = $_GET['shopId'];

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = $shopId;
    $user_id;
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // sql to create table
    $qry = "CREATE TABLE tbl_user (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(30) NOT NULL,
        lastname VARCHAR(30) NOT NULL,
        email VARCHAR(50),
        reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )";
    if ($conn->query($qry) === TRUE) 
    {
        $qry1 = "CREATE TABLE tbl_user (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            firstname VARCHAR(30) NOT NULL,
            lastname VARCHAR(30) NOT NULL,
            email VARCHAR(50),
            reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";
        if ($conn->query($qry1) === TRUE) 
        {
            $qry1 = "CREATE TABLE temp_str_config (
                temp_str_config_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                user_id INT(6),
                temp_shopId VARCHAR(255),
                base_product_id INT(6),
                db_SKU VARCHAR(255) NOT NULL,
                shop_type VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                sub_category VARCHAR(255) NOT NULL,
                brand VARCHAR(255),
                product_name VARCHAR(255) NOT NULL,
                product_type VARCHAR(255) NOT NULL,
                product_sub_type VARCHAR(255) NOT NULL,
                product_description VARCHAR(255) NOT NULL,
                product_weight INT(6),
                product_weight_type VARCHAR(255) NOT NULL,
                product_qty INT(6),
                product_price INT(6),
                offer_price INT(6),
                product_img VARCHAR(255) NOT NULL,
                upload_format INT(6),
                store_SKU VARCHAR(255) NOT NULL,
                product_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                product_updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                product_status INT(6)
            )";
            if ($conn->query($qry1) === TRUE) 
            {
                $updateqry="UPDATE `shop_details` SET `dbcreation_status`=2 WHERE `shopId`='{$dbname}' LIMIT 1  ";
                if(mysqli_query($CN,$updateqry))
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
                    http_response_code(204);
                }
            }
            else{
                echo "Error creating table: " . $conn->error;
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