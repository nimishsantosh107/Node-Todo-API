const {User} = require('./../models/users.js');

const authenticate = function (req,res,next) {
	console.log("\tAUTHENTICATE PROCESS\n\t------------------");
	let token = req.header('x-auth');
	User.findByToken(token).then((user)=>{
		if(!user){
			return Promise.reject();    //JUMP T0 CATCH
		}
		console.log(user);
		console.log('\n------------------------------------------------\n');
		req.user = user;
		req.token = token;
		next();
	}).catch((e)=>{
		console.log(e);
		console.log('\n------------------------------------------------\n');
		res.status(401).send(e);
	});
}
module.exports = {
	authenticate,
}