var db = require('../module/db.moudle.js');

var apiResult = require('../module/apiResult.module.js');

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

exports.Register = function(app){
    
    
    app.post('/login', urlencodedParser, function(request, response){
        db.exists('account', request.body,['username','password'], function(data){
            
            if(data.length > 0){
                request.session.name = request.body.username;
                response.send(apiResult(true));
                //console.log(request.session,request.body.name);
            } else {
                response.send(apiResult(false, '用户名错误'));
            }
        })
    });
    app.post('/getorders', urlencodedParser, function(request, response){
        var obj = {};
        obj.username = request.session.name;
        obj.cartlist = request.
        console.log(request.session.sessionID);
        response.send();
    })
    
    app.get('/getorderbyid', function(request, response){})
    
    app.get('/getorderbyname', function(request, response){})
    
    /* //设置跨域访问
     app.all('*', function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
     res.header("X-Powered-By",' 3.2.1')
     res.header("Content-Type", "application/json;charset=utf-8");
     next();
     });*/
}
