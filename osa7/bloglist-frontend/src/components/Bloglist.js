import React from 'react';
import { connect } from 'react-redux';

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

const mapStateToProps = (state) => {
    return {
        blogs: state.blogReducer
    }
}

export default connect(mapStateToProps)(Bloglist)