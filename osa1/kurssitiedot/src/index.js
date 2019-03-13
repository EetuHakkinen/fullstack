import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
    const course = 'Half Stack -sovelluskehitys'
    const part1 = 'Reactin perusteet'
    const exercises1 = 10
    const part2 = 'Tiedonvälitys propseilla'
    const exercises2 = 7
    const part3 = 'Komponenttien tila'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content p1={part1} e1={exercises1} p2={part2} e2={exercises2} p3={part3} e3={exercises3} />
            <Total e1={exercises1} e2={exercises2} e3={exercises3} />
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
            <Part name={props.p1} exercises={props.e1} />
            <Part name={props.p2} exercises={props.e2} />
            <Part name={props.p3} exercises={props.e3} />
        </>
    );
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    );
}

const Total = (props) => {
    return (
        <p> yhteensä {props.e1 + props.e2 + props.e3} tehtävää</p>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
