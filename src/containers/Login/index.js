import React, {useContext, useState} from 'react';
import { Redirect } from 'react-router';
import {AuthContext} from '../../context/';
import {Link} from 'react-router-dom';
import { Button, InputLogin, Form, Alert } from '../../components';


export const Login = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {currentUser, handleLogin, error, setError} = useContext(AuthContext)



    if (currentUser) {
        return <Redirect to="/main"/>;
    }

    return (
        
        <div style={{ position: "relative", height: '100vh' }}>
            <Form action={(event) => handleLogin(event, email, password)} text="Log In">
                { error ? 
                    <Alert>{error.error}</Alert>
                    :
                    null
                }
                <InputLogin type="email" name="email" text="Email" onChange={(e) => setEmail(e.target.value)}/>
                <InputLogin type="password" name="password" text="Password" onChange={(e) => setPassword(e.target.value)} />
                <Button type="submit" text="Log In" />
                <span className="or-break">або</span>
                <Link to="/signup" className="auth-link" onClick={() => setError('')}>Sign Up</Link>
            </Form>
        </div>

    )
}