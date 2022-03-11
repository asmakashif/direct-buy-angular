<?php 
    session_start();
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");
    
    // $firstname = 'Kashif';
    // $lastname = 'Ahmed';
    // $domainname= 'kashma';
    // $contact = '6363680531';
    // $email = 'kashif.ahmed96@gmail.com';
    // $password = 'kashif1234';
    // $base64 = base64_encode(json_encode($password));
    // print_r($base64);
    // die();

    // $sql="INSERT INTO `tbl_user`(firstname,lastname,domainname,contact,email,password) values('$firstname','$lastname','$domainname','$contact','$email','$password')";
    // $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));

    // if($R)
    // {
    //     $email = 'kashif.ahmed96@gmail.com';
    //     $last_id = $CN->insert_id;
        
    //     include "customers/sendMail.php";
    //     //echo 'success';
    //     http_response_code(201);
        
    // }
    // else{
    //     http_response_code(422);
    // }

    $EncodedData=file_get_contents('php://input');
    if(isset($EncodedData) && !empty($EncodedData))
    {
        $DecodedData=json_decode($EncodedData,true);
        // print_r($DecodedData);
        $firstname = $DecodedData['name'];
        
        $contact = $DecodedData['contact'];
        $domainname= $DecodedData['domain'];
        $document_root= $DecodedData['domain'];
        $fulldomain= $domainname.'.brokeronline.in';
        $email = $DecodedData['email'];
        $password = $DecodedData['password'];
        $encryptedPassword = base64_encode(json_encode($password));
        $verify_email=0;
        $registered_date = date('Y-m-d');
        $status=0;
        $create_reminder=0;
        $activate_reminder=0;
        $trail_activate=0;
        $payment_g_status=0;
        $remove_user=0;
        $otpVerify=0;
        $city=$DecodedData['city'];
        $state =$DecodedData['state'];

        $qry = "SELECT * FROM `tbl_user`as tu WHERE `email` = '$email' ";
        $res=mysqli_query($CN,$qry) or die("database error:". mysqli_error($CN));     

        if(mysqli_num_rows($res) > 0)
        {
            echo 0;
            http_response_code(422);
        }
        else
        {
            $sql="INSERT INTO `tbl_user`(firstname,domainname,document_root,fulldomain,contact,email,password,verify_email,registered_date,status,create_reminder,activate_reminder,trail_activate,payment_g_status,remove_user,otpVerify,city,state) values('$firstname','$domainname','$document_root','$fulldomain','$contact','$email','$encryptedPassword','$verify_email','$registered_date','$status','$create_reminder','$activate_reminder','$trail_activate','$payment_g_status','$remove_user','$otpVerify','$city','$state')";
            $R=mysqli_query($CN,$sql)or die("database error:". mysqli_error($CN));
        
            if($R)
            {
                // $subDomain = $domainname;
                // $email = $DecodedData['email'];
                // $last_id = $CN->insert_id;
                // //include "databaseCreation/createSubDomain.php";
                // include "customers/sendMail.php";
                http_response_code(201);
            }
            else{
                http_response_code(422);
                // $nd=[
                //     'NotificationContent'=>'Order - '.$order_code .' placed an order by'.$customer_name,
                //     'NotificationRedirect'=>'https://retailer.direct-buy.in/order-details/'.$order_code.'/'.$shopId.'/'.'shop_name',//path to be passed inside site_url()
                //     'Iscomplete'=>0,
                //     'NotificationStatus'=>0,
                //     'CreatedDateTime'=>date('Y-m-d')
                // ];
                // 'https://'.$domain.'.direct-buy.in/'
            }
        }
    }
?>