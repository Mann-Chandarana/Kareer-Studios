require('dotenv').config();
require('./db').connect();

const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const privateKey = fs.readFileSync('sslcert/host.key', 'utf8');
const certificate = fs.readFileSync('sslcert/host.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
const PORT = process.env.PORT || 8000;
const PREFIX = '/api';
const isDevelopmentMode = process.env.ENV === 'development';

if (isDevelopmentMode) {
    app.use(
        cors({
            origin: ['http://localhost:3000'],
            credentials: true,
        })
    );
}

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/static', express.static('static'));

app.use(PREFIX + '/auth', require('./routes/auth'));
app.use(PREFIX + '/link', require('./routes/link'));
app.use(PREFIX + '/otp', require('./routes/otp'));
app.use(PREFIX + '/payment', require('./routes/payment'));
app.use(PREFIX + '/counsellors', require('./routes/counsellors'));
app.use(PREFIX + '/parents', require('./routes/parents'));
app.use(PREFIX + '/students', require('./routes/students'));
app.use(PREFIX + '/fees', require('./routes/fees'));
app.use(PREFIX + '/feedbacks', require('./routes/feedbacks'));
app.use(PREFIX + '/reports', require('./routes/report'));
app.use(PREFIX + '/records', require('./routes/record'));
app.use(PREFIX + '/suggestprograms', require('./routes/suggestPrograms'));

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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT, () => {
    console.log(`Successfully started on http://localhost:${PORT}`);
});

httpsServer.listen(443, () => {
    console.log(`Successfully started on https://localhost`);
});
