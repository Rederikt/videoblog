import React from 'react';
import './alert.css';


export const Alert = ({ children }) => {
    return (
        <div className="alert-container">
            <div className="alert alert-danger" role="alert">
                {children}
            </div>
        </div>
    )
}