import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import Login from './components/Login';
import Notification from './components/Notification';
import CreateBlog from './components/CreateBlog';
import Bloglist from './components/Bloglist';
import { connect } from 'react-redux';
import { init } from './reducers/blogReducer';
import { setUser } from './reducers/userReducer';

const App = (props) => {
    useEffect(() => {
        props.init();
    })

    useEffect(() => {
        let storageUser = window.localStorage.getItem('user');
        if (storageUser && storageUser.name) {
            console.log(storageUser.name);
            props.setUser(JSON.parse(storageUser));
        }
    }, []);
    return (
        <div>
            <Notification />
            {props.user ?
                <Bloglist />
                :<Login />
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { init, setUser })(App);