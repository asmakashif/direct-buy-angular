<?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $id=$_GET['id']; 
    $subdomain=$_GET['subdomain']; 

    $sql="SELECT * FROM `tbl_user` WHERE `domainname`='{$subdomain}' AND `id`='{$id}'" ;
    $result=mysqli_fetch_assoc(mysqli_query($CN,$sql));
    if($result)
    {
        //echo json_encode($result['remove_user']);
        echo json_encode(
            array(
              "message"=>$result['remove_user']
             
            ));
    }
    else{
        echo json_encode(
            array(
              "message"=>"Something went wrong try again"
             
            ));
    }

    public function createSubdomain()
    {
        $domainname='imran';
        $ip_server = $_SERVER['SERVER_ADDR'];
        $cPanel = new cPanel("direcbuy", "ThisIs@StrongP@ssw0rd", $ip_server);
        $my_variable = $cPanel->uapi(
            'SubDomain', 'addsubdomain',
                array(
                'domain'                => $domainname,
                'rootdomain'            => 'direct-buy.in',
                'dir'                   => '/public_html/hani',
                'disallowdot'           => '1',
            )
        );
    }

?>