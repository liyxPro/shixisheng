$(function(){
    $("#nav").load("tpl/header.html");
	$(".model_bg").load("tpl/login.html");
	$("#footer").load("tpl/footer.html");
    $(".dp_btn").on("click",function(){
        if($(".cret").hasClass("top")){
           	$(".cret").removeClass("top");
           	$(".menu").removeClass("height");
        }else{
           	$(".cret").addClass("top");
           	$(".menu").addClass("height");
        }
    })
    $(".dropdown").on("click",".cur_click li",function(){
        $(this).addClass("menu_click").siblings().removeClass("menu_click");
    })
    $("#search_btn").on("click",function(){
        loadJobList($(".search_input").val());
    })
    var kws=decodeURIComponent(document.location.href.split("=")[1]);
    if(kws!="undefined"){
        $(".search_input").attr("value",kws);
    }else{
        $(".search_input").attr("value","");
    }
    var lis="";
    if(location.search!=""){
      var kws=window.decodeURI(location.search.split("?")[1].split("=")[1]);
    }else{
       kws="";
    }

    function loadJobList(kws){
       	/*$.ajax({
       		url:"data/jobList.php",
       		success:function(data){
//     			<!--<a href="detail.html?wId=1">-->
 				$.each(data, function(key,result) {
				  lis+='<li><div class="left "><h1><a href="detail.html?jid='+result.jid+'">'+result.jtitle+'</a></h1><p><a href="company.html?companyN='+result.cname+'">'+result.cname+'</a><span>-'+result.jtype+'</span></p></div><div class="left"><p><svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon"></use></svg><span>'+result.ccity+'</span></p><p><svg class="icon" aria-hidden="true"><use xlink:href="#icon-qian"></use></svg><span>'+result.jsalary+'</span><span>/天</span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-rili"></use></svg><span>≥'+result.jdays+'天/周</span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-time"></use></svg><span>'+result.jpubTime+'更新</span></p></div><div class="right"><img src="img/companeyImg/'+result.cimg+'"/></div></li>';
				});
       			$(".sortList ul").append(lis);
       		}
       	})*/
		var list="";
		$.ajax({
        type: 'get',
        url: 'data/internList.php',
        data:{keywords:kws},
        dataType: 'jsonp',
        success: function (data) {
          list = data
          
          function format (times) {
            function formatTimes (t) {
              return `${t < 10 ? 0 : ''}${t}`
            }
            var time = `${formatTimes(times.getMonth() + 1)}-${formatTimes(times.getDay())}-${formatTimes(times.getHours())}:${formatTimes(times.getMinutes())}`
            console.log(time)
            return time
          }
          for (let item of data) {
            var times = new Date(item.jpubTime)
            var formatTime = format(times)
            item.jpubTime = formatTime
          }
            console.log(list)
            var lis="";
            $.each(list, function(key,result) {
                lis+='<li><div class="left "><h1><a href="detail.html?jid='+result.jid+'">'+result.jtitle+'</a></h1><p><a href="company.html?companyN='+result.cname+'">'+result.cname+'</a><span>-'+result.ctype+'</span></p></div><div class="left"><p><svg class="icon" aria-hidden="true"><use xlink:href="#icon-icon"></use></svg><span>'+result.ccity+'</span></p><p><svg class="icon" aria-hidden="true"><use xlink:href="#icon-qian"></use></svg><span>'+result.jminsalary+"-"+result.jmaxsalary+'</span><span>/天</span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-rili"></use></svg><span>≥'+result.jtime+'天/周</span><svg class="icon" aria-hidden="true"><use xlink:href="#icon-time"></use></svg><span>'+result.jpubTime+'更新</span></p></div><div class="right"><img src="img/companeyImg/'+result.cimg+'"/></div></li>';
            });
            $(".sortList ul li").remove();
            $(".sortList ul").append(lis);
        },
        error:function(){
            console.log("请求失败")
        }
      })
    }
    loadJobList(kws);
})