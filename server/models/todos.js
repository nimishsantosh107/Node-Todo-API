var mongoose = require('mongoose');

const Todo = mongoose.model('todos' , {
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
	completedAt: {
		type: Number,
		default: null,
	},
});

module.exports = {Todo,}