 <?php 
	// require 'database.php';
    header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Credentials: true');
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require_once 'Classes/PHPExcel.php';
	$CN= mysqli_connect("localhost","root","");
	$DB=mysqli_select_db($CN,"formal_store");

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

		//load excel file using PHPExcel's IOFactory
		//change filename to tmp_name of uploaded file
		$excel = PHPExcel_IOFactory::load($_FILES['excel']['tmp_name']);
		print_r($excel->rows());
		die();
		//set active sheet to first sheet
		$objWorksheet=$excel->setActiveSheetIndex(0);
		//print_r($objWorksheet);die();
		$worksheet = $excel->getSheetNames([0]); 
		//print_r($worksheet);die();
		$allDataInSheet = $excel->getActiveSheet()->toArray(null, true, true, true);
		for ($sheet=0; $sheet < sizeof($worksheet) ; $sheet++) { 
			$rowcol= $excel->setActiveSheetIndex(0)->calculateWorksheetDimension($sheet);
			
			//print_r($rowcol);
			$i=0;
        	if($rowcol[0]!=1 &&$rowcol[1]!=1){
        		foreach ($excel->rows($sheet) as $key => $row) {
        			print_r($row);
        		}
        	}

		}

		die();
		print_r($excel->setActiveSheetIndex(0)->getHighestColumn());
		print_r($excel->setActiveSheetIndex(0)->getHighestRow());
		print_r($excel->setActiveSheetIndex(0)->calculateWorksheetDimension());
		die();
		// $worksheet = $excelObj->getSheetNames();
		//print_r($objWorksheet->getTitle());
		// print_r($allDataInSheet);
		//print_r($excel->getRowDimensions(2));
		// die();
		// for ($sheet=0; $sheet < sizeof($allDataInSheet) ; $sheet++) { 
		// 	$rowcol=$excel->getDimension($sheet);
		// 	$i=0;
		// }
		$col = $allDataInSheet[1];
		//print_r($col);
		//$rows = $allDataInSheet;
		$rows = array_slice($allDataInSheet,1);
		//print_r($rows);
		// $rowD = $excel->getRowDimensions();
		// print_r($rowD);
		//die();
		
		
		//print_r($rows);
		$q="";
		$qVal="";
		foreach($col as $val)
		{
			$q.=$val. " varchar(50),";
			
		}
		//print_r($q);
		
		// $query="CREATE table ".$objWorksheet->getTitle()." (".rtrim($q,",").");";
		// if (mysqli_query($CN, $query)) {
		// 	echo 'table created successfully';
			foreach($rows as $key => $cell)
			{
				print_r($cell);
				echo 'Rows: ', $cell['totalRows']; 
				foreach($cell as $key => $q)
				{
					
					$qVal.="'".$q. "',";

				}
			}
			print_r($qVal);
			//$sqlquery="INSERT INTO ".$objWorksheet->getTitle()." values (".rtrim($qVal,",").");";

			// $sqlquery="INSERT INTO ".$objWorksheet->getTitle()." values (1,'cody','coder'),(2,'miller','developer'),(3,'chris','manager')";

			// echo $sqlquery;
			// if (mysqli_query($CN, $sqlquery) or die("database error:". mysqli_error($CN))) {
			// 	echo 'values inserted successfully';
			// }
			// }
		die();
		
		
		// foreach($allDataInSheet as $row)
		// {
		// 	print_r($row);
		// }
		
		die();
		echo "<table border=1>";
		//first row of data series
		$i = 1;
		$excel->getActiveSheet()->getCell('A'.$i)->getValue() != "";
		$id =		$excel->getActiveSheet()->getCell('A'.$i)->getValue();
		// $name =		$excel->getActiveSheet()->getCell('B'.$i)->getValue();
		// $address =	$excel->getActiveSheet()->getCell('C'.$i)->getValue();
		// $phone =	$excel->getActiveSheet()->getCell('D'.$i)->getValue();

		echo "
			<tr>
				<td>".$createtbl."</td>
			</tr>
		";
		// $sql1 = "CREATE TABLE temp (
  //           `".$id."` INT(2)  PRIMARY KEY, 
  //           `".$name."` VARCHAR(30) NOT NULL,
  //       	`".$address."` VARCHAR(30) NOT NULL,
  //   		`".$phone."` VARCHAR(30) NOT NULL)";
  //   	if (mysqli_query($CN, $sql1)) {
  //           echo "Table employees created successfully";
  //           $j = 2;
		// 	//loop until the end of data series(cell contains empty string)
		// 	while( $excel->getActiveSheet()->getCell('A'.$j)->getValue() != ""){
		// 		//get cells value
		// 		$id =		$excel->getActiveSheet()->getCell('A'.$j)->getValue();
		// 		$name =		$excel->getActiveSheet()->getCell('B'.$j)->getValue();
		// 		$address =	$excel->getActiveSheet()->getCell('C'.$j)->getValue();
		// 		$phone =	$excel->getActiveSheet()->getCell('D'.$j)->getValue();

		// 		echo "
		// 			<tr>
		// 				<td>".$id."</td>
		// 				<td>".$name."</td>
		// 				<td>".$address."</td>
		// 				<td>".$phone."</td>
		// 			</tr>
		// 		";
				
		// 		$sql = $sql="INSERT INTO `temp`(id,name,address,phone) values('$id','$name','$address','$phone')";
		// 		$R=mysqli_query($CN,$sql) or die("database error:". mysqli_error($CN));
		    
	 //  	      	if($R)
	 //  	      	{
	 //  	      		echo 'success';
	 //  	      	}
				
		// 		//and DON'T FORGET to increment the row pointer ($i)
		// 		$j++;
		// 	}
  //       } 
  //       else {
  //           echo "Error creating table: " . mysqli_error($conn);
  //       }
		echo "</table>";
	}
?>