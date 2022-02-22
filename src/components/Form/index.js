import React from 'react';
import logo from '../../img/logo.png';
import './form.css';

export const Form = ({children, action, text}) => {
    return(
        <div className="login">
            <form className="register-window" onSubmit={action}>
                <img src={logo} alt="" className="logo-auth" />
                <h1 className="log-title">{text}</h1>
                {children}
            </form>
        </div>
    )
}