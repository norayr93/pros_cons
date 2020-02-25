import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Alert from 'react-s-alert';
import AlertTemplate from './components/core/alert-template';
import './styles/main.scss';
import {BACKEND_URL} from './constants';
import AXIOS from './services/helpers/axios';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {getTodosListRequest, setUserCredentials} from './redux/actions';
import TodoSection from './components/todos-section';
import 'react-s-alert/dist/s-alert-default.css';

function App() {
    const dispatch = useDispatch();

    const todos = useSelector(state => state.todos.todosList);
    const userCredentials = useSelector(state => state.todos.user);

    const getUserId = async () => await AXIOS.get(`${BACKEND_URL}/user/norayr_ghukasyan`);
    const getGroupId = async () => await AXIOS.get(`${BACKEND_URL}/group/norayr_ghukasyan`);

    useEffect(() => {
        const getUserCredentials = async () => {
            const [user, group] = await Promise.all([getUserId(), getGroupId()]);
            dispatch(setUserCredentials({userId: user.data.userId, groupId: group.data.groupId}));
        };

        getUserCredentials();
    }, [dispatch]);

    useDeepCompareEffect(() => {
        const {userId, groupId} = userCredentials;
        if (userId && groupId) dispatch(getTodosListRequest({userId, groupId}));
    }, [userCredentials]);

    return (
        <div className='main-wrapper'>
            <div className='homepage'>
                <header className='main-header'>
                    <h1>Should I ... ?</h1>
                </header>
                <main>
                    <TodoSection todos={todos} />
                </main>
            </div>
            <Alert contentTemplate={AlertTemplate} stack={{limit: 1}} />
        </div>
    );
}

export default App;
