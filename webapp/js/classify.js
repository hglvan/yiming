
;
$(function(){
	
	$('footer').load('../html/footer.html',function(){

        $('footer ul li:nth-child(1)').on('click',function(){
            window.location.href='../index.html'
        })
         $('footer ul li:nth-child(2)').on('click',function(){
            window.location.href='../html/classify.html'
        })

          $('footer ul li:nth-child(3)').on('click',function(){
            window.location.href='../car.html'
        })
           $('footer ul li:nth-child(4)').on('click',function(){
            window.location.href='../html/personal_rem.html'
        })

    });

    //点击搜索框时
    //头部点击搜索时
    $('header p').on('click',function(){    
          // $(this).prev().val()
           var encodeparam = encodeURI($(this).prev().find('input').val());
        window.location.href='./search.html'+'?keyword='+encodeparam;
      });
    
   

     //点击页面之后跳转
   $('main ul').on('click','li',function(e){
        e.preventDefault();
        var encodeparam = encodeURI($(this).find('a').text());
        window.location.href='./search.html'+'?keyword='+encodeparam;

   })
})