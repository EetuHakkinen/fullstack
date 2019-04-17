import React from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteFrom';

const App = () => {

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

export default App

/*<Filter />
<Notification />
<AnecdoteList />
<AnecdoteForm />
*/