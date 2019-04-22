import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

const ALL_AUTHORS = gql`
{
    allAuthors {
        name,
        born,
        bookCount
    }
}
`

const Authors = (props) => {
    if (!props.show || !props.authors || props.authors === []) {
        return null
    }
    console.log(props.authors);

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {props.authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Authors