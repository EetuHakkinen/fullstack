import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteFrom';
import { init } from './reducers/anecdoteReducer'

const App = (props) => {

    useEffect(() => {
        props.init();
    }, []);

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <Notification />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default connect(
    null, { init }
)(App);

/*<Filter />
<Notification />
<AnecdoteList />
<AnecdoteForm />
*/