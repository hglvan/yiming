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
    $('#input-email').blur(function(){
        var $email = $('#input-email').val();
        if(!/^[\w\-\.]+@[a-z\d\-]+(\.[a-z]+){1,2}$/.test($email)){
            $('#input-email').parent().siblings('.sm_box').text('你输入的邮箱不合法').show(600);
            $('#input-email').val('');
            setTimeout(function(){
                    $('#input-email').parent().siblings('.sm_box').hide(600);
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


    //点击注册按钮------------------
    $('#resBtn').click(function () {
        if ($('#input-phone').val()==false || $('#input-password').val()==false || $('#input-email').val()==false || $('#input-verify').val()==false) {
                //弹窗----------------
                $('.tips').show(600);
                $('.success').hide();
                $('.fail').hide();
                $('.empty').show(600);
                setTimeout(function(){
                    $('.empty').hide(600);
                },1500);

        }else{
            $.post(erp.baseUrl +'register',{
            username : $('#input-phone').val(),
            password : $('#input-password').val(),
            email : $('#input-email').val()
            },function (response) {
                var data = response;
                if(data.status){
                    // alert('注册成功');
                    //弹窗----------------
                    $('.tips').show(600);
                    $('.empty').hide();
                    $('.fail').hide();
                    $('.success').show(600);
                    setTimeout(function(){
                        $('.success').hide(600);
                    },1500);

                    location.href = "../html/login_rem.html";

                }else{
                    // alert('注册失败,用户已存在');
                    //用户名标红,并置空验证码----------
                    $('#input-phone').addClass('active');
                    $('#input-verify').val('');

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
        }
        
    })



    //绑定点击事件：点击时清空输入框
    $('.item-input').on('click','>a',function(){
        $(this).siblings().val('');
    });

    //设置验证码
    $('#img_validate').on('click',function(){
        var res = parseInt(Math.random()*(99999-10000+1)) + 10000;
        $('#input-verify').val(res);
        $('#img_validate').text(res);
    });


    /*验证码提示*/
    $('#input-verify').blur(function(){
        var $verify = Number($('#input-verify').val());
        var $imgval = Number($('#img_validate').text());
        // console.log($verify,typeof($verify))
        if($verify != $imgval){
            $('#input-verify').parent().siblings('.sm_box').text('输入正确的验证码').show(600);
            $('#input-verify').val('');
            setTimeout(function(){
                    $('#input-verify').parent().siblings('.sm_box').hide(600);
                },1000);
            return false;
        }
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