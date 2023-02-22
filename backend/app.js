require('dotenv').config();
require('./db').connect();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8000;
const PREFIX = '/api';
const isDevelopmentMode = process.env.ENV === 'development';

if (isDevelopmentMode) {
    app.use(cors({
        origin: ['http://localhost:3000'],
        credentials: true
    }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(PREFIX + '/auth', require('./routes/auth'));
app.use(PREFIX + '/link', require('./routes/link'));
app.use(PREFIX + '/otp', require('./routes/otp'));
app.use(PREFIX + '/payment', require('./routes/payment'));
app.use(PREFIX + '/counsellors', require('./routes/counsellors'));

if (isDevelopmentMode) {
    app.get('*', (req, res) => {
        res.status(404).send({ error: 'Not Found!' });
    });
} else {
    app.use(express.static(path.resolve('../frontend/build')));

    app.get(PREFIX + '/*', (req, res) => {
        res.status(404).send({ error: 'Not Found!' });
    });

    app.get('*', (req, res) => {
        res.status(200).sendFile(path.resolve('../frontend/build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Successfully started on https://localhost:${PORT}`);
});