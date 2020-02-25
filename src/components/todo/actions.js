import {BACKEND_URL} from '../../constants';
import AXIOS from '../../services/helpers/axios';

export const editTodoRequest = async (item, {todos, groupId, userId, dispatch}) => {
    try {
        const {type, todo, id} = item;
        const url = `${BACKEND_URL}/proscons/group/${groupId}/user/${userId}`;
        let updatedData;

        if (type === 'pros') {
            updatedData = {
                ...todos,
                pros: todos[type].map(t => (t.id === id ? {...t, text: todo} : t)),
            };
        } else {
            updatedData = {
                ...todos,
                cons: todos[type].map(t => (t.id === id ? {...t, text: todo} : t)),
            };
        }

        const response = await AXIOS.put(url, updatedData);
        dispatch({type: 'SET_ALL_TODOS', payload: response.data});
    } catch (error) {
        console.error(error);
    }
};

export const deleteTodoRequest = async (item, {todos, groupId, userId, dispatch}) => {
    try {
        const {type, id} = item;
        const url = `${BACKEND_URL}/proscons/group/${groupId}/user/${userId}`;
        let updatedData;

        if (type === 'pros') {
            updatedData = {
                ...todos,
                pros: todos[type].filter(t => t.id !== id),
            };
        } else {
            updatedData = {
                ...todos,
                cons: todos[type].filter(t => t.id !== id),
            };
        }

        const response = await AXIOS.put(url, updatedData);
        dispatch({type: 'SET_ALL_TODOS', payload: response.data});
    } catch (error) {
        console.error(error);
    }
};
