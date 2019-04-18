import React, { useState } from 'react';
import blogService from '../services/blogs';
import { connect } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';

const CreateBlog = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreate = (event) => {
        event.preventDefault();
        try {
            props.createBlog({ title, author, url, token: props.user.token });
            props.setNotification(`Blogi ${title} lisätty!`);
            props.setShowCreate(false);
            setTimeout(() => {
                props.setNotification(null);
            }, 5000);
        } catch (e) {
            props.setNotification(e);
            setTimeout(() => {
                props.setNotification(null);
            }, 5000);
        }
        setTitle('');
        setAuthor('');
        setUrl('');
    }

    return (
        <form onSubmit={handleCreate}>
            title:
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)} /><br />
            author:
            <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)} /><br />
            url:
            <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)} /><br />
            <button type="submit">create</button>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { showNotification, createBlog })(CreateBlog);