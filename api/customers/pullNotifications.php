<?php 
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $notifications = [];
    $user_id=$_GET['user_id']; 

    // $sql="SELECT FROM notifications JOIN notification_receivers ON notification_receivers.NotificationRID=notifications.NotificationID WHERE NotificationReceiverID='$user_id'";

    $sql = "SELECT * FROM `notifications`as n JOIN `notification_receivers` as nr ON nr.NotificationRID=n.NotificationID WHERE `NotificationReceiverID` = '$user_id'";

    if($result = mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN)))
    {
        $i = 0;
        while($row = mysqli_fetch_assoc($result))
        {
            $notifications[$i]['NotificationID'] = $row['NotificationID'];
            $notifications[$i]['NotificationTitle'] = $row['NotificationTitle'];
            $notifications[$i]['NotificationContent'] = $row['NotificationContent'];
            $notifications[$i]['NotificationRedirect']    = $row['NotificationRedirect'];
            $notifications[$i]['Iscomplete'] = $row['Iscomplete'];
            $notifications[$i]['NotiRID'] = $row['NotiRID'];
            $notifications[$i]['IsRead'] = $row['IsRead'];
             
            $i++;
        }
        echo json_encode($notifications);
        http_response_code(201);
    }
    else{
        http_response_code(404);
    }
?>