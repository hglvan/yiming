$(function () {
    $(".t_Record").width($(window).width()-320);
//当文档窗口发生改变时 触发
    $(window).resize(function(){
        $(".t_Record").width($(window).width()-320);
    });
    
    //时间设置
    function currentTime() {
        var d = new Date(), str = '';
        str += d.getFullYear() + '年';
        str += d.getMonth() + 1 + '月';
        str += d.getDate() + '日';
        str += d.getHours() + '时';
        str += d.getMinutes() + '分';
        return '你本次登陆时间为' + str;
    }
    setInterval(function () {
        $('.logintime').html(currentTime)
    }, 1000);
    
    //
})