var {mongoose} = require('./../server/db/mongoose.js');
var {ObjectID} = require('mongodb');
var {Todo} = require('./../server/models/todos.js');

var id = '5c08d4e13c4087590acf95aca';

if(ObjectID.isValid(id)){
	//FIND ARRAY OF ALL
	// Todo.find({
	// 	_id: id,
	// }).then((todos)=>{console.log({todos});} , (e)=>{console.log(e);});

	// //FIND ONE OBJ
	// Todo.findOne({
	// 	_id: id,
	// }).then((todo)=>{console.log(todo);} , (e)=>{console.log(e);});

	//FIND ONE BY ID
	Todo.findById(id).then((todo)=>{
		if(!todo){return console.log('ID NOT FOUND');}
		console.log(todo);} , (e)=>{console.log(e);});
}
else{console.log('INVALID ID');}