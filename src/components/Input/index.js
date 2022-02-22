import React, {forwardRef} from 'react';
import './input.css'

export const Input = forwardRef((props, ref) => (
        <>
            <input ref={ref} className="inputs" type={props.type} name={props.name} placeholder={props.placeholder} width={props.width} maxLength="16" required>{props.text}</input>
        </>
));
