var mongodb = require('mongodb');

var server = new mongodb.Server('10.3.133.44', 27017);

var db = new mongodb.Db('yiming', server);

var search = function(_collection, reg, callback){
	db.open(function (error,db) {
		if(error){
			console.log('connect db:',error);
		}
		db.collection(_collection,function (error,collection) {
			if(error){
				console.log(error);
			}
			collection.find({"goodstitle":{$regex:reg}}).toArray(function (err,docs) {
				if(err){
					console.log(err);
				}
				callback(docs);
				db.close();
            })
        })
		
    })
}


var exists = function(_collection, data, arr, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		var obj = {};
		arr.forEach(function (ele) {
			if(data[ele]){
                obj[ele] = data[ele];
			}
        });
		
        db.collection(_collection, function(error, collection){
            if(error){
                console.log(error)
            } else {
            	console.log('obj:',obj);
                collection.find(obj).toArray(function(err, docs){
                	if(err){
                		console.log(err);
					}
                    callback(docs);
                    db.close();
                });
            }
        });
	})
};

var save = function(_collection, data, callback){
	db.open(function(error, db){
		if(error){
			console.log('connect db:', error);
		}
		//Account => 集合名（表名）
		db.collection(_collection, function(error, collection){
			if(error){
				console.log(error)	
			}
			collection.find({username : data.username}).toArray(function (err,docs) {
				if(err){
					console.log('findErr:',err);
				}
				if(docs.length <= 0){
                    collection.insert(data,function (err,res) {
                        if(err){
                            console.log('insert.err:',err);
                        }
						callback(true);
                        db.close();
                    });
                    
				}else{
					callback(false);
                    db.close();
				}
            })
		})
	})
};


var setdate = function (_collection, data, arr) {
    var mongodb = require('mongodb');
    
    var server = new mongodb.Server('10.3.133.44', 27017);
    
    var db = new mongodb.Db('yiming', server);
    
	db.open(function (err,db) {
		if(err){
			console.log('db.open:',err);
		}
		db.collection(_collection,function (err,collection) {
			if(err){
				console.log(err);
			}
			collection.update(arr,{$set:data},true,true);
			db.close();
        })
		
    })
}

var pushdate = function (_collection, data, arr) {
    
    db.open(function (err,db) {
        if(err){
            console.log('db.open:',err);
        }
        db.collection(_collection,function (err,collection) {
            if(err){
                console.log(err);
            }
            console.log(data);
            for(var ele in data){
            	var obj = {};
            	obj[ele] = data[ele];
            	collection.update(arr,{$push:obj},true,true);
            }
            
            db.close();
        })
        
    })
}

var remove = function (_collection, arr) {
	db.open(function (err,db) {
		if(err){
			console.log(err);
		}
		db.collection(_collection,function (err,collection) {
			if(err){
				console.log(err);
			}
			collection.remove(arr);
			db.close();
        })
    })
}
exports.exists = exists;
exports.save = save;
exports.setdate = setdate;
exports.pushdate = pushdate;
exports.remove = remove;
exports.search = search;