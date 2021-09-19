
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { createAction } from '@reduxjs/toolkit';
import { setData as _setData } from './savedPackagesSlice';
import { updateAuthState as _updateAuthState } from './uiStateSlice';
import { test } from './functions';
const actions = {};
actions.authStateChanged = (payload) => {
  return (dispatch, getState) => {
    const updateAuthState = (...options) => { dispatch(_updateAuthState(...options)) };
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      updateAuthState({user});
    });
  }
}
actions.fetchTodos = (payload) => {
  return async (dispatch, getState) => {
    const setTodos = (...options) => { dispatch(actions.setTodos(...options)) };
    let todos = [];
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      todos = await response.json();
    } catch (e) {
      
    }
    setTodos({ todos: test(todos.slice(0,30)) });
  }
}
actions.addTodo = createAction('addTodo', (payload) => {
  return { payload: (() => {
    const id = Date.now();
    return { id, ...payload };
  })() }
});
actions.fetchData = (payload) => {
  return async (dispatch, getState) => {
    const setData = (...options) => { dispatch(_setData(...options)) };
    const db = getFirestore();
    const q = query(collection(db, "savedPackages"), where('public', '==', true))
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      data.push({id: doc.id, ...doc.data()});
    });
    setData({data})
  }
}
actions.setTodos = createAction('setTodos');
export const { authStateChanged, fetchTodos, addTodo, fetchData, setTodos } = actions;