<?php
/**
*注册新用户
*请求参数：
  uname-用户名
  upwd-密码
  phone-电话号码
  utype-用户类型
*输出结果：
* {"code":1,"uid":3,"uname":"test"}
* 或
* {"code":500}
*/
@$uname = $_REQUEST['uname'] or die('uname required');
@$upwd = $_REQUEST['upwd'] or die('upwd required');
@$phone = $_REQUEST['phone'] or die('phone required');
@$utype = $_REQUEST['utype'] ;
if($utype===null){
	die('utype required');
}
require('init.php');
$output['uname']=$uname;

$sql = "INSERT INTO sxs_user VALUES(NULL,'$uname','$upwd','$phone',$utype)";
$result = mysqli_query($conn,$sql);
if($result){
  $output['code'] = 1;
  $output['uid'] = intval(mysqli_insert_id($conn));
  $output['utype'] = $utype;
}else {
  $output['code'] = 500;
}

echo json_encode($output);