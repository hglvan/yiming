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

	//登录api
    app.post('/login', urlencodedParser, function(request, response){
    /*  if(request.body.username && request.body.password){*/
            db.exists('account', request.body,['username','password'], function(data){
                
                if(data.length > 0){
                    request.session.name = request.body.username;
                    response.send(apiResult(true,'',data));
                    //console.log(request.session,request.body.name);
                } else {
                    response.send(apiResult(false, '用户名错误'));
                }

            })

        /*}else{
            response.send(apiResult(false, '请输入用户名'));
        }*/
        
    });
 
	//注册api
	app.post('/register', urlencodedParser, function(request, response){
		//console.log(request.body);
		var data = request.body;
		var obj = {
			username : data.username,
			password : data.password || '',
			myorder : [],
			myaddress : [],
			mycollection : [],
			mycart : [],
            nickname : data.nickname || '',
            phone : data.phone ||'',
            email : data.email,
            qq : data.qq ||'',
            gender : data.gender || '',
            place : data.place || '',
            realname : data.realname || ''
		};
		db.save('account',obj,function (res) {
			response.send(apiResult(res));
        });
		
	});
	
    app.post('/putmsg',urlencodedParser,function(request,response){
        var data = request.body;
        var keyName = {};
        keyName.username = request.session.name;
        if(keyName.username){
            db.setdate('account',data,keyName)
            response.send(true);
        }else{
            response.send(false);
        }
        
    })
    
    app.post('/changemsg',urlencodedParser,function(request,response){
        var data = request.body;
        var keyName = {};
        keyName.accountid = data.accountid;
        
        db.setdate('account',data,keyName)
        response.send(true);
        
    })
    
    app.post('/accountremove',urlencodedParser,function(request,response){
        var data = request.body;
        
        db.remove('account',data)
        response.send(true);
        
    })
    
    
	//获取选项
	app.post('/getmyoption', urlencodedParser, function (request,response) {
		
		var option = request.body.option;
		
		var keyName = {};
		keyName.username = request.session.name;
        
        db.exists('account', keyName,['username','password'], function(data){
            if(data.length > 0){
            	var arr = data[0][option];
                console.log(arr)
                
                response.send(arr);
                
            } else {
                response.send(apiResult(false, '用户名错误'));
            }
        })
		
    });
    
	//增加选项
    app.post('/putmyoption', urlencodedParser, function (request,response) {
        
        var data = request.body;
        var obj = {};
        
        for(var key in data){
        	//判断是否JSON格式
			var isjson = false;
            try{
                eval('(' + data[key] + ')');
                isjson = true;
            }
            catch(e){
                isjson = false;
            }
            //获取值 ..........
        	obj[key] = isjson? JSON.parse(data[key]) : data[key];
    
            //增加识别字段
            console.log(obj[key].dataid)
            obj[key].dataid = Date.now();
		}
		
        var keyName = {};
        keyName.username = request.session.name;
        
        
        if(keyName.username){
            console.log(keyName,obj);
            db.pushdate('account',obj,keyName);
            response.send(apiResult(true));
        }else{
            response.send(apiResult(false));
        }
        
    });
    
    //修改选项
    app.post('/setmyoption', urlencodedParser, function (request,response) {
        var keyName = {};
        keyName.username = request.session.name;
        
        //default 对象
        var def = {
            option : '',
            value : '',
            dataid : ''
        };
        //获取request.body
        def = Object.assign(def,request.body);
        console.log('def:',def);
        
        if(typeof(JSON.parse(def.value)) == 'object'){
            def.value = JSON.parse(def.value);
        }
        if(request.session.name){
            db.exists('account', keyName,['username'], function(data){
                if(data.length > 0){
                    var arr = data[0][def.option];
                    
                    //判断获取的arr是否Array;
                    if(arr instanceof Array){
                        for(var ele of arr){
                            console.log('666:',ele.listid,def.value.listid);
                            if(ele.dataid == def.dataid || ele.listid == def.value.listid){
                                for(var key in def.value){
                                    ele[key] = def.value[key];
                                }
                                break;
                            }
                        }
                    }else{
                        arr = def.value;
                    }
                    
                    var obj = {};
                    obj[def.option] = arr;
                    
                    db.setdate('account',obj,keyName);
                    
                    response.send(true);
                } else {
                    response.send(apiResult(false, '找不到数据'));
                }
            })
        }else{
            response.send(apiResult(false, '用户未登录'))
        }
        
    });
    
    //删除选项
    app.post('/remove', urlencodedParser,function (request,response) {
        var keyName = {};
        keyName.username = request.session.name;
        
        //default 对象
        var def = {
            option : '',
            dataid : ''
        };
        //获取request.body
        def = Object.assign(def,request.body);
        
        if(request.session.name){
            db.exists('account', keyName,['username','password'], function(data){
                if(data.length > 0){
                    var arr = data[0][def.option];
                    
                    //判断获取的arr是否Array;
                    if(arr instanceof Array){
                        arr.forEach(function (ele,idx) {
                            if(ele.dataid == def.dataid){
                                arr.splice(idx,1);
                            }
                        })
                    }else{
                        arr = '';
                    }
                    var obj = {};
                    obj[def.option] = arr;
                    db.setdate('account',obj,keyName);
                    response.send(true);
                } else {
                    response.send(apiResult(false, '找不到数据'));
                }
            })
        }else{
            response.send(apiResult(false, '用户未登录'));
        }
        
        
        
    })
	
	app.get('/logout', function(request, response){
        request.session.name = null;
        request.session.cookie = {maxAge: 0};
        response.send(true);
	});
    
	app.get('/getsession', function(request, response){
		response.send(apiResult(request.session.name != null, null, request.session.name));
	});
	
}
