$(function () {
	$(".model_bg").load("tpl/login.html");
	$("#nav").load("tpl/header.html");
	$("#footer").load("tpl/footer.html");
	var num = 4;
	$(".items").on("click", "div", function () {
		$(this).addClass("item_click");
		$(this).siblings().removeClass("item_click");
	})
	$(".cf_list").on("click", "li", function () {
		var prev = $(".cf_list li.cf_list_click").data("job");
		var now = $(this).data("job");
		var d = $("#dialog");
		num += (now - prev) * 11;
		d.css("left", num + "%");
		$(this).addClass("cf_list_click");
		$(this).siblings().removeClass("cf_list_click");
		$(".cf_box ul").empty();
		loadList(this.dataset.job - 1);
		//$(".cf_box ul").children();

	})
	var ipt = $(".input_box");
	var btn = $("#search_btn");
	$(".search_input").on("focus", function () {
		ipt.css("border-radius", "0");
		btn.css("border-radius", "0");
	})
	$(".search_input").on("blur", function () {
		ipt.css("border-radius", "10px");
		btn.css("border-top-right-radius", "6px");
		btn.css("border-bottom-right-radius", "6px");
	})
	$(".cf_box ul").on("click", "li", function () {
		//console.log(this.innerHTML);
		window.location.href = "search.html?keywords=" + this.innerHTML;
	})
	function loadList(index) {
		var htmlListName = "";
		var htmlListDetails = "";
		var jobL = [];
		$.ajax({
			type: "get",
			url: "data/company.json",
			dataType: "json",
			success: function (result) {
				var jobL = result[index].listDetails;
				$.each(result, function (i, item) {
					htmlListName += '<li data-job="' + (i + 1) + '">' + item.listName + '</li>';
				})
				if (index == 0 && ($(".cf_list").children().length == 0)) {
					$(".cf_list").append(htmlListName);
					$(".cf_list li:first-child").addClass("cf_list_click");
				}

				for (var i = 0; i < jobL.length; i++) {
					htmlListDetails += '<li>' + jobL[i] + '</li>';
				}
				$(".cf_box ul").append(htmlListDetails);
				var comList = $(".cf_box ul").children();
				for (var i = 0, sumL = 0; i < comList.length; i++) {
					sumL += parseFloat(comList[i].offsetWidth);
				}
				sumL += comList.length * 8;
				var comListHeight = Math.ceil(sumL / 1005) * 32;
				console.log(comListHeight);
				$(".cf_box").css("height", comListHeight + "px");
			}
		});
	}
	loadList(0);
	function LoadcompanyList() {
		$.ajax({
			type: "get",
			url: "data/companyList.php",
			success: function (data) {
				var htmlCompanyList = "";
				for (var i = 0; i < data.length; i++) {
					htmlCompanyList += "<li><a href='company.html?companyN=" + data[i].cname + "'><img src='img/companeyImg/" + data[i].cimg + "'></a><div class='text_box'><h1>" + data[i].cname + "</h1><p>" + data[i].cdesc + "</p></div></li>"
				}
				$(".img_box").append(htmlCompanyList);
			}
		})
	}
	LoadcompanyList();
	$("#search_btn").on("click", function (e) {
		e.preventDefault();
		var val = $(".search_input").val();
		window.location.href = "search.html?keywords=" + val;
	})

})