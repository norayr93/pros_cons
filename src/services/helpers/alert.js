import ReactSAlert from 'react-s-alert';

import {TIMEOUT_TO_HIDE_SUCCESS_NOTIFICATION, TIMEOUT_TO_HIDE_ERROR_NOTIFICATION} from '../../constants';

export const showAlert = ({type = 'info', title = '', text, onClose, timeout}) => {
    switch (type) {
        case 'warning':
            ReactSAlert.warning(text, {
                customFields: {title: title.toUpperCase()},
                onClose,
            });
            break;

        case 'error':
            ReactSAlert.error(text, {
                customFields: {title: title.toUpperCase()},
                timeout: timeout || TIMEOUT_TO_HIDE_ERROR_NOTIFICATION,
                onClose,
            });
            break;

        case 'success':
            ReactSAlert.success(text, {
                customFields: {title: title.toUpperCase()},
                timeout: timeout || TIMEOUT_TO_HIDE_SUCCESS_NOTIFICATION,
                onClose,
            });
            break;

        default:
            ReactSAlert.info(text, {
                customFields: {title: title.toUpperCase()},
                onClose,
            });
    }
};
