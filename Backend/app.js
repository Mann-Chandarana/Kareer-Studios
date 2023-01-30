require('dotenv').config();
require('./db').connect();

require('./twilio').sendOtp("7203088769");

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8000;
const PREFIX = '/api';

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(PREFIX + '/auth', require('./routes/auth'));
app.use(PREFIX + '/link', require('./routes/link'));

app.listen(PORT, () => {
    console.log(`Successfully started on https://localhost:${PORT}`);
});