const mongoose = require('mongoose');

const password = process.argv[2];
const url = `mongodb+srv://eetuh:${password}@cluster0-uy4qe.mongodb.net/puhelinluettelo?retryWrites=true`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
});

if (process.argv.length < 3) {
    console.log('give password as argument');
    process.exit(1);
} else if (process.argv.length === 3) {
    console.log('puhelinluettelo:');
    Person.find({}).then(res => {
        res.forEach(p => {
            console.log(`${p.name} ${p.number}`);
        })
        mongoose.connection.close();
    })
} else {
    person.save().then(res => {
        console.log(`lisättiin ${process.argv[3]} numero ${process.argv[4]}`);
        mongoose.connection.close();
    });
}
