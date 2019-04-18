import React, { useState } from 'react';
import { connect } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import CreateBlog from './CreateBlog';
import Blog from './Blog';
import { setUser } from '../reducers/userReducer';
import { Button } from 'react-bootstrap';
import Login from './Login';

const Bloglist = (props) => {
    const [showCreate, setShowCreate] = useState(false);
    console.log(props.user);
    if (!props.user || !props.user.name) {
        return <Login />
    }
    return (
        <div>
            {showCreate ? <CreateBlog token={props.user.token} setNotification={v => props.showNotification(v)} setShowCreate={v => setShowCreate(v)} /> : <Button variant="primary" onClick={() => setShowCreate(true)}>create new</Button>}
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

export default connect(mapStateToProps, {showNotification, setUser})(Bloglist);