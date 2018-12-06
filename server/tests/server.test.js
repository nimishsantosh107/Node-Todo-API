const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todos.js');

beforeEach((done)=>{
	Todo.deleteMany({}).then(()=>done(),(e)=>{done(e);});
});

describe('POST /todos:' , ()=>{
	it('should create a new todo' , (done)=>{
		var text = 'testing';
		request(app).post('/todos')
					.send({text})
					.expect(200)
					.expect((res)=>{
						expect(res.body.text).toBe(text);			//checking response
					})
					.expect(()=>{Todo.find().then((todos)=>{
							expect(todos.length).toBe(1);
							expect(todos[0].text).toBe(text);
						})})										//checking db
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