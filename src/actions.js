
import { createAction } from '@reduxjs/toolkit';
const actions = {};
actions.fetchTodos = (payload) => {
  return async (dispatch, getState) => {
    const setTodos = (...options) => { dispatch(actions.setTodos(...options)) };
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const todos = await response.json();
    setTodos({ todos: test(todos.slice(0,30)) });
  }
}
actions.addTodo = createAction('addTodo', (payload) => {
  return { payload: (() => {
    const id = Date.now();
    return { id, ...payload };
  })() }
});
actions.setTodos = createAction('setTodos');
export const { fetchTodos, addTodo, setTodos } = actions;