import moment from 'moment';
import { createSlice, createAction } from '@reduxjs/toolkit';
import { setTodos, addTodo } from './actions';

// actions
export const updateTime = createAction('updateTime', (payload) => {
  return { payload: (() => {
    return test({ time: moment().format('MMMM Do YYYY, h:mm:ss a') });
  })() }
});
export const setNewTodoName = createAction('setNewTodoName');
export const toggleDialog = createAction('toggleDialog');

const slice = createSlice({
  name: 'uiState',
  initialState: {
    time: "",
    newTodoName: "",
    showDialog: false,
    todosState: ""
  },
  extraReducers: {
    [updateTime]: (state, action) => {
      const { payload } = action;
      const { time } = payload;
      state.time = time;
    },
    [setTodos]: (state, action) => {
      state.todosState = 'ready';
    },
    [setNewTodoName]: (state, action) => {
      const { payload } = action;
      const { name } = payload;
      state.newTodoName = name; 
    },
    [addTodo]: (state, action) => {
      state.newTodoName = '';
    },
    [toggleDialog]: (state, action) => {
      state.showDialog = !state.showDialog;
    }
  }
});

export default slice.reducer;

// selectors
export const getTime = (state, props) => {
  return state.uiState.time;
};
export const getTodosState = (state, props) => {
  return state.uiState.todosState;
};
export const getNewTodoName = (state, props) => {
  return state.uiState.newTodoName;
};
export const getDialogActiveState = (state, props) => {
  return state.uiState.showDialog;
};
    