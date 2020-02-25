import {takeLatest, put, select} from 'redux-saga/effects';
import {BACKEND_URL} from '../../constants/core-constants';
import AXIOS from '../../services/helpers/axios';
import {
    getTodosListFail,
    getTodosListSuccess,
    editTodoSuccess,
    editTodoFail,
    deleteTodoSuccess,
    deleteTodoFail,
    addTodoSuccess,
    addTodoFail,
} from '../actions';
import {GET_TODOS_LIST_REQUEST, ADD_TODO_REQUEST, EDIT_TODO_REQUEST, DELETE_TODO_REQUEST} from '../types';

const baseUrlPath = `${BACKEND_URL}`;

function* getTodos({payload}) {
    const {userId, groupId} = payload;

    try {
        const urlPath = `${baseUrlPath}/proscons/group/${groupId}/user/${userId}`;

        const response = yield AXIOS.get(urlPath);
        yield put(getTodosListSuccess(response.data));
    } catch (e) {
        yield put(getTodosListFail(e));
    }
}

function* addTodo({payload}) {
    try {
        const {type, todo, id} = payload;
        const {userId, groupId} = yield select(state => state.todos.user);
        const todos = yield select(state => state.todos.todosList);

        if (type === 'pros') {
            todos.pros.push({text: todo, id});
        } else {
            todos.cons.push({text: todo, id});
        }

        const urlPath = `${baseUrlPath}/proscons/group/${groupId}/user/${userId}`;

        const response = yield AXIOS.put(urlPath, todos);
        yield put(addTodoSuccess(response.data));
    } catch (e) {
        yield put(addTodoFail(e));
    }
}

function* editTodo({payload}) {
    try {
        const {type, todo, id} = payload;
        const {userId, groupId} = yield select(state => state.todos.user);
        let todos = yield select(state => state.todos.todosList);

        if (type === 'pros') {
            todos.pros = todos.pros.map(t => {
                if (t.id === id) return {...t, text: todo};
                return t;
            });
        } else {
            todos.cons = todos.cons.map(t => {
                if (t.id === id) return {...t, text: todo};
                return t;
            });
        }

        const urlPath = `${baseUrlPath}/proscons/group/${groupId}/user/${userId}`;

        const response = yield AXIOS.put(urlPath, todos);
        yield put(editTodoSuccess(response.data));
    } catch (e) {
        yield put(editTodoFail(e));
    }
}

function* deleteTodo({payload}) {
    try {
        const {type, id} = payload;
        const {userId, groupId} = yield select(state => state.todos.user);
        let todos = yield select(state => state.todos.todosList);

        if (type === 'pros') {
            todos.pros = todos.pros.filter(t => t.id !== id);
        } else {
            todos.cons = todos.cons.filter(t => t.id !== id);
        }

        const urlPath = `${baseUrlPath}/proscons/group/${groupId}/user/${userId}`;

        const response = yield AXIOS.put(urlPath, todos);
        yield put(deleteTodoSuccess(response.data));
    } catch (e) {
        yield put(deleteTodoFail(e));
    }
}

export default function* productSaga() {
    yield takeLatest(GET_TODOS_LIST_REQUEST, getTodos);
    yield takeLatest(ADD_TODO_REQUEST, addTodo);
    yield takeLatest(EDIT_TODO_REQUEST, editTodo);
    yield takeLatest(DELETE_TODO_REQUEST, deleteTodo);
}
