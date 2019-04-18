import React, { useState } from 'react';
import login from '../services/login';
import { useField } from '../hooks/index';
import { connect } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { setUser } from '../reducers/userReducer';
import {Form, Button} from 'react-bootstrap';

const Login = (props) => {
    const username = useField('text');
    const password = useField('password');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const data = { username: username.value, password: password.value };
            let usr = await login(data);
            if (usr.name && usr.name !== 'Error') {
                props.setUser(usr);
                window.localStorage.setItem('user', JSON.stringify(usr));
            } else {
                showNotification('Wrong username or password!');
                setTimeout(() => {
                    showNotification(null);
                }, 5000);
            }
        } catch (e) {
            showNotification(e);
            setTimeout(() => {
                showNotification(null);
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
            <Form onSubmit={handleLogin}>
                käyttäjätunnus
                <Form.Control {...u}/><br />
                salasana
                <Form.Control {...p} /><br />
                <Button variant="primary" type="submit">Kirjaudu</Button>
            </Form>
        </>
    );
};

export default connect(null, { showNotification, setUser })(Login);