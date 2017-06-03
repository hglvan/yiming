$(function(){


$('footer').load('footer.html',function(){
        $('footer ul li:nth-child(1)').on('click',function(){
            window.location.href='../index.html';
        })

        $('footer ul li:nth-child(2)').on('click',function(){
            window.location.href='./classify.html';
        })

        $('footer ul li:nth-child(3)').on('click',function(){
            window.location.href='../car.html';
        })

        $('footer ul li:nth-child(4)').on('click',function(){
            var username = window.sessionStorage.getItem('username');
            if (username) {
                window.location.href='./personal_rem.html';
            }else{
                window.location.href='./login_rem.html';
            }
        })


    });



    $.post(erp.baseUrl + 'getmyoption', {
         option: 'myorder'
     }, function(response) {
     	console.log(response)
     	

     	for(var i = 0; i < response.length; i++){
     		var res = '';
     		var list1 = response[i];
     		var orderlist = response[i][0].orderid;
     		var sum = 0;
     		var num = 0;
     		res += `<div class="lihead">
						<i class="iconfont icon-wuxing"></i>
						<span>订单号:${orderlist}</span>
						<i class="iconfont icon-jinru"></i>
						<span class="status">代付款</span>
					</div><ul>`;

     		
     		res += response[i].map(function(ele){
     			num += parseFloat(ele.num);
     			sum += parseFloat(ele.num)*parseFloat(ele.price);
     			return `
					<li class="libody clear">
						<div class="goodsImg"><img src="../${ele.img}"></div>
						<div class="goodsMsg">${ele.tittle}</div>
						<div class="goodsPrice">
							<span class="price">￥${ele.price}</span>&times;<i class="eq">${ele.num}</i>
							
						</div>
					</li>
					`
     			
     		}).join('')
     		
     		res +=`</ul><div class="lifoot clear">
						<span>共${num}件商品，合计${sum}元(运费0.00)</span>
						<p class="alink">
							<a href="#">更多</a>
							<a href="#">查看物流</a>
							<a href="#" class = "del">删除订单</a>
						</p>
						
					</div>`
			var $div = $('<div class="ordergoods"></div>');
			$div.html(res);
			$div.appendTo('.all');
     	}

     	$('.del').click(function(){
     		
     		$(this).parents('.ordergoods').hide();


     	})



     	
     })







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







})