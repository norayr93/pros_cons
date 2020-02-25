import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import InputWithValidation from '../core/form/input-with-validation';
import Button from '../core/button';
import {MdDelete} from 'react-icons/md';
import Modal from 'react-modal';
import {deleteTodoRequest, editTodoRequest} from '../../redux/actions';
import useForm from '../../services/custom-hooks';
import {todoValidator} from '../../services/validators';
import {isEmpty} from 'ramda';

Modal.setAppElement('#root');

const customStyles = {
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const Todo = ({name, id, type}) => {
    const initialState = {
        todo: '',
    };
    const dispatch = useDispatch();
    const {inputs, boundHandleFieldChange, initializeFields, generateError, errors} = useForm({initialState});

    const [isFocused, setFocused] = useState(false);
    const [isOpen, toggleModal] = useState(false);

    const handleToggleModal = () => toggleModal(v => !v);

    const handleEditTodoOnBlur = e => {
        const errors = todoValidator({todo: inputs['todo']});

        if (isEmpty(errors)) {
            dispatch(editTodoRequest({todo: inputs['todo'], type, id}));
            setFocused(false);
        } else {
            generateError(errors);
        }
    };

    const handleToggleFields = () => {
        initializeFields({todo: name});
        setFocused(true);
    };

    const renderTodo = focused => {
        if (focused) {
            return (
                <InputWithValidation
                    onBlur={handleEditTodoOnBlur}
                    autoFocus={true}
                    name='todo'
                    errorMessage={errors['todo']}
                    errorClassName='form-input__error'
                    value={inputs['todo']}
                    onChange={boundHandleFieldChange}
                />
            );
        }

        return (
            <>
                <span onClick={handleToggleFields}>{name}</span>
                <Button type='button' isPrimaryButton={true} icon={<MdDelete />} onClick={handleToggleModal} />
            </>
        );
    };

    const handleDeleteTodo = () => {
        dispatch(deleteTodoRequest({id, type}));
        handleToggleModal();
    };

    return (
        <div className='todo'>
            {renderTodo(isFocused)}
            <Modal
                isOpen={isOpen}
                onRequestClose={handleToggleModal}
                shouldCloseOnOverlayClick={true}
                style={customStyles}
                className='delete-modal'>
                <div className='modal'>
                    <header>
                        <h4>Are you sure you want to delete this item ?</h4>
                    </header>
                    <div>
                        <Button text='Cancel' onClick={handleToggleModal} />
                        <Button text='Save' onClick={handleDeleteTodo} />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Todo;
