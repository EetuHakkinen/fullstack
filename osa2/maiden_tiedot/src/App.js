import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const App = () => {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(v => setCountries(v.data));
    });

    const filtered = countries.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            find countries:
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {filtered.length > 10 ? <p>Too many matches, specify another filter</p> : <List data={filtered} setCountry={v => setSearch(v)} />}
        </>
    );
}

const List = ({ data, setCountry }) => {
    if (data.length === 1) {
        return (
            <Country data={data[0]} />
        );
    }
    return (
        <>
            {data.map((c, i) => <div><span key={i}>{c.name}</span><button onClick={() => setCountry(c.name)}>show</button></div>)}
        </>
    );
}

const Country = ({ data }) => {
    const [weather, setWeather] = useState(null);

    axios
        .get('http://api.apixu.com/v1/current.json?key=84fe86ca450349568b864432192103&q=' + data.capital)
        .then(v => setWeather(v.data));

    return (
        <>
            <h1>{data.name}</h1>
            <p>capital {data.capital}</p>
            <p>population {data.population}</p>
            <h2>languages</h2>
            <ul>
                {data.languages.map((l, i) => <li key={i}>{l.name}</li>)}
            </ul>
            <img height="120px" src={data.flag} />
            {weather ?
                <div>
                    <h2>Weather in {data.capital}</h2>
                    <p>Temperature: {weather.current.temp_c} C</p>
                    <img height="100px" src={weather.current.condition.icon} />
                    <p>Wind {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
                </div> : <div></div>}
        </>
        );
    }
    
    export default App;
