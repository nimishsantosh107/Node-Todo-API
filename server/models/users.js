const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
		return _.pick(userObject , ['_id','email']);},
	removeToken: function (token) {
		let user = this;
		return user.updateOne({
			$pull: {
				tokens: {
					token: token,
				}
			}
		}); }
}

userSchema.statics = {
	findByToken: function (token) {
		let User = this;
		let decoded;
		try {
			decoded = jwt.verify(token , secret);
		} catch(e) {
			// return new Promise((resolve,reject)=>{
			// 	reject();
			// });
			return Promise.reject();   //same as above  //JUMP TO CATCH
		}

		return User.findOne({       //returns findOne promise
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth',	
		});},
	findByCredentials: function (email , password) {
		let User = this;
		return User.findOne({email}).then((user)=>{
			if(!user){return Promise.reject();}
			return new Promise((resolve , reject)=>{
				bcrypt.compare(password , user.password , (err , res)=>{
					if(res){resolve(user);}
					else{reject(err);}
				});
			});
		})}
}

userSchema.pre('save' , function (next) {
	user = this;
	if(user.isModified('password')){
		bcrypt.genSalt(10 , (err , salt)=>{
			bcrypt.hash(user.password , salt , (err , hash)=>{
				user.password = hash;
				next();
			});
		});
	}else{next();}
});

const User = mongoose.model('users' , userSchema);

module.exports = {User,}