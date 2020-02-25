import {formValidator} from './form';

const validationRules = {
    pros: [
        {
            method: 'isLength',
            options: {min: 1},
            message: 'Required',
        },
    ],
    cons: [
        {
            method: 'isLength',
            options: {min: 1},
            message: 'Required',
        },
    ],
    todo: [
        {
            method: 'isLength',
            options: {min: 1},
            message: 'Required',
        },
    ],
};

export default values => formValidator(values, validationRules);
