import React, { useState } from 'react';
import blogService from '../services/blogs';
import { connect } from 'react-redux';

const Blog = ({ blog, user }) => {
    const [show, setShow] = useState(false);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const like = () => {
        blogService.like(blog);
    }
    const remove = () => {
        const res = window.confirm('Haluatko varmasti poistaa blogin?')
        if (res) {
            blogService.remove(blog.id);
        }
    }

    var ownBlog;
    if (user.name && blog.user.name) {
        if (blog.user.name.toString() === user.name.toString()) {
            ownBlog = true;
        } else {
            ownBlog = false;
        }
    }

    if (show) {
        return (
            <div style={blogStyle} onClick={() => setShow(false)}>
                <p>{blog.title} {blog.author}</p>
                <a href={blog.url}>{blog.url}</a>
                {blog.likes} likes <button onClick={like}>like</button><br />
                <p>added by {blog.user.name}</p>
                {ownBlog && <button onClick={remove}>remove</button>}
            </div>
        );
    }

    return (
        <div style={blogStyle} onClick={() => setShow(true)}>
            {blog.title} {blog.author}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Blog)