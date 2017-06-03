var express = require('express');
var app = express();
var path = require('path');
var db = require('./test');

//node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// app.get('/register.html', function(request, response){
// 	response.sendFile(__dirname + '/' + 'register.html');
// })

app.get('/goods', function(request, response){
	// db.exists引用db那边抛过来的函数
	// if(db.exists(request.body, 'name')){
	// 	console.log('exists');
	// } else {
	// 	console.log('new data');
	// }

	 db.goods(goodsid,response);


	// response.send(res);
})

app.use(express.static(path.join(path.resolve(__dirname, '../'),'/')));

app.listen(888)