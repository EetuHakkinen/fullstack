import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import EditAuthor from './components/EditAuthor';

const ALL_AUTHORS = gql`
{
    allAuthors {
        name,
        born,
        bookCount
    }
}
`

const ALL_BOOKS = gql`
{
    allBooks {
        title,
        author,
        published
    }
}
`

const FAVORITE_BOOKS = gql`
{
    favoriteBooks {
        title,
        author,
        published
    }
}
`

const ADD_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int, $genres: [String]!){
    addBook (
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
    ) {
        title
        author
        published
    }
}
`

const EDIT_AUTHOR = gql`
mutation setBirth($name: String!, $year: Int!) {
    editAuthor (
        name: $name,
        birth: $year
    ) {
        name
        birth
    }
}
`

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
        value
    }
}
`

const App = () => {
    const [page, setPage] = useState('authors')
    const [token, setToken] = useState(null);

    const login = useMutation(LOGIN);

    const logout = () => {
        setToken(null);
        localStorage.clear();
        client.resetStore();
    }

    if (!token) {
        return (
            <LoginForm
                login={login}
                setToken={(t) => setToken(t)}
            />
        )
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('edit')}>edit author</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
            </div>

            <Query query={ALL_AUTHORS}>
                {(result) =>
                    page === 'authors' && result.data ? <Authors
                        show={result.data && page === 'authors'}
                        authors={result.data.allAuthors}
                    /> : <div />}
            </Query>


            <Query query={ALL_BOOKS}>
                {res =>
                    page === 'books' && res.data ? <Books
                        blogs={res.data.allBooks}
                    /> : <div />}
            </Query>

            <Mutation mutation={ADD_BOOK}>
                {addp =>
                    <NewBook
                        show={page === 'add'}
                        addBook={addp}
                    />}
            </Mutation>
            <Mutation mutation={EDIT_AUTHOR}>
                {edit =>
                    <EditAuthor show={page === 'edit'} setBirth={edit} />}
            </Mutation>
            <Query query={FAVORITE_BOOKS}>
                {res =>
                    <Recommend
                        show={page === 'recommend'}
                        books={res.data.favoriteBooks}
                    />
                }
            </Query>
            <button onClick={logout}>logout</button>
        </div>
    )
}

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (event) => {
        event.preventDefault();

        try {
            const res = await props.login({
                variables: { username, password }
            })

            const token = res.data.login.value;

            props.setToken(token);
            localStorage.setItem('usr-token', token);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
}

export default App
