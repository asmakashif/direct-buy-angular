 <?php 
    // require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $CN= mysqli_connect("localhost","root","");
    $DB=mysqli_select_db($CN,"formal_store");

    $target_dir="ExcelSheets/";
    $files2 = scandir($target_dir, 1);
    
    $shopId = $_POST['shopId'];
    $xl_file_name = str_replace(' ', '', basename($_FILES["myFile"]["name"]));
    
    $temp = explode(".", $xl_file_name);
    $newxlfilename = $shopId.'-products'. '.' . end($temp);

    if (in_array($newxlfilename, $files2))
    {
        $deleted = unlink("ExcelSheets/".$newxlfilename);
        if ($deleted) {
            $target_file = $target_dir.$newxlfilename;
            move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file);

            $sql="UPDATE `shop_details` SET `xl_file_name`='$newxlfilename' WHERE `shopId`='{$shopId}' LIMIT 1  ";

            $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
            if($R)
            {
                http_response_code(204);
            }
            else{
                http_response_code(422);
            } 
        } 
    }
    else
    {
        $target_file = $target_dir.$newxlfilename;
        move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file);

        $sql="UPDATE `shop_details` SET `xl_file_name`='$newxlfilename' WHERE `shopId`='{$shopId}' LIMIT 1  ";

        $R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
        if($R)
        {
            http_response_code(204);
        }
        else{
            http_response_code(422);
        } 
    }
?>