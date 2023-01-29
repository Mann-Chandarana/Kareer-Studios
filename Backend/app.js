const express = require('express');
var cors = require('cors')

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 5000;

app.use('/api/auth/kareerStudios',require('./Routes/auth'))

app.listen(PORT,()=>{
    console.log(`Successfully started on https://localhost:$(PORT)`)
})