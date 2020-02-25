import {createAction} from 'redux-actions';
import * as types from '../types';

export const clearActionResult = createAction(types.CLEAR_ACTION_RESULT);

export const getTodosListRequest = createAction(types.GET_TODOS_LIST_REQUEST);
export const getTodosListSuccess = createAction(types.GET_TODOS_LIST_SUCCESS);
export const getTodosListFail = createAction(types.GET_TODOS_LIST_FAIL);

export const addTodoRequest = createAction(types.ADD_TODO_REQUEST);
export const addTodoSuccess = createAction(types.ADD_TODO_SUCCESS);
export const addTodoFail = createAction(types.ADD_TODO_FAIL);

export const editTodoRequest = createAction(types.EDIT_TODO_REQUEST);
export const editTodoSuccess = createAction(types.EDIT_TODO_SUCCESS);
export const editTodoFail = createAction(types.EDIT_TODO_FAIL);

export const deleteTodoRequest = createAction(types.DELETE_TODO_REQUEST);
export const deleteTodoSuccess = createAction(types.DELETE_TODO_SUCCESS);
export const deleteTodoFail = createAction(types.DELETE_TODO_FAIL);

export const setUserCredentials = createAction(types.SET_USER_CREDENTIALS);
