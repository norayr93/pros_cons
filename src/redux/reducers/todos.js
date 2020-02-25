import * as types from '../types';
import {createReducer} from '../../services/utilities';
import _ from 'lodash';

const initialState = {
    todosList: {
        pros: [],
        cons: [],
    },
    actionResult: null,
    isFetching: false,
    user: {},
};

const updateStore = (state, newState) => ({
    ...state,
    ...newState,
});

const clearActionResult = (state, action) => {
    const {payload} = action;

    let newState = {
        actionResult: null,
        isFetching: false,
    };
    if (!_.isEmpty(payload)) newState = _.merge(newState, payload);

    return updateStore(state, newState);
};

const customRequest = (state, action) => {
    return updateStore(state, {
        actionResult: null,
        isFetching: true,
    });
};

const getTodosSuccess = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: null,
        isFetching: false,
        todosList: {
            pros: payload.pros || [],
            cons: payload.cons || [],
        },
    });
};

const getTodosFail = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'error',
            message: payload.message || 'Something went wrong',
        },
        isFetching: false,
    });
};

const addTodoSuccess = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'success',
            message: 'Item has been added successfully',
        },
        isFetching: true,
        todosList: {
            pros: payload.pros || [],
            cons: payload.cons || [],
        },
    });
};

const addTodoFail = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'error',
            message: payload.message || 'Something went wrong',
        },
        isFetching: false,
    });
};

const editTodoSuccess = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'success',
            message: 'Item has been updated successfully',
        },
        isFetching: false,
        todosList: payload,
    });
};

const editTodoFail = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'error',
            message: payload.message || 'Something went wrong',
        },
        isFetching: false,
    });
};

const deleteTodoSuccess = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'success',
            message: 'Item has been deleted successfully',
        },
        isFetching: false,
        todosList: payload,
    });
};

const deleteTodoFail = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: {
            type: 'error',
            message: payload.message || 'Something went wrong',
        },
        isFetching: false,
    });
};

const setUserCredentials = (state, action) => {
    const {payload} = action;

    return updateStore(state, {
        actionResult: null,
        isFetching: true,
        user: payload,
    });
};

export const handlers = {
    [types.CLEAR_ACTION_RESULT]: clearActionResult,
    [types.GET_TODOS_LIST_REQUEST]: customRequest,
    [types.GET_TODOS_LIST_SUCCESS]: getTodosSuccess,
    [types.GET_TODOS_LIST_FAIL]: getTodosFail,

    [types.ADD_TODO_REQUEST]: customRequest,
    [types.ADD_TODO_SUCCESS]: addTodoSuccess,
    [types.ADD_TODO_FAIL]: addTodoFail,

    [types.EDIT_TODO_REQUEST]: customRequest,
    [types.EDIT_TODO_SUCCESS]: editTodoSuccess,
    [types.EDIT_TODO_FAIL]: editTodoFail,

    [types.DELETE_TODO_REQUEST]: customRequest,
    [types.DELETE_TODO_SUCCESS]: deleteTodoSuccess,
    [types.DELETE_TODO_FAIL]: deleteTodoFail,

    [types.SET_USER_CREDENTIALS]: setUserCredentials,
};

export default createReducer(initialState, handlers);
