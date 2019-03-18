import React from 'react';

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    );
}

export default Course;

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    );
}

const Content = (props) => {
    return (
        <>
            {props.parts.map((i, k) => <Part key={k} name={i.name} exercises={i.exercises} />)}
        </>
    );
}

const Part = (props) => {
    return (
        <p>{props.name} {props.exercises}</p>
    );
}

const Total = ({ parts }) => {
    const reducer = (s, p) => s + p.exercises;
    return (
        <p> yhteensä {parts.reduce(reducer, 0)} tehtävää</p>
    );
}
