 // 商品数量的增加与减少
 $(function() {


$('footer').load('html/footer.html',function(){
        $('footer ul li:nth-child(1)').on('click',function(){
            window.location.href='./index.html';
        })

        $('footer ul li:nth-child(2)').on('click',function(){
            window.location.href='./html/classify.html';
        })

        $('footer ul li:nth-child(3)').on('click',function(){
            window.location.href='./car.html'
        })

        $('footer ul li:nth-child(4)').on('click',function(){
            var username = window.sessionStorage.getItem('username');
            if (username) {
                window.location.href='./html/personal_rem.html';
            }else{
                window.location.href='./html/login_rem.html';
            }
        })


    });

    


    $.post(erp.baseUrl + 'getmyoption', {
         option: 'mycart'
     }, function(response) {
        console.log(response[0])
         $('.oul').html(

             response.map(function(ele, idx) {

                 return `  <li class="oli clear"  data-id="${ele.dataid}">
                    <div class="left clear">
                        <img src="${ele.img}" alt="" style="width:80px;height:80px">
                    </div>
                    <div class="right">

                        <p class="tittle"> ${ele.tittle}</p>
                         <p class="off">X</p>
                        <p>颜色：白色</p>
                        <p class="price">${ele.price}</p>
                        <div class="buy-num">
                            <div class="buy clear">
                                <div class="buy-add">
                                    <span class="minus">-</span>
                                    <input type="text" class="num" value="${ele.num}">
                                    <span class="add">+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>`

             })

         )


         $('.add').click(function() {

             var num = $(this).prev('.num').val() - 0;
             num++;

             $(this).prev('.num').val(num);


             $('.countPrice').html('￥' + js());



         })


         $('.minus').click(function() {
             console.log($(this).next('.num').val())
             var num = $(this).next('.num').val() - 0;
             num--;
             if (num < 0) {
                 num = 0;
             }

             $(this).next('.num').val(num);
             $('.countPrice').html('￥' + js());


         })


         function js() {

             var zj = 0;

             $('.oli').map(function(idx, ele) {

                 zj += $(this).find('.num').val() * $(this).find('.price').html();
                 // console.log(zj)

             })

             return parseFloat(zj).toFixed(2);

         }


         $('.countPrice').html('￥' + js())


         $('.oli').on('click', '.off', function() {

             $(this).parents('.oli').remove();
             $('.countPrice').html('￥' + js());


         })



     $('.off').click(function() {

         console.log($(this).parents('.oli').attr('data-id'))
         $.post(erp.baseUrl + 'remove', {
             option: 'mycart',
             dataid: $(this).parents('.oli').attr('data-id'),
         }, function(response) {

         })
     })


    })

    

 $('.gozf').click(function(e){
     e.stopPropagation();
     $.get(erp.baseUrl + 'getsession', {
     
     }, function(data) {
         console.log(data.data)
         if (!data.data) {
             location.href = "../webapp/html/login_rem.html";
             return;
         }
     })
     
     
     
        var oliList = $('.oul').children('.oli');
        console.log(oliList.length)
         var data = new Date();
       var rel = data.getFullYear() + '' + data.getMonth() + '' + data.getDate() + parseInt(Math.random()*100000);
        var arr = [];
        for(var i = 0; i < oliList.length; i++){
            var oli = oliList[i];
            console.log(oli)
            var obj = {
                img: $(oli).find('img').attr('src'),
                tittle: $(oli).find('.tittle').html(),
                price: $(oli).find('.price').html(),
                orderid: rel,
                num: $(oli).find('.num').val()
            };
            arr.push(obj);

        }
       //console.log(arr)

                //转字符串
                var resObj = JSON.stringify(arr);
                //var arr = ['myaddress','myorder','mycollection','mycart'];

                $.post(erp.baseUrl + 'putmyoption', {
                    myorder: resObj
                }, function(response) {
    
                    location.href = 'html/orders.html';
                    
                })
     // $.post(erp.baseUrl + 'remove', {
     //     option: 'mycart',
     // }, function(response) {
     //     //location.href = 'html/orders.html';
     // })
    
    


 })




 })
