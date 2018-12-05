// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err,client)=>{
	if(err){return console.log("Unable to connect to MongoDB server\n");}
	console.log('Connected to MongoDB server\n');

	const db = client.db('TodoApp');

	//delete MANY
	//db.collection('Todos').deleteMany({text: 'Eat food'}).then((result)=>{console.log(result);},(err)=>{console.log(err);});

	//delete ONE
	//db.collection('Todos').deleteOne({text: 'Eat food'}).then((result)=>{console.log(result);},(err)=>{console.log(err);});

	//POP
	db.collection('Todos').findOneAndDelete({text: 'Eat food'}).then((result)=>{console.log(result);},(err)=>{console.log(err);});

	client .close();
});