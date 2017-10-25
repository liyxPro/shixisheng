<?php
@$company = $_REQUEST['companyN'];
require('init.php');

$sql = "SELECT * FROM sxs_companey where cname='$company'";
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
