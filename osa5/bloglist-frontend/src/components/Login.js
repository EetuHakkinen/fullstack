import React, { useState } from 'react';
import login from '../services/login';
import { useField } from '../hooks/index';

const Login = ({ user, setNotification }) => {
    const username = useField('text');
    const password = useField('password');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = { username: username.value, password: password.value };
            let usr = await login(data);
            if (usr.name && usr.name !== 'Error') {
                user(usr);
                window.localStorage.setItem('user', JSON.stringify(usr));
            } else {
                setNotification('Wrong username or password!');
                setTimeout(() => {
                    setNotification(null);
                }, 5000);
            }
        } catch (e) {
            setNotification(e);
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
        username.reset();
        password.reset();
    }

    const u = {...username, reset: null};
    const p = {...password, reset: null};

    return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                käyttäjätunnus
                <input {...u}/><br />
                salasana
                <input {...p} /><br />
                <button type="submit">Kirjaudu</button>
            </form>
        </>
    );
};

export default Login;