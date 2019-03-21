import React, { useState, useEffect } from 'react';
import { getAll, addNumber, deletePerson, replaceNumber } from './dbhandler';

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        getAll().then(data => setPersons(data));
    }, [filterList])

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

const PersonForm = ({ persons, setPersons }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const submit = (event) => {
        var personsList = persons.filter(p => p.name === name);
        if (personsList.length === 0) {
            event.preventDefault();
            var newPerson = { name, number }
            console.log(newPerson);
            addNumber(newPerson).then(data => setPersons(persons.concat(data)));
            setName('');
            setNumber('');
        } else {
            if (window.confirm(`${name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                var id = persons.filter(p => p.name === name)[0].id
                replaceNumber(id, number, name);
            }
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

const List = ({ filteredList }) => {
    const handleRemove = (id, name) => {
        if (window.confirm(`Poistetaanko ${name}`)) {
            deletePerson(id);
        }
    }

    return (
        <>
            {filteredList.map((p, i) => <div key={i}><span>{p.name} {p.number}</span><button onClick={() => handleRemove(p.id, p.name)}>poista</button></div>)}
        </>
    );
}