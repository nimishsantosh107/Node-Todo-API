const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const secret = 'secret1';

const userSchema = new mongoose.Schema({
	email:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message:'{VALUE} is not a valid email'
		}, 
	},
	password:{
		type: String,
		required: true,
		minlength: 4,
	},
	tokens:[{
		access: {
			type: String,
			required: true,
		},
		token: {
			type: String,
			required: true,
		}
	}]
});

userSchema.methods = {
	generateAuthToken: function () {
		let user = this;
		let access = 'auth';
		let token = jwt.sign(
			{
				_id: user._id.toHexString(),
				access,
			},secret).toString();
		user.tokens.push({access,token});
		
		return user.save().then(()=>{        //returns promise
			//console.log(user);
			return token;  					 //returns token to succuess of promise
		},()=>{})},
	toJSON: function(){										//OVERRIDING DEFAULT toJSON METHOD WHICH IS BEING USED
		let user = this;									//used when mongoose sends back data from DB after converting to JSON
		let userObject = user.toObject()					//Can be used to hide data from DB being sent to user
		return _.pick(userObject , ['_id','email']);}
}

const User = mongoose.model('users' , userSchema);

module.exports = {User,}