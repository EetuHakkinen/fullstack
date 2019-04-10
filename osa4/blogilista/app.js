const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const blogsRouter = require('./controllers/blogs');
const config = require('./utils/config');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => {
        console.log(`Connected to mongoDB`);
    })
    .catch(e => {
        console.error(e);
    })

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter);
app.use('/api/users/', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;