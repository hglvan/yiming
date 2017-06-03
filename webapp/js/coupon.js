$(function(){
	var $tab = $('.tab');
	var $content = $tab.find('.content');
	var $title = $tab.children('.title');
	//显示未使用页面
	$content.children().eq(0).show();
	// 高亮第一个tab
	$title.children().eq(0).addClass('active');

	//绑定点击事件
	$title.on('click','>span',function(){
		var idx = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');

		$content.children().hide().eq(idx).fadeIn(400);
	});

	//设置有效期
	var $date = $('.date');
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;//0-11
	var date = now.getDate();

	// 利用数组实现星期的显示
	var week = now.getDay();//0-6
	var arrWeek = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六'];
	// 补0操作
	month = month<10 ? '0'+month : month;
	date = date<10 ? '0'+date : date;
	var str = '有效期至' + year + '-' + month + '-' + (date) + arrWeek[week];
	$date.html(str);

	//领取优惠券
	var $btn_discount = $('.btn_discount');
	$btn_discount.on('click',function(){
		var $ul = $(this).parent().parent();
		var $used = $('.used');

		$(this).remove();
		$ul.hide();
		var $clone = $ul.clone(true).show(200);
		$used.append($clone);

	});

});