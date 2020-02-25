import React from 'react';
import {showAlert} from '../../services/helpers/alert';
import {useDispatch, useSelector} from 'react-redux';
import shortid from 'shortid';
import {isEmpty} from 'lodash';
import Todo from '../todo';
import Button from '../core/button';
import useForm from '../../services/custom-hooks';
import {todoValidator} from '../../services/validators';
import {MdAddCircleOutline} from 'react-icons/md';
import InputWithValidation from '../core/form/input-with-validation';
import {addTodoRequest, clearActionResult} from '../../redux/actions';

const TodoSection = ({todos = {}}) => {
    const dispatch = useDispatch();
    const initialState = {
        pros: '',
        cons: '',
    };
    const {pros = [], cons = []} = todos;

    const actionResult = useSelector(state => state.todos.actionResult);

    const {inputs, boundHandleFieldChange, generateError, errors, initializeFields} = useForm({
        initialState,
        formValidator: todoValidator,
    });

    const addNewTodo = type => {
        const errors = todoValidator({[type]: inputs[type]});

        if (isEmpty(errors)) {
            dispatch(addTodoRequest({id: shortid(), type, todo: inputs[type]}));
            initializeFields({[type]: ''});
        } else {
            generateError(errors);
        }
    };

    if (actionResult?.type === 'error') {
        showAlert({
            type: 'error',
            title: 'Error',
            text: actionResult.message,
            onClose: () => dispatch(clearActionResult()),
        });
    } else if (actionResult?.type === 'success') {
        showAlert({
            type: 'success',
            title: 'Success',
            text: actionResult.message,
            onClose: () => dispatch(clearActionResult()),
        });
    }

    return (
        <div className='todos'>
            <div className='todos__pros'>
                <header>Pros</header>
                <div className='todos__list'>
                    {pros.map(todo => {
                        return <Todo key={todo.id} name={todo.text} id={todo.id} type='pros' />;
                    })}
                </div>
                <div className='todos__action-box'>
                    <InputWithValidation
                        type='text'
                        name='pros'
                        errorMessage={errors['pros']}
                        errorClassName='form-input__error'
                        value={inputs['pros']}
                        onChange={boundHandleFieldChange}
                    />
                    <Button
                        type='button'
                        isPrimaryButton={true}
                        icon={<MdAddCircleOutline />}
                        onClick={() => addNewTodo('pros')}
                    />
                </div>
            </div>
            <div className='todos__cons'>
                <header>Cons</header>
                <div className='todos__list'>
                    {cons.map(todo => {
                        return <Todo key={todo.id} name={todo.text} id={todo.id} type='cons' />;
                    })}
                </div>
                <div className='todos__action-box'>
                    <InputWithValidation
                        type='text'
                        name='cons'
                        errorMessage={errors['cons']}
                        errorClassName='form-input__error'
                        value={inputs['cons']}
                        onChange={boundHandleFieldChange}
                    />
                    <Button
                        type='button'
                        isPrimaryButton={true}
                        icon={<MdAddCircleOutline />}
                        onClick={() => addNewTodo('cons')}
                    />
                </div>
            </div>
        </div>
    );
};

export default TodoSection;
