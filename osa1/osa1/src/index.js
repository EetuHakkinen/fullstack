import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    console.log('Hello from komponentti');
    const now = new Date()
    const a = 10
    const b = 20
    return (
        <div>
            <p>Hello World, today is {now.toString()}</p>
            <p>{a} + {b} = {a + b}</p>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));