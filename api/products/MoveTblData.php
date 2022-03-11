<?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $sql = "SELECT * FROM user_config";

    $result=mysqli_fetch_assoc(mysqli_query($CN,$sql));
    $fullname = $result['FullName'];
    $location = $result['Location'];
    $contact = $result['Contact'];

    $sql = "SELECT * FROM zasbha_temp";
    if($result = mysqli_query($CN,$sql))
    {
        $cr = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $products[$cr]['fullname'] = $row[$fullname];
            $products[$cr]['location'] = $row[$location];
            $products[$cr]['contact'] = $row[$contact]; 
            $cr++;
        }

        $encode = json_encode($products);
        $decode = json_decode($encode);
        foreach($decode as $row) {
            
            $fullname= $row->fullname;
            $location=$row->location;
            $contact=$row->contact;

            $qry1="INSERT INTO users(FullName,Location,Contact) values('$fullname','$location','$contact')";
    
            $R=mysqli_query($CN,$qry1) or die("database error:". mysqli_error($CN));
            
            if($R)
            {
                echo 'Success';
                http_response_code(204);
            }
            else{
                http_response_code(422);
            }
        }
    }
    else
    {
        http_response_code(404);
    }
?>