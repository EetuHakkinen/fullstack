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
            {filtered.length > 10 ? <p>Too many matches, specify another filter</p> : <List data={filtered} />}
        </>
    );
}

const List = ({data}) => {
    if (data.length === 1) {
        return (
            <Country data={data[0]} />
        );
    }
    return(
        <>
            {data.map((c, i) => <p key={i}>{c.name}</p>)}
        </>
    );
}

const Country = ({data}) => {
    return (
        <>
            <h1>{data.name}</h1>
            <p>capital {data.capital}</p>
            <p></p>
        </>
    );
}

export default App;
