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
    }, [])

    return (
        <div>
            <Notification message={notification} />
            {user ?
                <Bloglist blogs={blogs} user={user} setUser={v => setUser(v)} setNotification={v => setNotification(v)} />
                : <Login user={v => {
                    if (!user) {
                        setUser(v);
                    }
                }} setNotification={v => setNotification(v)} />}
        </div>
    )
}

const Bloglist = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            <p>{props.user.name} logged in</p>
            <button onClick={() => props.setUser(null)}>logout</button>
            <CreateBlog token={props.user.token} setNotification={v => props.setNotification(v)} />
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
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