import React, {useState, useEffect} from 'react';
import {getAllUsers} from '../services/users';

const User = ({data}) => {
    const [user, setUser] = useState({blogs: []});
    useEffect(() => {
        getAllUsers()
            .then(u => {
                for (var us in u) {
                    if (u[us].id === data) {
                        setUser(u[us]);
                    }
                }
            })
    }, []);
    return (
        <div>
            <h1>{user.name}</h1>
            <b>added blogs</b>
            <ul>
                {user.blogs.map((b, i) => <li key={i}>{b.title}</li>)}
            </ul>
        </div>
    );
}

export default User;