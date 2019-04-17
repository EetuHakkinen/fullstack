import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import Login from './components/Login';

const App = () => {
    const [user, setUser] = useState();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );
    }, []);

    useEffect(() => {
        let storageUser = window.localStorage.getItem('user');
        if (storageUser) {
            setUser(JSON.parse(storageUser));
        }
    }, []);

    return (
        <div>
            <Notification message={notification} />
            {user ?
                <Bloglist blogs={)} user={user} setUser={v => setUser(v)} setNotification={v => setNotification(v)} />
                :<Login user={v => {
                    setUser(v);
                }} setNotification={v => setNotification(v)} />
            }
        </div>
    )
}

const CreateBlog = (props) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreate = (event) => {
        event.preventDefault();
        try {
            blogService.postNew({ title, author, url, token: props.token });
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

const Notification = (props) => {
    if (!props.message) {
        return null;
    }
    return props.message
}

export default App