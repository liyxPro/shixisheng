<?php
	require('init.php');
	$sql="select cid from sxs_job";
	$result = mysqli_query($conn,$sql);
	while( true ){
    	//从结果集中读取一行记录
    	$row = mysqli_fetch_assoc($result);
    	if(! $row ){  //没有获取到更多记录行
       	 break;
    	}
    	$cids[] = $row;
	}
	foreach($cids as $cid){
		$sql="select cname,ccity,cimg from sxs_companey where cid=$cid[cid]";
		$result = mysqli_query($conn,$sql);
		while( true ){
    		//从结果集中读取一行记录
	    	$row = mysqli_fetch_assoc($result);
	    	if(! $row ){  //没有获取到更多记录行
	       	 break;
	    	}
	    	$output[] = $row;
	    }
	    
	}
	$sql="select jid,jtitle,jtype,jsalary,jdays,jpubTime from sxs_job";
	$result = mysqli_query($conn,$sql);    
	for ($i= 0;$i< count($output); $i++){
	    while( true ){
    	//从结果集中读取一行记录
	    	$row = mysqli_fetch_assoc($result);
	    	if(! $row ){  //没有获取到更多记录行
	       	break;
	    	}
		$arr[]=$output[$i]+$row;
	}
	}	
	
	
	//echo json_encode($result);
	echo json_encode($arr);
	
?>