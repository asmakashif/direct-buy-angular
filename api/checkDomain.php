<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
    

    $domainname = $_POST['domainname'];
    
    $qry = "SELECT * from `tbl_user` WHERE `domainname` = '$domainname'  ";
    $res=mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN));
        

    if(mysqli_num_rows($res) > 0)
    {
        echo 1;
    }
    else
    {
        echo 0;
    }
    
?>