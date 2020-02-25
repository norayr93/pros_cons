import {useState, useEffect} from 'react';
import {BACKEND_URL} from '../../constants';
import AXIOS from '../helpers/axios';

const useCredentials = () => {
    const [credentials, setCredentials] = useState({});

    const getUserId = async () => await AXIOS.get(`${BACKEND_URL}/user/norayr_ghukasyan`);
    const getGroupId = async () => await AXIOS.get(`${BACKEND_URL}/group/norayr_ghukasyan`);

    useEffect(() => {
        const getUserCredentials = async () => {
            const [user, group] = await Promise.all([getUserId(), getGroupId()]);
            setCredentials({userId: user.data.userId, groupId: group.data.groupId});
        };

        getUserCredentials();
    }, []);

    return credentials;
};

export default useCredentials;
