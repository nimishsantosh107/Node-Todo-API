// const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{useNewUrlParser: true},(err,client)=>{
	if(err){return console.log("Unable to connect to MongoDB server\n");}
	console.log('Connected to MongoDB server\n');

	const db = client.db('TodoApp');

	//LISTING ALL
	let cursor = db.collection('Todos').find();
	cursor.toArray().then((documents)=>{console.log(documents);},(err)=>{console.log(err);})

	//FILTER LISTING
	// let cursor = db.collection('Users').find({name: 'Nimish'});
	// cursor.toArray().then((documents)=>{console.log(documents);},(err)=>{console.log(err);})
	
	//COUNT
	cursor.count().then((count)=>{console.log(`\nDOC COUNT:  ${count}\n`);},(err)=>{console.log(err);})

	//FILTERING MANUALLY
	// let cursor = db.collection('Todos').find();
	// cursor.toArray().then((documents)=>{
	// 	let fildocs = documents.filter(function (item) {
	// 		return !item.completed;});
	// 	console.log(fildocs);},
	// 	(err)=>{console.log(err);});

	client .close();
});