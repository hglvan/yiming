$(function() {

    // 把尺寸放大N倍（N是window.devicePixelRatio）
    var wd = document.documentElement.clientWidth * window.devicePixelRatio / 10;
    //物理像素*设备像素比=真实像素
    document.getElementsByTagName("html")[0].style.fontSize = wd + "px";
    // 把屏幕的倍率缩小到N分之一（N是window.devicePixelRatio）
    var scale = 1 / window.devicePixelRatio;







    $.post(erp.baseUrl + 'getProducts', {
        goodsid: GetRequest()
    }, function(data) {
        // var oJson = JSON.parse(data);
        console.log(data)
        getJson(data[0]);

    })

    function GetRequest() {
        var url = location.search;
        if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strArr = str.split('=');
            var id = strArr[1]
            console.log(id);
        }
        return id;
    }

    function getJson(oJson) {
        var gid = GetRequest();
        console.log(gid)

        $('.swiper-slide img').attr('src', 'goodsimg/' + oJson.goodsimg + '.jpg');
        $('.pf').html(oJson.goodsprice);
        $('.goodsTittle').html(oJson.goodstitle);

    }


    // 设置详情页轮播图
    // var mySwiper = new Swiper('.swiper', {
    //     direction: 'horizontal',
    //     loop: true,
    //     autoplay:2000,
    //     // 如果需要分页器
    //     pagination: '.swiper-pagination',

    // })


    // 商品数量的增加与减少

    $('.minus').click(function() {
        var num = $('.num').val() - 0;
        num--;
        if (num < 0) {
            num = 0;
        }

        $('.num').val(num);

    })

    $('.add').click(function() {
        var num = $('.num').val() - 0;
        num++;

        $('.num').val(num);

    })


    $('.buy_buy').click(function(e){
        console.log(888)

        e.stopPropagation();
        $.get(erp.baseUrl + 'getsession', {

        }, function(data) {
            console.log(data.data)
            if (!data.data) {

                location.href = "../webapp/html/login_rem.html";
                return;
            }

        })

        $('.addcar').slideDown(300);
        $.post(erp.baseUrl + 'getmyoption', {
            option: 'mycart'
        }, function(response) {
            arr = response;
            var count = 0;
            if (arr.length > 0) {
                for (var ele of arr) {
                    if (ele.listid == GetRequest()) {
                        var str = ele.num - 0 + ($('.num').val() - 0);
                        var obj = {
                            num: str + '',
                            listid: GetRequest()
                        };
                        var resObj = JSON.stringify(obj);
                        $.post(erp.baseUrl + 'setmyoption', {
                            option: 'mycart',
                            value: resObj
                        }, function(response) {

                        })
                        break;
                    } else {
                        count++;
                    }
                }
                if (arr.length == count) {
                    var obj = {
                        img: $('.swiper-slide').children('img').attr('src'),
                        tittle: $('.goodsTittle').html(),
                        price: $('.pf').html(),
                        listid: GetRequest(),
                        num: $('.num').val()
                    };
                    //转字符串
                    var resObj = JSON.stringify(obj);
                    //var arr = ['myaddress','myorder','mycollection','mycart'];

                    $.post(erp.baseUrl + 'putmyoption', {
                        mycart: resObj
                    }, function(response) {

                    })
                }

            } else {
                var obj = {
                    img: $('.swiper-slide').children('img').attr('src'),
                    tittle: $('.goodsTittle').html(),
                    price: $('.pf').html(),
                    listid: GetRequest(),
                    num: $('.num').val()
                };
                //转字符串
                var resObj = JSON.stringify(obj);
                //var arr = ['myaddress','myorder','mycollection','mycart'];

                $.post(erp.baseUrl + 'putmyoption', {
                    mycart: resObj
                }, function(response) {

                })
            }
        })



    })




    // 加入购物车

    $('.buy_car').click(function(e) {
        e.stopPropagation();
        $.get(erp.baseUrl + 'getsession', {

        }, function(data) {
            console.log(data.data)
            if (!data.data) {

                location.href = "../webapp/html/login_rem.html";
                return;
            }

        })

        $('.addcar').slideDown(300);
        $.post(erp.baseUrl + 'getmyoption', {
            option: 'mycart'
        }, function(response) {
            arr = response;
            var count = 0;
            if (arr.length > 0) {
                for (var ele of arr) {
                    if (ele.listid == GetRequest()) {
                        var str = ele.num - 0 + ($('.num').val() - 0);
                        var obj = {
                            num: str + '',
                            listid: GetRequest()
                        };
                        var resObj = JSON.stringify(obj);
                        $.post(erp.baseUrl + 'setmyoption', {
                            option: 'mycart',
                            value: resObj
                        }, function(response) {

                        })
                        break;
                    } else {
                        count++;
                    }
                }
                if (arr.length == count) {
                    var obj = {
                        img: $('.swiper-slide').children('img').attr('src'),
                        tittle: $('.goodsTittle').html(),
                        price: $('.pf').html(),
                        listid: GetRequest(),
                        num: $('.num').val()
                    };
                    //转字符串
                    var resObj = JSON.stringify(obj);
                    //var arr = ['myaddress','myorder','mycollection','mycart'];

                    $.post(erp.baseUrl + 'putmyoption', {
                        mycart: resObj
                    }, function(response) {

                    })
                }

            } else {
                var obj = {
                    img: $('.swiper-slide').children('img').attr('src'),
                    tittle: $('.goodsTittle').html(),
                    price: $('.pf').html(),
                    listid: GetRequest(),
                    num: $('.num').val()
                };
                //转字符串
                var resObj = JSON.stringify(obj);
                //var arr = ['myaddress','myorder','mycollection','mycart'];

                $.post(erp.baseUrl + 'putmyoption', {
                    mycart: resObj
                }, function(response) {

                })
            }
        })
    })

    $('.off').click(function() {

        $('.addcar').slideUp(300);
        $('.collect').slideUp(300);
        $('.footer_left .sc,i').css('color', '#fff')

    })

    // $('body').on('click',function(){

    //      if( $('.addcar').css('display') == 'block'){

    //          $('.addcar').slideUp(300);
    //      }

    //      })


    // 收藏提示

    $('.sc').click(function(e) {
        e.stopPropagation();
        $('.collect').slideDown(300);
        $('.footer_left .sc,i').css('color', 'red')

    })

    $('.collectBtn').click(function(e) {
        e.stopPropagation();
        $('.collect').slideUp(300);
        $('.footer_left .sc,i').css('color', '#fff')

    })

    $('.goMycar').click(function() {

        location.href = "car.html";

        

    })

    $('.zx').click(function() {

        location.href = "../webapp/html/comment.html";

    })
    $('.pj').click(function() {

        location.href = "../webapp/html/question.html";

    })








})
