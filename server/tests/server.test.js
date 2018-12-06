const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');
const {app} = require('./../server.js');
const {Todo} = require('./../models/todos.js');

const todos = [
	{	
		_id: new ObjectID(),
		text: 'first test',
	},{
		_id: new ObjectID(),
		text: 'second test',
	},{
		_id: new ObjectID(),
		text: 'third test',
	}
];

beforeEach((done)=>{
	Todo.deleteMany({}).then(()=>{
		Todo.insertMany(todos).then(()=>{done()},(e)=>{done(e);});
	},(e)=>{done(e);});
});

describe('POST /todos :' , ()=>{
	it('should create a new todo' , (done)=>{
		var text = 'testing';
		request(app).post('/todos')
					.send({text})
					.expect(200)
					.expect((res)=>{
						expect(res.body.text).toBe(text);			//checking response
					})
					.expect(()=>{Todo.find().then((todos)=>{
							expect(todos.length).toBe(4);
							expect(todos[3].text).toBe(text);
						}).catch((e)=>{done(e)});})					//checking db
					.end(done);
	});
	it('should not create a new todo' , (done)=>{
		var text = '';
		request(app).post('/todos')
					.send({text})
					.expect(400)
					.end(done);
	});
});

describe('GET /todos :' , ()=>{
	it('should get 3 todos back' , (done)=>{
		request(app).get('/todos')
					.expect(200)
					.expect((res)=>{
						expect(res.body.todos.length).toBe(3);
					}).end(done);
	});
});

describe('GET /todos/:id :' , ()=>{
	it('should return requested document' , (done)=>{
		var id = todos[1]._id;
		request(app).get(`/todos/${id}`)
					.expect(200)
					.expect((res)=>{
						expect(res.body).toInclude(todos[1])
					}).end(done);
	});
	it('should return 404 with invalid id' , (done)=>{
		request(app).get('/todos/123')
					.expect(404)
					.end(done);
	});
	it('should return 400 with absent id' , (done)=>{
		request(app).get('/todos/1c2302d130d3925cfc0208a1')
					.expect(400)
					.end(done);
	});
});