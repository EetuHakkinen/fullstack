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
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})