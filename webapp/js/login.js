$(function () {
    // 表单验证-----------------
    $('#input-phone').blur(function(){
        var $phone = $('#input-phone').val();
        if(!/^1[34578]\d{9}$/.test($phone)){
            $('#input-phone').parent().siblings('.sm_box').text('手机号不合法').show(600);
            $('#input-phone').val('');
            setTimeout(function(){
                    $('#input-phone').parent().siblings('.sm_box').hide(600);
                },1000);
            return false;
        }
    });


    /*密码  
        长度大于6个字符，小于12 
        不能包含空格*/
    $('#input-password').blur(function(){
        var $password = $('#input-password').val();
        if(!/^\S{6,12}$/.test($password)){
            $('#input-password').parent().siblings('.sm_box').text('请输入6-20个字符').show(600);
            $('#input-password').val('');
            setTimeout(function(){
                    $('#input-password').parent().siblings('.sm_box').hide(600);
                },1000);
            return false;
        }
    });

    //点击登录按钮-------------------
    $('#logBtn').click(function () {
        if ($('#input-phone').val()==false || $('#input-password').val()==false) {
                //弹窗----------------
                $('.tips').show(600);
                $('.success').hide();
                $('.fail').hide();
                $('.empty').show(600);
                setTimeout(function(){
                    $('.empty').hide(600);
                },1500);
        }else{
                $.post(erp.baseUrl +'login',{
                username : $('#input-phone').val(),
                password : $('#input-password').val()
            },function (response) {
                var data = response;
                if(data.status){
                    // alert('登录成功');
                    //弹窗----------------
                    $('.tips').show(600);
                    $('.empty').hide();
                    $('.fail').hide();
                    $('.success').show(600);
                    setTimeout(function(){
                        $('.success').hide(600);
                    },1500);

                    location.href = "../index.html";


                }else{
                    // alert('登录失败，用户名或密码错误');
                    // console.log(data)
                    //用户名标红----------------------
                    $('#input-phone').addClass('active');

                    //弹窗----------------
                    $('.tips').show(600);
                    $('.empty').hide();
                    $('.success').hide();
                    $('.fail').show(600);
                    setTimeout(function(){
                        $('.fail').hide(600);
                    },1500);

                }
            });

                //保存用户名信息
            window.sessionStorage.setItem('username',$('#input-phone').val());
        }
    });

    //找回密码弹窗显示
    var $username = '';//输入框的值初始化
    $('.col-btn').on('click','.getPwd',function(e){
        if ($('#name_get').val()) {
            $username = $('#name_get').val();
        }else{
            $username = $('#input-phone').val();
            $('#name_get').val($username);
        }
        //显示提示框
        e.preventDefault();
        e.stopPropagation();
        $('#pwdBox').slideDown(600);
    });

    //输入框的值
    $('#name_get').blur(function(){
        if ($('#name_get').val()) {
            $username = $('#name_get').val();
        }else{
            $username = $('#input-phone').val();
            $('#name_get').val($username);
        }

        //验证
        if(!/^1[34578]\d{9}$/.test($username)){
            $('#name_get').val('');
            $('#pwd_get').text('你好，账户不存在！');
            return false;
        }


    })


    //找回密码
    $(document).on('click','#confirm',function(){

        if(!/^1[34578]\d{9}$/.test($username)){
            $('#name_get').val('');
            $('#pwd_get').text('你好，账户不存在！');
            return false;
        }else{
            $.post(erp.baseUrl +'login',{
                username : $username
            },function (response) {
                var data = response;
                if (data.status) {
                    var arr = response.data[0].password;
                console.log(arr);


                    $('#pwd_get').text(arr + '.已找回，直接登录试试！');
                    //输出密码
                    $('#input-password').val(arr);
                    $('#input-phone').val($username);
                }else{
                    $('#name_get').val('');
                    $('#pwd_get').text('你好，账户不存在！');
                }
                
            });
        }
    });
        

    //弹窗消失
    $(document).on('click','#icon-cuo',function(){
        $('#pwdBox').slideUp(600);
    });


    //绑定点击事件：点击时清空输入框
    $('.item-input').on('click','>a',function(){
        $(this).siblings().val('');
    });


    //获取光标时，显示icon
    $('input').focus(function(e){
        e.preventDefault();
        $(this).siblings('.iconfont').show();
    });

    $('input').blur(function(e){
        e.preventDefault();
        if (!$(this).val()) {
            $(this).siblings('.iconfont').hide();
        }
    });

});