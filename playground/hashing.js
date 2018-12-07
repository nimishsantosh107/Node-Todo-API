const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
	id: 10,
};

let token = jwt.sign(data , 'secret');
console.log(token);

let decoded = jwt.verify(token , 'secret');
console.log(decoded);

 
//CONCEPT

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
// console.log(hash);

// var data = {
// 	id: 4,
// };				//data to send back to client from server during login

// var token ={
// 	data,
// 	hash: SHA256(JSON.stringify(data)+'somesecret').toString(),     //above data sent in the form of a token (salted to prevent cheating)
// }

// token.data.id = 5;

// //checking if data recieved is equal to the data present
// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString()

// if(resultHash===token.hash){
// 	console.log('good');
// }else{console.log('bad');}
//CONCEPT END