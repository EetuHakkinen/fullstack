import React, { useState } from 'react';
import './App.css';

const App = () => {
    // tallenna napit omaan tilaansa
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>Anna palautetta</h1>
            <div className="buttons">
                <Button onClick={() => setGood(good + 1)} text="Hyvä" />
                <Button onClick={() => setNeutral(neutral + 1)} text="Neutraali" />
                <Button onClick={() => setBad(bad + 1)} text="Huono" />
            </div>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

const Button = ({ text, onClick }) =>
    <button onClick={onClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;
    if (good !== 0 || neutral !== 0 || bad !== 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <table>
                    <tbody>
                        <Statistic text="Hyvä" value={good} />
                        <Statistic text="Neutraali" value={neutral} />
                        <Statistic text="Huono" value={bad} />
                        <Statistic text="Yhteensä" value={total} />
                        <Statistic text="Keskiarvo" value={(good + (bad * -1)) / total} />
                        <Statistic text="Positiivisia" value={good * 100 / total} />
                    </tbody>
                </table>
            </div>
        );
    }
    return (
        <div>
            <p>Ei yhtään palautetta annettu</p>
        </div>
    );
}

const Statistic = ({ text, value }) =>
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>

export default App;
