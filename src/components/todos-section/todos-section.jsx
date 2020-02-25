import React, {useContext} from 'react';
import shortid from 'shortid';
import {isEmpty} from 'lodash';
import Todo from '../todo';
import Button from '../core/button';
import {useForm} from '../../services/custom-hooks';
import {todoValidator} from '../../services/validators';
import {MdAddCircleOutline} from 'react-icons/md';
import InputWithValidation from '../core/form/input-with-validation';
import {GlobalContext} from '../../services/contexts/global';
import {addTodoRequest} from './actions';

const TodoSection = () => {
    const {userCredentials, todos, dispatch} = useContext(GlobalContext);

    const initialState = {
        pros: '',
        cons: '',
    };
    const {pros = [], cons = []} = todos;
    const {groupId, userId} = userCredentials;

    const {inputs, boundHandleFieldChange, generateError, errors, initializeFields} = useForm({
        initialState,
        formValidator: todoValidator,
    });

    const addNewTodo = type => {
        const errors = todoValidator({[type]: inputs[type]});

        if (isEmpty(errors)) {
            addTodoRequest({type, id: shortid(), todo: inputs[type]}, {todos, groupId, userId, dispatch});
            initializeFields({[type]: ''});
        } else {
            generateError(errors);
        }
    };

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
