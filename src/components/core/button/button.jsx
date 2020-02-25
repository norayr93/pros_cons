import React from 'react';
import classNames from 'classnames';

const Button = ({
    type = 'button',
    text = '',
    onClick = () => {},
    attrs = {},
    disabled = false,
    className = '',
    icon = '',
    isPrimaryButton = false,
    children = null,
}) => {
    const buttonClassNames = () => {
        return classNames('btn', className, {
            'btn-primary': isPrimaryButton,
        });
    };

    return (
        <button type={type} disabled={disabled} className={buttonClassNames()} onClick={onClick} {...attrs}>
            {icon && typeof icon === 'object' && icon}
            {text ? <span>{text}</span> : ''}
            {children}
        </button>
    );
};

export default Button;
