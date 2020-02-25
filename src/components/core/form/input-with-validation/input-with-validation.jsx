import React from 'react';
import classNames from 'classnames';

const InputWithValidation = props => {
    const {
        placeholder,
        type,
        value,
        name,
        className,
        disabled = false,
        id,
        style,
        wrapperClassName = '',
        errorClassName = '',
        onChange = () => {},
        onBlur = () => {},
        errorMessage = '',
        autoFocus = false,
    } = props;
    return (
        <div className={`form-input ${wrapperClassName}`}>
            <input
                id={id}
                className={classNames('form-input__generic', className, {
                    [`${errorClassName}`]: !!errorMessage,
                })}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                style={style}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                autoFocus={autoFocus}
            />
            {/* {errorMessage && <label className='validation-error-label'>{errorMessage}</label>} */}
        </div>
    );
};

export default InputWithValidation;
