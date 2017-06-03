$(function(){
		var $dataid = window.localStorage.getItem('dataid',$dataid);
	//获取地址，并提取出对应id的地址
		$.post(erp.baseUrl +'getmyoption',{
                    option : 'myaddress'
                },function (response) {
                    var arr = response;
                    console.log(arr,JSON.stringify(arr));
                    arr.map(function(item){
                    	
                    	if (item.dataid == $dataid) {
                    		$('#provs').text(item.address);
			                $('#input-name').val(item.username);
			                $('#input-phone').val(item.elephone);
			                $('#input-address').val(item.dtlAddress);
                    	}
                    })
                });




	//修改地址
        $('#addresschangeBtn').click(function(event) {
        	event.preventDefault();
        	// console.log($('#provs').text() + $('#area').val(),$('#input-address').val());
            var obj = {
                address : $('#provs').text(),
                username : $('#input-name').val(),
                elephone : $('#input-phone').val(),
                dtlAddress : $('#input-address').val()
            };

            //转字符串
            var resObj = JSON.stringify(obj);
            console.log(resObj,$dataid)
            //var arr = ['myaddress','myorder','mycollection','mycart'];
            $.post(erp.baseUrl +'setmyoption',{
                    option : 'myaddress',
                    dataid : $dataid,
                    value : resObj
                },function (response) {

                });

        });


        $('.saveAdd').click(function(){
        	location.href = "address_parent.html";
        })

	});