// const MongoClient = require('mongodb').MongoClient;
const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err,client)=>{
	if(err){return console.log("Unable to connect to MongoDB server\n");}
	console.log('Connected to MongoDB server\n');

	const db = client.db('TodoApp');

	db.collection('Todos').findOneAndUpdate({
		_id: new ObjectID('5c0805b4e4b96f4eb2048e5c'),
	},{
		$set:{
			completed: false,
		}
	},{
		returnOriginal: false,
	}).then((result)=>{console.log(result);},(err)=>{console.log(err);});

	client .close();
});