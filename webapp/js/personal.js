$(function() {
    $('footer').load('./footer.html', function() {
        $('footer ul li:nth-child(1)').on('click', function() {
            window.location.href = '../index.html';
        })

        $('footer ul li:nth-child(2)').on('click', function() {
            window.location.href='./classify.html';
        })

        $('footer ul li:nth-child(3)').on('click', function() {
            window.location.href = '../car.html'
        })

        $('footer ul li:nth-child(4)').on('click', function() {
            window.location.href = './personal_rem.html';
        })


    });

    $('.dd').click(function() {

        location.href = './orders.html';

    })


    $('.record').on('click', 'li', function() {
        console.log($(this).find('a').attr('href'));
        window.location.href = $(this).find('a').attr('href');
    });

    $('.box').on('click', function() {
        console.log($(this).find('a').attr('href'));
        window.location.href = $(this).find('a').attr('href');
    })


    //获取昵称等信息
    var nickname = '';
    nickname = window.sessionStorage.getItem('username');
    if (nickname) {
       $.post(erp.baseUrl +'getmyoption',{
                option : 'nickname'
            },function (response) {
                console.log('personal:' + response);
                if (/^\S+$/.test(response)) {
                    $('#personName').text('欢迎，' + response);
                }else{
                    $('#personName').text('欢迎，' + nickname);
                }
            }) 
    }
    


    $('.loginOut').on('click','#login_Out',function(){
        window.sessionStorage.removeItem('username');
    })
})