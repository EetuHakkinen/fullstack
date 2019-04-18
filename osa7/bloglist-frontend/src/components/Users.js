import React from 'react';
import { getAllUsers } from '../services/users';

const Users = (props) => {
    const users = getAllUsers();
    return (
        <div>
            <table>
                <thead>
                    <td></td>
                    <td>blogs created</td>
                </thead>
                <tbody>
                    {props.}
                </tbody>
            </table>
        </div>
    );
}

export default Users;