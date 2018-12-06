var {mongoose} = require('./../server/db/mongoose.js');
var {ObjectID} = require('mongodb');
var {Todo} = require('./../server/models/todos.js');

var id = '5c090feeab93255d7d2b5c2fd';

//TO REMOVE ALL
Todo.deleteMany({}).then((result)=>{console.log(result.n);},(err)=>{console.log(err);})

//TO REMOVE ONE
// if(ObjectID.isValid(id)){
// 	Todo.deleteOne({_id:ObjectID(id)}).then((result)=>{console.log(result);},(err)=>{console.log(err);})
// }
// else{console.log('INVALID ID');}