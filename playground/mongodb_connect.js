// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err,client)=>{
	if(err){return console.log("Unable to connect to MongoDB server");}
	console.log('Connected to MongoDB server');

	const db = client.db('TodoApp');

	//TODOS ITEM
	db.collection('Todos').insertOne({
		text: "Eat food",
		completed: false,
	},function (err,result) {
		if(err){return console.log(err);}
		console.log(result.ops);
	});	

	//USER ITEM
	// db.collection('Users').insertOne({
	// 	name: 'Nothing',
	// 	age: '18',
	// 	location: 'India',
	// },function (err,result) {
	// 	if(err){return console.log(err);}
	// 	console.log(result.ops);
	// });

	client .close();
});