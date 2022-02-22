import React, { useEffect, useState, useCallback } from 'react';
import { BACK_PATH } from '../api';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {

    const [currentStatus, setStatus] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState('');

    console.log(currentUser, currentStatus)
    
    const handleLogin = async (event, email, password) => {
        event.preventDefault();
        const userInfo = { email: email, password: password };

        const res = await fetch(`${BACK_PATH}/login`, {
            method: 'POST',
            body: JSON.stringify(userInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        console.log(data)
        if (data.error){
            setError(data)
        } else {
            setUserInfo(data);
            console.log(data)
            setCurrentUser(data.username)
            localStorage.setItem('userInfo', JSON.stringify(data));
            setStatus(true);
            setError('')
        }   

    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo('');
        setCurrentUser('');
    }
    
    const handleSignUp = async (event, email, username, name, password, passwordConfrmation) => {
        event.preventDefault();
        if (password !== passwordConfrmation) {
                console.log(password)
                console.log(passwordConfrmation)
                throw alert("Passwords not match")
            }
        else {
            const userInfo = { email: email, password: password, username: username, name: name };
            const res = await fetch(`${BACK_PATH}/register`, {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            if (data.error){
                setError(data)
            } else {
                setUserInfo(data);
                console.log(data)
                setCurrentUser(data.username)
                localStorage.setItem('userInfo', JSON.stringify(data));
                setStatus(true);
                setError('')
            }   

        }
    }
    //const handleSignUp = useCallback(async event => {
    //    event.preventDefault();
    //    const { email, password, passwordConfrmation } = event.target.elements;        
    //    if (password.value !== passwordConfrmation.value) {
    //            console.log(password)
    //            console.log(passwordConfrmation)
    //            throw alert("Passwords not match")
    //        }
    //    else {
    //        try {
    //            await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
    //        }  catch (error) {
    //            alert(error);
    //        }
    //    }

    //}, [])
    
    //const handleLogin = useCallback(async event => {
    //    event.preventDefault();
    //    const { email, password } = event.target.elements;
    //    try {
    //        await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    //    } catch (error) {
    //        alert(error);
    //    }
    //}, [])

    //const [currentUser, setCurrentUser] = useState([])
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            setCurrentUser(user.username)
            setUserInfo(user);
            setStatus(true);
        } else {
            setCurrentUser('')
            setUserInfo('');
        }

            // localStorage.setItem('userData', JSON.stringify(user));
    }, [])

    return (
        <AuthContext.Provider value={{currentUser, handleLogin, currentStatus, setStatus, userInfo, handleLogout, handleSignUp, error, setError}}>
            {children}
        </AuthContext.Provider>
    )
}
