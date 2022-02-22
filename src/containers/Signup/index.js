import React, {useContext, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Button, InputLogin, Form, Alert } from '../../components';
import { AuthContext } from '../../context';

export const Signup = () => {
    const {handleSignUp, currentUser, error, setError} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    if (currentUser) {
        return <Redirect to="/main" />;
    }

    return (
        <div style={{ position: "relative", height: '100vh' }}>
            <Form text="Sign Up" action={(event) => handleSignUp(event, email, username, name, password, passwordConfirmation)}>
                { error ? 
                    <Alert>{error.error}</Alert>
                    :
                    null
                }
                <InputLogin type="email" name="email" text="Email" onChange={(e) => setEmail(e.target.value)}/>
                <InputLogin type="text" name="username" text="Username" onChange={(e) => setUsername(e.target.value)} />
                <InputLogin type="text" name="name" text="First Name" onChange={(e) => setName(e.target.value)} />
                <InputLogin type="password" name="password" text="Password" onChange={(e) => setPassword(e.target.value)} />
                <InputLogin type="password" name="passwordConfirmation" text="Password Confirmation" onChange={(e) => setPasswordConfirmation(e.target.value)} />
                <Button type="submit" text="Sign Up" />
                <span className="or-break">або</span>
                <Link to="/login" className="auth-link" onClick={() => setError('')}>Log In</Link>
            </Form>
        </div>
    )
}
