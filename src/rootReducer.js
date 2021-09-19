import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import savedPackages from './savedPackagesSlice';
import uiState from './uiStateSlice';
import todos from './todosSlice';

export const rootReducer = combineReducers({ savedPackages, uiState, todos });
export const store = createStore(rootReducer, applyMiddleware(thunk));

    