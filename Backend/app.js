require('dotenv').config();
require('./db').connect();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use('/api/auth', require('./routes/auth'));
app.use('/api/link', require('./routes/link'));

app.listen(PORT, () => {
    console.log(`Successfully started on https://localhost:${PORT}`);
});