import React, {useReducer} from 'react';
import Alert from 'react-s-alert';
import AlertTemplate from './components/core/alert-template';
import './styles/main.scss';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {todoReducer} from './reducers';
import GlobalContextProvider from './services/contexts/global';
import TodoSection from './components/todos-section';
import 'react-s-alert/dist/s-alert-default.css';
import {useCredentials} from './services/custom-hooks';
import AXIOS from './services/helpers/axios';
import {BACKEND_URL} from './constants';

function App() {
    const userCredentials = useCredentials();
    const [todos, dispatch] = useReducer(todoReducer, {pros: [], cons: []});

    const fetchAllTodos = async (groupId, userId) => {
        const response = await AXIOS.get(`${BACKEND_URL}/proscons/group/${groupId}/user/${userId}`);
        dispatch({type: 'SET_ALL_TODOS', payload: response.data});
    };

    useDeepCompareEffect(() => {
        const {userId, groupId} = userCredentials;
        if (userId && groupId) fetchAllTodos(groupId, userId);
    }, [userCredentials]);

    return (
        <GlobalContextProvider values={{todos, userCredentials, dispatch}}>
            <div className='main-wrapper'>
                <div className='homepage'>
                    <header className='main-header'>
                        <h1>Should I ... ?</h1>
                    </header>
                    <main>
                        <TodoSection />
                    </main>
                </div>
                <Alert contentTemplate={AlertTemplate} stack={{limit: 1}} />
            </div>
        </GlobalContextProvider>
    );
}

export default App;
