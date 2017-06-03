$(function(){

            $.post(erp.baseUrl +'getmyoption',{
                    option : 'myaddress'
                },function (response) {
                    var arr = response;
                    console.log(arr);

                    //遍历数组，生成数据
                    // var arr = [{username:'xu',elephone:13414}]
                    $('.tablelist')[0].innerHTML = arr.map(function(item){
                        console.log(item)
                        return `<li data-guid="${item.dataid}">
                    <i class="iconfont icon-cuo"></i>
                    <a href="address_change.html" class="change">编辑</a>
                    <b>${item.username}</b><i>${item.elephone}</i><br>
                    <span>${item.address}</span><br>
                    <span>${item.dtlAddress}</span>
                    </li>`;
                    }).join('');

                });

            //点击编辑按钮，存储相应的数据id
            $('.tablelist').on('click','.change',function(){
                    //移除
                    window.localStorage.removeItem('dataid'); 
                    
                    //写入
                    var $dataid = $(this).parent().attr('data-guid');
                    window.localStorage.setItem('dataid',$dataid);
                    console.log($dataid,window.localStorage.getItem('dataid',$dataid));
            });

            //删除id
            $('.tablelist').on('click','.iconfont',function(){
                    //移除
                    window.localStorage.removeItem('dataid');
                    
                    //写入
                    var $dataid = $(this).parent().attr('data-guid');
                    window.localStorage.setItem('dataid',$dataid);
                    console.log($dataid,window.localStorage.getItem('dataid',$dataid));

                    $.post(erp.baseUrl +'remove',{
                            option : 'myaddress',
                            dataid : $dataid
                        },function (response) {
                            //刷新页面
                            window.location.reload();
                        });
                    
            });

        });