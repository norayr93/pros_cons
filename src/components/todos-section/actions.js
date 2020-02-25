import {BACKEND_URL} from '../../constants';
import AXIOS from '../../services/helpers/axios';

export const addTodoRequest = async (item, {todos, groupId, userId, dispatch}) => {
    try {
        const {type, todo, id} = item;
        const url = `${BACKEND_URL}/proscons/group/${groupId}/user/${userId}`;
        let updatedData;

        if (type === 'pros') {
            updatedData = {...todos, pros: todos[type].concat({id, text: todo})};
        } else {
            updatedData = {...todos, cons: todos[type].concat({id, text: todo})};
        }

        const response = await AXIOS.put(url, updatedData);
        dispatch({type: 'SET_ALL_TODOS', payload: response.data});
    } catch (error) {
        console.error(error);
    }
};
