import React from 'react';
import './input.css';

export const InputLogin = (props) => (
        <div className="form">
            <div>
                <input type={props.type} name={props.name} onChange={props.onChange} required></input>
                <label className="input-lable"  autoComplete="off">
                    <span className="input-content">{props.text}</span>
                </label>
            </div>
        </div>
);
