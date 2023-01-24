require('dotenv').config();
require('./db').connect();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 8001;



app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});




/*
    Not Found Route - Should be bottom of the hierachy
*/
app.get('*', (req, res) => {
    res.status(404).send("Not Found!");
});

app.listen(PORT, () => {
    console.log(`Successfuly started on http://localhost:${PORT}`);
});