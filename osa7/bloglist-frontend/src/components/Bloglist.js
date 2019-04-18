import React, { useState } from 'react';
import { connect } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import CreateBlog from './CreateBlog';
import Blog from './Blog';
import { setUser } from '../reducers/userReducer';

const Bloglist = (props) => {
    const [showCreate, setShowCreate] = useState(false);

    return (
        <div>
            <h2>blogs</h2>
            <p>{props.user.name} logged in</p>
            <button onClick={() => props.setUser(null)}>logout</button>
            {showCreate ? <CreateBlog token={props.user.token} setNotification={v => props.showNotification(v)} setShowCreate={v => setShowCreate(v)} /> : <button onClick={() => setShowCreate(true)}>create new</button>}
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