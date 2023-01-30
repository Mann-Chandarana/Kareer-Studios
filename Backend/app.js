require('./db').connect();
require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const PORT = process.env.PORT||8000;

app.use('/api/auth',require('./routes/auth'));
app.use('/api/auth',require('./routes/link'));

app.listen(PORT,()=>{
    console.log(`Successfully started on https://localhost:${PORT}`)
})