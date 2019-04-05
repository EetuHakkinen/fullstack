require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');

app.use(bodyParser.json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
    ].join(' ')
}));
app.use(cors());
app.use(express.static('build'));

app.get('/api/persons', (req, response) => {
    Person.find({}).then(res => {
        response.json(res);
    });
});

app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(result => {
            if (result) {
                res.json(result);
            } else {
                res.status(404).send({ error: 'not-found' });
            }
        })
        .catch(e => next(e));
});

app.get('/info', (req, res) => {
    Person.find({})
        .then(result => {
            let nbr = result.length;
            res.send('Puhelinluettelossa on ' + nbr + ' henkilön tiedot<br>' + new Date().toString());
        })
        .catch(e => next(e));
});

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findByIdAndRemove(id)
        .then(result => {
            if (result) {
                res.status(204).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(e => next(e));
});

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 1000000000);
    const per = req.body;
    console.log(per);

    if (!per.name) {
        return res.status(400).json({ error: 'name is required' });
    }

    if (!per.number) {
        return res.status(400).json({ error: 'number is required' });
    }

    const person = new Person({
        name: per.name,
        number: per.number
    })

    person.save().then(saved => {
        res.json(saved);
    });
});

app.put('/api/persons/:id', (req, res) => {
    Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updated => {
            res.json(updated);
        })
        .catch(e => next(e));
});

const uknownEndpoint = (req, res) => {
    res.status(404).send({error: 'uknown endpoint'});
}

app.use(uknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});