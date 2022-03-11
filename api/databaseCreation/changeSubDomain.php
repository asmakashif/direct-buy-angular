<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $user_id=$_GET['user_id']; 
    $subdomainname=$_GET['domainname'];
    
    
    $sql="SELECT * FROM `tbl_user` WHERE `id`='{$user_id}'" ;
    $result=mysqli_fetch_assoc(mysqli_query($CN,$sql));
    if($result)
    {
        $encodeddomain = json_encode($result['domainname']);
        $decodeddomain = json_decode($encodeddomain);
        
        $updateqry="UPDATE `tbl_user` SET `domainname`='$subdomainname',`fulldomain`='$subdomainname.direct-buy.in' WHERE `id`='{$user_id}' LIMIT 1  ";
        if(mysqli_query($CN,$updateqry)or die("database error:". mysqli_error($CN)) )
        {
            echo json_encode(
           array(
             "message"=>"Success"
            ));
        }
        else{
            http_response_code(204);
        }
    }
?>