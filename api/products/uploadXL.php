 <?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    //require_once 'Classes/PHPExcel.php';
	// $CN= mysqli_connect("localhost","root","");
	// $DB=mysqli_select_db($CN,"formal_store");

	//we can combine this with file upload
	if( empty($_FILES) ){
		echo "
			<form method='post' enctype='multipart/form-data' action='uploadXL.php'>
				<input type='file' name='excel'>
				<br>
				<button type='submit'>Fetch</button>
			</form>
		";
	}else{
		if(isset($_FILES['excel']['name'])){
		$con=mysqli_connect("localhost","root","","formal_store");
		include "xlsx.php";
		if($con){
		$excel=SimpleXLSX::parse($_FILES['excel']['tmp_name']);
		echo "<pre>";	
		// print_r($excel->rows());
		// //die();
		// print_r($excel->dimension(2));
		// //die();
		// //print_r($excel->sheetNames());
        for ($sheet=0; $sheet < sizeof($excel->sheetNames()) ; $sheet++) { 
        $rowcol=$excel->dimension($sheet);
        // print_r($rowcol);
        // die();
        $i=0;
        if($rowcol[0]!=1 &&$rowcol[1]!=1){
		foreach ($excel->rows($sheet) as $key => $row) {
			print_r($row);
			$q="";
			foreach ($row as $key => $cell) {
				//print_r($cell);echo "<br>";
				if($i==0){
					$q.=$cell. " varchar(50),";
				}else{
					$q.="'".$cell. "',";
				}
			}
			if($i==0){
				$query="CREATE table ".$excel->sheetName($sheet)." (".rtrim($q,",").");";
			}else{
				$query="INSERT INTO ".$excel->sheetName($sheet)." values (".rtrim($q,",").");";
			}
			echo $query;
			if(mysqli_query($con,$query))
			{
				echo "true";
			}
			echo "<br>";
			$i++;
		}
		die();
	}
		}
	}
}
	}
?>