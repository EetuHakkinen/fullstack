import React, { useState } from 'react';
import './App.css';

const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0});

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>Has {points[selected]} votes</p>
            <button onClick={() => setSelected(Math.round(Math.random()*5))}>Next anecdote</button>
            <button onClick={() => setPoints({...points, [selected]: points[selected] + 1})}>Vote</button>
            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[Biggest(points)]}</p>
            <p>Has {points[Biggest(points)]} votes</p>
        </div>
    )
}

function Biggest(obj) {
    var biggest = obj[0];
    var prev = 0;
    for (var i in obj) {
        if (obj[i] > biggest){
            biggest = obj[i];
        }
    }
    return biggest;
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export default App;
