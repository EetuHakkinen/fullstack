import React, { useState } from 'react';
import blogService from '../services/blogs';
import { connect } from 'react-redux';
import { showNotification } from '../reducers/notificationReducer';
import { createBlog } from '../reducers/blogReducer';
import {Form, Button} from 'react-bootstrap';

const CreateBlog = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreate = (event) => {
        event.preventDefault();
        try {
            props.createBlog({ title, author, url, user: props.user });
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
        <Form onSubmit={handleCreate}>
            title:
            <Form.Control
                id="title"
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)} /><br />
            author:
            <Form.Control
                id="author"
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)} /><br />
            url:
            <Form.Control
                id="url"
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)} /><br />
            <Button variant="primary" type="submit">create</Button>
        </Form>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { showNotification, createBlog })(CreateBlog);