<?php
header("content-type:application/json");
header("content-type: text/html; charset=UTF-8");  

//Host name, UserName, Password
$db = mysql_connect("","","");
if (!$db) {
	die('Could not connect to db: '.mysql_error());
}

//Dtatbase Name
mysql_select_db("",$db);

mysql_query ("set character_set_client='utf8'"); 
 mysql_query ("set character_set_results='utf8'"); 

 mysql_query ("set collation_connection='utf8_general_ci'"); 

$result = mysql_query("select * from react",$db);

$json_response = array();

while ($row = mysql_fetch_array($result,MYSQL_ASSOC)) {
	    $row_array['id'] = $row['id'];
        $row_array['title'] = $row['title'];
        $row_array['text'] = $row['text'];

        
        array_push($json_response,$row_array);

}
	echo json_encode($json_response);






?>
