import React, {useState, useEffect} from 'react';
import blogService from '../services/blogs';
import { Form, Button } from 'react-bootstrap';

const Blogpage = ({id}) => {
    const [blog, setBlog] = useState({user: {name: ''}, comments: []});
    useEffect(() => {
        blogService.getAll()
            .then(b => {
                for (var bl in b) {
                    if (b[bl].id === id) {
                        setBlog(b[bl]);
                    }
                }
            })
    }, []);

    const addBlog = (e) => {
        e.preventDefault();
        blogService.comment(id, e.target.comment.value);
        e.target.comment.value = '';
    }

    return (
        <div>
            <h1>{blog.title} {blog.author}</h1>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes</p>
            <p>added by {blog.user.name}</p>
            <h2>Comments</h2>
            <Form onSubmit={e => addBlog(e)}>
                <Form.Control
                    type="text"
                    name="comment"
                />
                <Button variant="primary" type="submit">add comment</Button>
            </Form>
            {blog.comments && 
            <ul>
                {blog.comments.map((c,i) => <li key={i}>{c}</li>)}
            </ul>}
        </div>
    );
}

export default Blogpage;