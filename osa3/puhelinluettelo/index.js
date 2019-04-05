var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '1234567890'
    },
    {
        id: 2,
        name: 'Matti Mallikas',
        number: '0987654321'
    },
]

app.use(bodyParser.json());
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      morgan.token('type', function (req, res) { return req.headers })
    ].join(' ')
}));
app.use(cors());

app.get('/api/persons', (req, res) => {
    res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
    var id = Number(req.params.id);
    var fn = persons.filter(n => n.id === id)[0];
    if (fn) {
        return res.send(JSON.stringify(fn));
    }
    return res.status(404).end();
});

app.get('/info', (req, res) => {
    res.send('Puhelinluettelossa on ' + persons.length.toString() + ' henkilön tiedot<br>' + new Date().toString());
});

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);

    res.status(204).end();
});

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 1000000000);
    const person = req.body;

    if (!person.name) {
        return res.status(400).json({ error: 'name is required' });
    }

    if (!person.number) {
        return res.status(400).json({ error: 'number is required' });
    }

    if (persons.filter(p => p.name === person.name)[0]) {
        return res.status(400).json({ error: 'name must be unique'});
    }

    persons.push({id, ...person});
    res.status(200).send(person);
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});