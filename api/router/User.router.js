var db = require('../module/db.moudle.js');

var apiResult = require('../module/apiResult.module.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

//如果要使用cookie，需要显式包含这个模块
var cookieParser = require('cookie-parser');
//如果要使用session，需要单独包含这个模块
var session = require('express-session');

exports.Register = function(app){
    
    //设置 session
    app.use(cookieParser());
    app.use(session({
        secret: '12345',//用来对session数据进行加密的字符串.这个属性值为必须指定的属性
        name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
        cookie: {maxAge: 60*60*1000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
        resave: false,
        saveUninitialized: true
    }));
    
    
    app.post('/user/login', urlencodedParser, function(request, response){
        db.exists('user', request.body,['username','password'], function(data){
            
            if(data.length > 0){
                request.session.name = request.body.username;
                response.send(apiResult(true))
            } else {
                response.send(apiResult(false, '用户名错误'));
            }
        })
    });
    
    app.post('/user/register', urlencodedParser, function(request, response){
        //console.log(request.body);
        db.save('account',request.body,function (res) {
            response.send(apiResult(res));
        });
        
    });
    
    app.get('/user/getproducts', function(request, response){
    
    });
    
    app.get('/user/getproductbyid', function(request, response){});
    
    app.get('/user/getproductbyname', function(request, response){});
}
