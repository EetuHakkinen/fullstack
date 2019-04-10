import React, { useState } from 'react';
import login from '../services/login';

const Login = ({ user, setNotification }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = { username, password };
            let usr = await login(data);
            if (usr.name && usr.name !== 'Error') {
                user(usr);
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
        setUsername('');
        setPassword('');
    }

    return (
        <>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                käyttäjätunnus
                <input
                    type="text"
                    value={username}
                    onChange={t => setUsername(t.target.value)} /><br />
                salasana
                <input
                    type="password"
                    value={password}
                    onChange={t => setPassword(t.target.value)} /><br />
                <button type="submit">Kirjaudu</button>
            </form>
        </>
    );
};

export default Login;