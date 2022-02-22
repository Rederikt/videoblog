import React from 'react';
import './button.css';

export const Button = (props) => {
    return (
        <button type={props.type} className={"btn btn-salad " + props.className} onClick={props.onClick}>{props.text}</button>
    )
}