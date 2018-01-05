<?php
require('init.php');

$sql = "SELECT cname,cdesc,cimg FROM sxs_companey limit 0,8";
$result = mysqli_query($conn,$sql);
while( true ){
    //从结果集中读取一行记录
    $row = mysqli_fetch_assoc($result);
    if(! $row ){  //没有获取到更多记录行
        break;
    }
    $output[] = $row;
}
echo json_encode($output);
