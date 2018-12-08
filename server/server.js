const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//MODELS IMPORTED
const {Todo} = require('./models/todos.js');
const {User} = require('./models/users.js');
//MIDDLEWARE IMPORTED
const {authenticate} = require('./middleware/authenticate.js');
//INITIALISED DB IMPORTED
const {mongoose} = require('./db/mongoose.js');

var app = express();
app.use(bodyParser.json());

/***ROUTES***/
/***USERS***/
//CREATE USER
//generates unique token
app.post('/users' ,(req,res)=>{
	console.log('\tCREATING USER\n\t-------------');
	var reqUser =_.pick(req.body , ['email' , 'password']);
	var newUser = new User(reqUser);
	newUser.save().then(()=>{
		return newUser.generateAuthToken() //returns PROMISE and promise success returns TOKEN -- JUMP TO LINE 27 (THEN)
	},(err)=>{
		console.log(err);
		console.log(`\n------------------------------------------------\n`);
		res.status(400).send(err);
	}).then((token)=>{
		console.log(newUser);
		//MODIFIED NEW USER CAN BE PRINTED INSIDE PROMISE INSIDE GENERATE AUTH TOKEN METHOD
		//newUser === modified user
		console.log(`\n------------------------------------------------\n`);
		res.header('x-auth' , token).send(newUser);  //sent with toJSON called on it
	});});
//AUTHENTICATE USER
//verifies token
app.get('/users/me' ,authenticate ,(req,res)=>{
	//uses middleware(authenticate)
	//MIDDLEWARE PRINTS
	res.send(req.user);});
// //GET ALL
app.get('/users' , (req,res)=>{
	console.log('\tGET USER PROCESS\n\t----------------');
	User.find().then((users)=>{
		console.log(users);
		console.log('\n------------------------------------------------\n');
		res.send({users});
	},(err)=>{
		console.log(err);
		console.log('\n------------------------------------------------\n');
		res.status(400).send(err);});});
//LOGIN WITH {email , password}
app.post('/users/login' , (req,res)=>{
	console.log("\tLOGIN PROCESS\n\t--------------");
	let body = _.pick(req.body , ['email' , 'password']);
	User.findByCredentials(body.email,body.password).then((user)=>{
		console.log(user);
		console.log(`\n------------------------------------------------\n`)
		return user.generateAuthToken().then((token)=>{
			res.header('x-auth' , token).send(user)
		});
	}).catch((e)=>{
		console.log(e);
		console.log(`\n------------------------------------------------\n`)
		res.status(400).send(e);
	});});

/***TODOS***/
//POST
app.post('/todos' , (req,res)=>{
	console.log("\tPOST PROCESS\n\t------------");
	var newTodo = new Todo({
		text: req.body.text,
	});
	newTodo.save().then((doc)=>{
		console.log(doc);
		console.log(`\n------------------------------------------------\n`)
		res.send(doc);
	},(err)=>{
		console.log(err);
		console.log(`\n------------------------------------------------\n`)
		res.status(400).send(err);
	});});
//GET ALL
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
	});});
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
	}});
//DELETE ALL
app.delete('/todos' , (req,res)=>{
	console.log('\tDELETE_ALL PROCESS\n\t------------------')
	Todo.deleteMany({}).then((result)=>{
		console.log(result);
		console.log('\n------------------------------------------------\n');
		res.send(result);
	},(err)=>{
		console.log(err);
		console.log('\n------------------------------------------------\n');
		res.status(400).send(err);
	});});
//DELETE BY ID
app.delete('/todos/:id' , (req,res)=>{
	console.log('\tDELETE_ONE PROCESS\n\t------------------');
	var id = req.params.id;
	if(ObjectID.isValid(id)){
		Todo.deleteOne({_id: ObjectID(id)}).then((result)=>{
			if(result.n===0){
				console.log('NOT PRESENT   ',id);
				console.log('\n------------------------------------------------\n');
				res.status(400).send(id);
				return
			}
			console.log(result);
			console.log('\n------------------------------------------------\n');
			res.send(result);
		} ,(e)=>{
			console.log(err);
			console.log('\n------------------------------------------------\n');
			res.status(400).send(err);
		});
	}else{
		console.log('INVALID ID  ',id);
		console.log('\n------------------------------------------------\n');
		res.status(404).send(id);
	}});
//UPDATE BY ID
app.patch('/todos/:id' , (req,res)=>{
	console.log('\tUPDATE PROCESS\n\t------------\n');
	var param_id = req.params.id;
	var id = ObjectID(param_id);
	var body = _.pick(req.body , ['text' , 'completed']);
	if(ObjectID.isValid(id)){
		if(_.isBoolean(body.completed) && body.completed){
			body.completedAt = new Date().getTime();
		}else{
			body.completed = false;
			body.completedAt = null;
		}
		Todo.findOneAndUpdate({_id:id} , {$set: body} , {new: true}).then((doc)=>{
			console.log(doc);
			console.log(`\n------------------------------------------------\n`)
			res.send(doc);
		},(e)=>{
			console.log(err);
			console.log('\n------------------------------------------------\n');
			res.status(400).send(err);
		});
	}else{
		console.log('INVALID ID  ',id);
		console.log('\n------------------------------------------------\n');
		res.status(404).send(id)
	}});


//SERVER START
app.listen(3000 , ()=>{
	console.log('\nSERVER IS UP ON PORT 3000\n------------------------------------------------')});

//EXPORTS
module.exports={app,}