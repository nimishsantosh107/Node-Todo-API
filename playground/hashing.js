const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = 'password';

// bcrypt.genSalt(5 , (err,salt)=>{
// 	bcrypt.hash(password , salt , (err , hash)=>{
// 		console.log(hash);
// 	});
// });

let hashedPassword = '$2a$10$h3MjlH2ic.8Vt7wlJXD97unBuNuFJS2p62p1y3q2IMDQZSuwYgska';
bcrypt.compare(password , hashedPassword , (err,res)=>{
	console.log(res);
});





//JWT 
// var data = {
// 	id: 10,
// };

// let token = jwt.sign(data , 'secret');
// console.log(token);

// let decoded = jwt.verify(token , 'secret');
// console.log(decoded);

 
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