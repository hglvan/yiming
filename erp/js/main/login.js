$(function () {
    $('#login_btn').on('click', function(){
        var username = $('input[name=username]').val();
        var password = $('input[name=password]').val();
        
        if(username == ''){
            layer.alert("登录名不能为空！\r\n",{
                title: '提示框',
                icon:0
            });
            return false;
        }
        $.post(erp.baseUrl +  'user/login', {
            username: $.trim(username),
            password: $.trim(password)
        }, function(response){
            if(response.status){
                layer.alert('登陆成功！',{
                    title: '提示框',
                    icon:1
                });
                setTimeout(function () {
                    window.location.href = "index.html";
                },1000)
            } else {
                layer.alert('登录失败，用户名或密码错误！',{
                    title: '提示框',
                    icon:0
                });
            }
        })
        
    })
})