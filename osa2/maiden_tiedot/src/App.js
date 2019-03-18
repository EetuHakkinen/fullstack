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
            {filtered.length > 10 ? <p>Too many matches, specify another filter</p> : filtered.map((c, i) => <p key={i}>{c.name}</p>)}
        </>
    );
}

export default App;
