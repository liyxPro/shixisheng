<?php
/**
*用户登录验证
*请求参数：
  unameOrPhone-用户名或密码
  upwd-密码
*输出结果：
* {"code":1,"uid":1,"uname":"test","phone":"13012345678"}
* 或
* {"code":400}
*/
@$phoneOrEmail = $_REQUEST['phoneOrEmail'] or die('phone required');
@$upwd = $_REQUEST['upwd'] or die('upwd required');

require('init.php');

$sql = "SELECT uid,uname,utype FROM sxs_user WHERE (phone='$phoneOrEmail' AND upwd='$upwd')";
//OR (email='$phoneOrEmail' AND upwd='$upwd')";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row){
  $output['code'] = 1;
  $output['uid'] = intval($row['uid']);
  $output['uname'] = $row['uname'];
  $output['utype'] = $row['utype'];
}else {
  $output['code'] = 400;
}
echo json_encode($output);
