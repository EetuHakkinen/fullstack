import React from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
    const {hyva} = props.hyva
    const {neutraali} = props.neutraali
    const {huono} = props.huono
    return (
        <div>
            <Title text="Anna palautetta" />


            <Title text="Statistiikka" />
            <p>{hyva}</p>
            <p>{neutraali}</p>
            <p>{huono}</p>
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick{{props.value} ++}>{props.name}</button>
    )
}

const hyva = {
    value: 0
}

const neutraali = {
    value: 0
}

const huono = {
    value: 0
}

const Title = (props) => {
    return (
        <div>
            <h1>{props.text}</h1>
        </div>
    )
}

const Statistic = (props) => {
    return (
        <div>
            <p>{props.text} {props.value}</p>
        </div>
    )
}

ReactDOM.render(<App hyva={hyva} neutraali={neutraali} huono={huono}/>, document.getElementById('root'));
