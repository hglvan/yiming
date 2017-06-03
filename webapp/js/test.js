var mongodb = require('mongodb');

var server = new mongodb.Server('localhost', 27017);

var db = new mongodb.Db('yiming', server);

var goods = function(data,res){
	//data = {name:'', pa}
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection('goodslist', function(error, collection){
			if(error){
				console.log(error)	
			} else {
				// var result = collection.find({key: data[key]}).pretty();
				
			collection.find().toArray(function(err,docs){

				res.send(docs)
				// console.log(docs);
				db.close();

			})

			}
			
		
		})


	})	
}

exports.goods = goods;