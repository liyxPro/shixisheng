<?php
@$phone = $_REQUEST['phone'] or die('phone required');
require('init.php');
$sql = "select * from sxs_user where phone='$phone'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if($row){
	$output['code']=400;
	$output['message']='err';
}else{
	$output['code']=1;
	$output['message']='suc';
}
echo json_encode($output);
?>