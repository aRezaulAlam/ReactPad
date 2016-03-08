<?php

header("content-type:application/json");
header("content-type: text/html; charset=UTF-8");  

//Host, Username, Password
$db = mysql_connect("","","");
if (!$db) {
    die('Could not connect to db: '.mysql_error());
}

//Database Name
mysql_select_db("",$db);

mysql_query ("set character_set_client='utf8'");
mysql_query ("set character_set_results='utf8'");

mysql_query ("set collation_connection='utf8_general_ci'");


 
// array for JSON response
$response = array();

// check for required fields
if (isset($_POST['title']) && isset($_POST['title']) ) {
 
$file_Name =  $_POST['title'].$_POST['text'];

// check for required fields

 
    $n_title = $_POST['title'];
    $n_text = $_POST['text'];
    

     

    
    $title = mysql_real_escape_string($n_title,$db);
    $text = mysql_real_escape_string($n_text ,$db);


 
    // include db connect class
 //  require_once __DIR__ . '/db_connect.php';
 
    // connecting to db
 //   $mdb = new DB_CONNECT();

    
    date_default_timezone_set('Asia/Dhaka');
     
    $date=strtotime(date('d-m-Y'));
  
   
    
    
    
mysql_query ("set character_set_client='utf8'"); 
 mysql_query ("set character_set_results='utf8'"); 

 mysql_query ("set collation_connection='utf8_general_ci'"); 
 
    // mysql inserting a new row
    $insert_data = mysql_query("INSERT INTO react (`title`, `text`) VALUES('$title','$text')",$db);



    

   if($insert_data){ 

   	$result = mysql_query("select * from react",$db);

	$json_response = array();

	while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
	    $row_array['id'] = $row['id'];
        $row_array['title'] = $row['title'];
        $row_array['text'] = $row['text'];

        
        array_push($json_response,$row_array);

}
	echo json_encode($json_response);
    } else {
    	$json_response = array();
	    $row_array['id'] = 100;
        $row_array['title'] = "database Error";
        $row_array['text'] = $file_Name;
        array_push($json_response,$row_array);

    echo json_encode($json_response);
    }

   
} else {
	$json_response = array();
	    $row_array['id'] = 100;
        $row_array['title'] = "Insertion Error";
        $row_array['text'] = $file_Name;
        array_push($json_response,$row_array);

    echo json_encode($json_response);
}

?>
