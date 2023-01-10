const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const app = express();

const apiRouter = require('./router/example');

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use(morgan("dev"));
app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/api/v1', apiRouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
})

module.exports = app;