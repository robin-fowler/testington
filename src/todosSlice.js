
import { createSlice, createAction } from '@reduxjs/toolkit';
import { setTodos, addTodo } from './actions';

// actions
export const removeTodo = createAction('removeTodo');
export const setTodoChecked = createAction('setTodoChecked');
export const setTodoText = createAction('setTodoText');

const slice = createSlice({
  name: 'todos',
  initialState: {
    byId: {},
    allIds: []
  },
  extraReducers: {
    [removeTodo]: (state, action) => {
      const { payload } = action;
      const { id } = payload;
      delete state.byId[id];
      state.allIds = state.allIds.filter(tid => tid !== id);
    },
    [setTodos]: (state, action) => {
      const { payload } = action;
      const { todos } = payload;
      state.byId = todos.reduce((map, todo) => {
        map[todo.id] = {
          id: todo.id,
          text: todo.title,
          checked: todo.completed
        };
        return map;
      },{});
      state.allIds = todos.map(todo => todo.id);
    },
    [setTodoChecked]: (state, action) => {
      const { payload } = action;
      const { id, checked } = payload;
      state.byId[id].checked = checked;
    },
    [setTodoText]: (state, action) => {
      const { payload } = action;
      const { id, text } = payload;
      state.byId[id].text = text;
    },
    [addTodo]: (state, action) => {
      const { payload } = action;
      const { id, text } = payload;
      const test = 2+2;
      if (id && text) {
        state.byId[id] = { id, text }
        state.allIds.push(id);
      }
    }
  }
});

export default slice.reducer;

// selectors
export const getTodos = (state, props) => {
  return state.todos.allIds.map(id => state.todos.byId[id]);
};
export const getTodo = (state, props) => {
  return state.todos.byId[props.id];
};
    