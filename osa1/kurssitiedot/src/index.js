import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
            {
                name: 'Reactin perusteet',
                exercises: 10
            },
            {
                name: 'Tiedonvälitys propseilla',
                exercises: 7
            },
            {
                name: 'Komponenttien tila',
                exercises: 14
            }
        ]
    }


    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
}

const Content = (props) => {
    return (
        <>
            {props.parts.map(i => <Part name={i.name} exercises={i.exercises} />)}
        </>
    );
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    );
}

const Total = (props) => {
    var qty = 0
    for (var i in props.parts) {
        qty += props.parts[i].exercises;
    }
    return (
        <p> yhteensä {qty} tehtävää</p>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
