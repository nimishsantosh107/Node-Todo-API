var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todos.js');
var {User} = require('./models/users.js');

var app = express();
app.use(bodyParser.json());

app.post('/todos' , (req,res)=>{
	var newTodo = new Todo({
		text: req.body.text,
	});
	newTodo.save().then((doc)=>{
		console.log(doc);
		console.log(`\n\n`)
		res.send(doc);
	},(err)=>{
		console.log(err);
		console.log(`\n\n`)
		res.status(400).send(err);
	});
});

app.get('/todos')

app.listen(3000 , ()=>{console.log('\nSERVER IS UP ON PORT 3000\n')});






// var newTodo = new Todo({
// 	text: "helloooo",
// });

// newTodo.save().then(function (doc) {
// 	console.log(doc);
// } , function (err) {
// 	console.log(err);
// });
