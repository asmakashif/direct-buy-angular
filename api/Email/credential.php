<?php 
	$CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store"); 
    $Sql_Query = "SELECT * from `credentials` WHERE  `id` = 1";

    if($result = mysqli_query($CN,$Sql_Query) or die("database error:". mysqli_error($CN)))
    {
        while($row = mysqli_fetch_assoc($result))
        {
            $host= $row['host'];
        	$email= $row['email'];
            $decryptedPassword = base64_decode($row['password']);

            define('HOST', $host);
			define('EMAIL', $email);
			define('PASS', $decryptedPassword);
		}
	}
 ?>