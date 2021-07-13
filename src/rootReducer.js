import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import uiState from './uiStateSlice';
import todos from './todosSlice';

export const rootReducer = combineReducers({ uiState, todos });
export const store = createStore(rootReducer, applyMiddleware(thunk));

    