// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/yiming'; 
// var selectData = function(db, callback) {    
// //连接到表   
// var collection = db.collection('goodslist');  
//  //查询数据  
//  var whereStr = {"name":'wilson001'};  
//  collection.find().toArray(function(err, result) {    
//  	if(err){

//  	 console.log('Error:'+ err);      
//  	 return;    
//  }        

//  callback(result);  

// });

// }

//  MongoClient.connect(DB_CONN_STR, function(err, db) {  
//  	console.log("连接成功！"); 
//  	 selectData(db, function(result) { 

//  	  console.log(result); 


//  	   db.close(); 

//  	   });

//  	});