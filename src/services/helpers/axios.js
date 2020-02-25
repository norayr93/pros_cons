import axios from 'axios';
import _ from 'lodash';

import {BACKEND_URL} from '../../constants';

const AXIOS = axios.create({
    baseURL: BACKEND_URL,
});

AXIOS.CancelToken = axios.CancelToken;

AXIOS.interceptors.response.use(
    result => {
        return result;
    },
    result => {
        const statusCode = _.get(result, ['response', 'status']);
        let text = _.get(result, ['response', 'data', 'error', 'message'], '');

        if (!result.response) {
            return;
        }

        return Promise.reject({
            type: 'error',
            status: statusCode,
            message: text,
        });
    }
);

export default AXIOS;
