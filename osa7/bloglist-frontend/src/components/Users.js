import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/users';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = (props) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getAllUsers()
            .then(u => {
                setUsers(u);
            });
    }, []);
    return (
        <div>
            <h3>Users</h3>
            <Table striped>
                <thead>
                    <td></td>
                    <td><b>blogs created</b></td>
                </thead>
                <tbody>
                    {users.map((u, i) => <tr key={i}><td><Link to={'/users/' + u.id}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>)}
                </tbody>
            </Table>
        </div>
    );
}

export default Users;