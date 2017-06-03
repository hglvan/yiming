;
$(function(){
	$('footer').load('footer.html',function(){
        // $('footer ul li:first-child').click(function(){
        //     window.location.href='../index.html'
        // })

         $('footer ul li:nth-child(1)').on('click',function(){
            window.location.href='../index.html';
        })

        $('footer ul li:nth-child(2)').on('click',function(){
           window.location.href='../html/classify.html'
        })

        $('footer ul li:nth-child(3)').on('click',function(){
            window.location.href='../car.html'
        })

        $('footer ul li:nth-child(4)').on('click',function(){
            window.location.href='../html/personal_rem.html';
        })





    });
	$('header >ul >span').on('click',function(){
		$('.search').slideToggle();
	})
	var n=1;
	$('header >ul').on('click','li',function(){
		$(this).siblings().find('strong').hide();

		$(this).find('strong').show();
     
		// n++;
		// $(this).find('strong').css({
		// 	transform:`rotate(${n*180}deg)`
		// })	

     
	})
    var totalData;
    var num=0;
    showContent();
    function showContent(){
        
        //页面刷新就想数据库请求数据
        $.post(erp.baseUrl +'searchProducts',{
            // keyword : $('#keyword').val()
            keyword:'专业洗护'
        },function (response) {
            //这里的response是搜索到的所有数据
            //这里获取前14个数组
            totalData=response;
            var data=response.slice(0,14);
                $('main ul').html(data.map(function(item){
                    return  `<li class="${item.goodsid}"><div><a href="#">
                    <img src="../img/goodsimg/${item.goodsimg}.jpg"></a></div>
                    <div><a href="#">${item.goodstitle}</a></div><div>
                    <p>￥<span>${item.goodsprice}</span></p>
                    <p>已售<span>${item.hassole}</span>件</p></div></li>`
                }))
            
            
        }) 

    }

    //到页面最底部时，刷新页面
        $('main').scroll(function(){
            //获取main的高度
            var mTop=$(this).find('ul').height();
            var sTop=$(window).innerHeight();
            //获取滚轮滚动过的距离
            var toTop=$(this).scrollTop();
            var res=mTop-sTop-toTop;
            // console.log(res)
            if(res<-90){
                num++;
                var data1=totalData.slice(num*14,(num+1)*14);
            $('main ul')[0].innerHTML+=data1.map(function(item){
                    return  `<li class="${item.goodsid}"><div><a href="#">
                    <img src="../img/goodsimg/${item.goodsimg}.jpg"></a></div>
                    <div><a href="#">${item.goodstitle}</a></div><div>
                    <p>￥<span>${item.goodsprice}</span></p>
                    <p>已售<span>${item.hassole}</span>件</p></div></li>`
                }).join('');
            }
        })
	
    //点击页面之后跳转
   $('main ul').on('click','li',function(){

        window.location.href='../details.html'+'?goodsid='+$(this).attr('class');

   })
	
   //点击搜索按钮时
    $('header .form-inline span').on('click',function(){
        var search_value=$(this).prev().val();
        
        var search_arr=[];
        totalData.forEach(function(item){
            if(item.goodstitle.indexOf(search_value)>-1){
                search_arr.push(item)
            }
        })
       if(search_arr.length){
            $('main ul').html(search_arr.map(function(item){
                return  `<li class="${item.goodsid}"><div><a href="#">
                <img src="../img/goodsimg/${item.goodsimg}.jpg"></a></div>
                <div><a href="#">${item.goodstitle}</a></div><div>
                <p>￥<span>${item.goodsprice}</span></p>
                <p>已售<span>${item.hassole}</span>件</p></div></li>`
            }))
       }else{
            $('main ul').text('没有找到相关产品')
       }     
     
     
     
    })

    //点击销量时
     
     $('header ul li:nth-child(4)').on('click',function(){
        
        //循环数组
        for(var i=0;i<totalData.length;i++){
            for(var j=i+1;j<totalData.length;j++){
                if(parseFloat(totalData[i].hassole)<parseFloat(totalData[j].hassole)){
                    var temp;
                    temp=totalData[i];
                    totalData[i]=totalData[j];
                    totalData[j]=temp;
                }
            }
        }
        //将改变过后的数据写入
        var data6=totalData.slice(0,14);
         $('main ul').html(data6.map(function(item){
                return  `<li class="${item.goodsid}"><div><a href="#">
                <img src="../img/goodsimg/${item.goodsimg}.jpg"></a></div>
                <div><a href="#">${item.goodstitle}</a></div><div>
                <p>￥<span>${item.goodsprice}</span></p>
                <p>已售<span>${item.hassole}</span>件</p></div></li>`
            }))
     })

     //点击价格排序时
     
     $('header ul li:nth-child(1)').on('click',function(){
        
        //循环数组
        for(var i=0;i<totalData.length;i++){
            for(var j=i+1;j<totalData.length;j++){
                if(parseFloat(totalData[i].goodsprice)<parseFloat(totalData[j].goodsprice)){
                    var temp;
                    temp=totalData[i];
                    totalData[i]=totalData[j];
                    totalData[j]=temp;
                }
            }
        }
        //将改变过后的数据写入
        var data8=totalData.slice(0,14);
         $('main ul').html(data8.map(function(item){
                return  `<li class="${item.goodsid}"><div><a href="#">
                <img src="../img/goodsimg/${item.goodsimg}.jpg"></a></div>
                <div><a href="#">${item.goodstitle}</a></div><div>
                <p>￥<span>${item.goodsprice}</span></p>
                <p>已售<span>${item.hassole}</span>件</p></div></li>`
            }))
     })
        
})