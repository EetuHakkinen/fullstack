var express = require('express');
var app = express();

let notes = [
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

app.get('/api/persons', (req, res) => {
    res.send(JSON.stringify(notes));
});

app.get('/api/persons/:id', (req, res) => {
    var id = Number(req.params.id);
    var fn = notes.filter(n => n.id === id)[0];
    if (fn) {
        return res.send(JSON.stringify(fn));
    }
    console.log('404');
    return res.send().status(404);
});

app.get('/info', (req, res) => {
    res.send('Puhelinluettelossa on ' + notes.length.toString() + ' henkilön tiedot<br>' + new Date().toString());
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});