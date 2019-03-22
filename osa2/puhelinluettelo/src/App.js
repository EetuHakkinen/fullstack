import React, { useState, useEffect } from 'react';
import { getAll, addNumber, deletePerson, replaceNumber } from './dbhandler';
import './App.css';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [filterList, setFilterList] = useState('');

    useEffect(() => {
        getAll().then(data => setPersons(data));
    }, [filterList])

    const filteredList = persons.filter(p => p.name.toLowerCase().includes(filterList.toLowerCase()));

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={errorMessage} tone='error' />
            <Notification message={successMessage} tone='success' />
            <Filter filterList={filterList} setFilterList={e => setFilterList(e.target.value)} />
            <PersonForm persons={persons} setPersons={v => setPersons(v)} setSuccessMessage={v => setSuccessMessage(v)} />
            <h2>Numerot</h2>
            <List filteredList={filteredList} setErrorMessage={v => setErrorMessage(v)} setSuccessMessage={v => setSuccessMessage(v)} />
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

const PersonForm = ({ persons, setPersons, setSuccessMessage }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const submit = (event) => {
        var personsList = persons.filter(p => p.name === name);
        if (personsList.length === 0) {
            event.preventDefault();
            var newPerson = { name, number }
            console.log(newPerson);
            addNumber(newPerson).then(data => setPersons(persons.concat(data)))
                .then(v => {
                    setSuccessMessage('Lisättiin ' + name)
                    setTimeout(() => {
                        setSuccessMessage(null)
                    }, 5000);
                });
            setName('');
            setNumber('');
        } else {
            if (window.confirm(`${name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                var id = persons.filter(p => p.name === name)[0].id
                replaceNumber(id, number, name)
                    .then(v => {
                        setSuccessMessage(`Henkilön ${name} numero vaihdettiin`)
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 5000);
                    });
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

const List = ({ filteredList, setSuccessMessage, setErrorMessage }) => {
    const handleRemove = (id, name) => {
        if (window.confirm(`Poistetaanko ${name}`)) {
            deletePerson(id)
                .then(v => {
                    setSuccessMessage(`Poistettiin ${name}`)
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 5000);
                })
                .catch(v => {
                    setErrorMessage(`Henkilö ${name} on jo poistettu`)
                    setTimeout(() => {
                        setErrorMessage(null);
                    }, 5000)
                })
        }
    }

    return (
        <>
            {filteredList.map((p, i) => <div key={i}><span>{p.name} {p.number}</span><button onClick={() => handleRemove(p.id, p.name)}>poista</button></div>)}
        </>
    );
}

const Notification = ({ message, tone }) => {
    if (!message) {
        return null;
    }

    return (
        <div className={tone}>
            {message}
        </div>
    );
}