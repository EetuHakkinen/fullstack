import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs';
import Login from './components/Login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
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
                <Bloglist blogs={blogs.sort((a,b) => {
                    if (a.likes < b.likes) {
                        return -1;
                    }
                    if (a.likes > b.likes) {
                        return 1;
                    }
                    return 0;
                })} user={user} setUser={v => setUser(v)} setNotification={v => setNotification(v)} />
                :<Login user={v => {
                    setUser(v);
                }} setNotification={v => setNotification(v)} />
            }
            
        </div>
    )
}

const Bloglist = (props) => {
    const [showCreate, setShowCreate] = useState(false);
    return (
        <div>
            <h2>blogs</h2>
            <p>{props.user.name} logged in</p>
            <button onClick={() => props.setUser()}>logout</button>
            {showCreate ? <CreateBlog token={props.user.token} setNotification={v => props.setNotification(v)} setShowCreate={v => setShowCreate(v)} /> : <button onClick={() => setShowCreate(true)}>create new</button>}
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={props.user} />
            )}
        </div>
    );
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