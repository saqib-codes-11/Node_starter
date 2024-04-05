'use strict';
const todos = require('../../todos');
const sinon = require('sinon');
const mongoose = require('mongoose');

describe('todos', function () {
  let Todo;

  beforeEach(() => {
    Todo = mongoose.model('Todo');
    sinon.stub(Todo, 'find').yields(null, []);
  });

  describe('all should return all todos', function() {
    it('all with no results should return an empty array', () => {
      let response = {
        send: sinon.stub()
      };

      todos.all({}, response);

      sinon.assert.calledOnce(response.send);
      sinon.assert.calledWith(response.send, []);
    })
  });
});
