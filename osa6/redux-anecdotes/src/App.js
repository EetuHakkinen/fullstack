import React from 'react';
import Notification from './components/Notification';
import Filter from './components/Filter';
import CAnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteFrom';

const App = () => {

    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            <Notification />
            <CAnecdoteList />
            <AnecdoteForm />
        </div>
    )
}

export default App
