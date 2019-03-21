import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAll, addNumber } from './dbhandler';

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getAll().then(data => setPersons(data));
    }, [])

    const [filterList, setFilterList] = useState('');

    const filteredList = persons.filter(p => p.name.toLowerCase().includes(filterList.toLowerCase()));

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Filter filterList={filterList} setFilterList={e => setFilterList(e.target.value)} />
            <PersonForm persons={persons} setPersons={v => setPersons(v)} />
            <h2>Numerot</h2>
            <List filteredList={filteredList} />
        </div>
    )

}

export default App;

const Filter = ({ filterList, setFilterList }) => {
    return (
        <>
            rajaa näytettäviä: <input
                value={filterList}
                onChange={setFilterList}
            />
        </>
    );
}

const PersonForm = ({persons, setPersons}) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const submit = (event) => {
        var personsList = persons.filter(p => p.name === name);
        if (personsList.length === 0) {
            event.preventDefault();
            var newPerson = {name, number}
            console.log(newPerson);
            addNumber(newPerson).then(data => setPersons(persons.concat(data)));
            setName('');
            setNumber('');
        } else {
            window.alert(`${name} on jo luettelossa`);
        }
    }

    return (
        <>
            <h3>Lisää uusi</h3>
            <form onSubmit={submit}>
                <div>
                    nimi: <input
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    numero: <input
                        value={number}
                        onChange={e => setNumber(e.target.value)} />
                </div>
                <div>
                    <button type="submit">lisää</button>
                </div>
            </form>
        </>
    );
}

const List = ({filteredList}) => {
    return (
        <>
            {filteredList.map((p, i) => <p key={i}>{p.name} {p.number}</p>)}
        </>
    );
}