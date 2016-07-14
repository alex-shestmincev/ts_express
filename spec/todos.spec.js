'use strict';
const app = require('../dist/app');
const request = require('supertest-as-promised').agent(app);
const dbHelper = require('./helpers/dbHelper');
const testTodosHelper = require('./helpers/todosHelper');
const TodosModel = require('./../dist/todos/todosModel').TodosModel;
const todosHelper = require('./../dist/todos/helpers');

describe("Todos", function() {
  beforeEach((done) => {
    dbHelper.connect().then(() => done());
  });

  describe("GET /", () => {
    it("should return list of todos", (done) => {
      request.get('/todos').then(res => {
        expect(res.body.todos).toBeDefined();
        expect(Array.isArray(res.body.todos)).toBe(true);

        done();
      })

    });
  });

  describe("GET /undefined", () => {
    it("should return 404 for undefined route", (done) => {
      request.get('/undefined').then(res => {
        expect(res.status).toBe(404);

        done();
      })
    });
  });

  describe("POST /todos", () => {
    it("should create new todo item", (done) => {
      const todo = testTodosHelper.newTodoItem;
      request.post('/todos').send({ todo })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.todo).toBeDefined();
          expect(res.body.todo.title).toBe(todo.title);
          expect(res.body.todo.description).toBe(todo.description);
          expect(res.body.todo.status).toBe(todo.status);

          return request.get(`/todos/${res.body.todo._id}`)
        })
        .then(res2 => {
          expect(res2.status).toBe(200);
          expect(res2.body.todo).toBeDefined();
          expect(res2.body.todo.title).toBe(todo.title);
          expect(res2.body.todo.description).toBe(todo.description);
          expect(res2.body.todo.status).toBe(todo.status);
          done();
        })
    });
  });

  describe("PUT /todos/:id", () => {
    beforeEach((done) => {
      TodosModel.create(testTodosHelper.newTodoItem).then((todo) => {
        this.todo = todo;
        done();
      })
    })

    it("should update exists todo", (done) => {
      const todo = this.todo;
      const upData = {
        title: todo.title + '1',
        description: todo.description + '1',
        status: todosHelper.STATUSES.closed,
      }
      request.put(`/todos/${todo._id}`).send({ todo: upData })
        .then(res => {

          expect(res.status).toBe(200);
          expect(res.body.todo).toBeDefined();
          expect(res.body.todo.title).toBe(upData.title);
          expect(res.body.todo.description).toBe(upData.description);
          expect(res.body.todo.status).toBe(upData.status);

          return request.get(`/todos/${res.body.todo._id}`)
        })
        .then(res2 => {
          expect(res2.status).toBe(200);
          expect(res2.body.todo).toBeDefined();
          expect(res2.body.todo.title).toBe(upData.title);
          expect(res2.body.todo.description).toBe(upData.description);
          expect(res2.body.todo.status).toBe(upData.status);
          done();
        })
    });
  });
});
