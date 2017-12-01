<?php
require('init.php');

$sql = "SELECT jpubTime,jtitle,jtime,jlongMonth,jminsalary,jmaxsalary,cname,ctype,cimg,ccity FROM sxs_companey sc join sxs_job sj on sc.cid=sj.cid";
$result = mysqli_query($conn,$sql);
while( true ){
    //从结果集中读取一行记录
    $row = mysqli_fetch_assoc($result);
    if(! $row ){  //没有获取到更多记录行
        break;
    }
    $output[] = $row;
}
echo $_GET['callback']."(".json_encode($output).")";
