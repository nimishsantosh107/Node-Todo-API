var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {ObjectID} = require('mongodb');
var {Todo} = require('./models/todos.js');
var {User} = require('./models/users.js');

var app = express();
app.use(bodyParser.json());


//APIS
//POST
app.post('/todos' , (req,res)=>{
	var newTodo = new Todo({
		text: req.body.text,
	});
	console.log("\tPOST PROCESS\n\t------------");
	newTodo.save().then((doc)=>{
		console.log(doc);
		console.log(`\n------------------------------------------------\n`)
		res.send(doc);
	},(err)=>{
		console.log(err);
		console.log(`\n------------------------------------------------\n`)
		res.status(400).send(err);
	});
});

//GET
app.get('/todos' , (req,res)=>{
	console.log('\tGET PROCESS\n\t-----------');
	Todo.find().then((todos)=>{
		console.log(todos);
		console.log('\n------------------------------------------------\n');
		res.send({todos});
	},(err)=>{
		console.log(err);
		console.log('\n------------------------------------------------\n');
		res.status(400).send(err);
	})
});

//GET BY ID
app.get('/todos/:id' , (req,res)=>{
	console.log('\tGET_ONE PROCESS\n\t---------------');
	var id = req.params.id;
	if(ObjectID.isValid(id)){
		Todo.findById(id).then((todo)=>{
			if(todo===null){
				console.log('NOT PRESENT   ',id);
				console.log('\n------------------------------------------------\n');
				res.status(400).send(id);
				return
			}
			console.log(todo);
			console.log('\n------------------------------------------------\n');
			res.send(todo);
		} ,(e)=>{
			console.log(err);
			console.log('\n------------------------------------------------\n');
			res.status(400).send(err);
		})
	}else{
		console.log('INVALID ID  ',id);
		console.log('\n------------------------------------------------\n');
		res.status(404).send(id);
	}
});


//SERVER START
app.listen(3000 , ()=>{console.log('\nSERVER IS UP ON PORT 3000\n------------------------------------------------')});

//EXPORTS
module.exports={app,}