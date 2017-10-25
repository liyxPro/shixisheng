<?php
require('init.php');

$sql = "SELECT * FROM sxs_companey";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
	$output=$row;
}
echo json_encode($output);
