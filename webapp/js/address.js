$(function(){
	//写入地址
    $('#addressBtn').click(function (event) {
    	event.preventDefault();
    	// console.log($('#provs').text() + $('#area').val(),$('#input-address').val());
    	$.post()
        var obj = {
            address : $('#provs').text() + $('#area').val(),
            username : $('#input-name').val(),
            elephone : $('#input-phone').val(),
            dtlAddress : $('#input-address').val()
        };
        //转字符串
        var resObj = JSON.stringify(obj);
        //var arr = ['myaddress','myorder','mycollection','mycart'];
        $.post(erp.baseUrl +'putmyoption',{
                myaddress : resObj
            },function (response) {
            	location.href = 'address_parent.html';
            });

    });


    //绑定点击事件：点击时清空输入框
    $('.item-input').on('click','>a',function(){
        $(this).siblings().val('');
    });
});