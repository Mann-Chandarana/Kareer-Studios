const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const redisClient = require('./redis');
dotenv.config();

const { DATABASE_URL } = process.env;

if (!DATABASE_URL) {
    console.error('Please set `DATABASE_URL` in env');
    process.exit(1);
}
const pool = new Pool({
    connectionString: DATABASE_URL
});

const executeQueries = () => {
    const dbStatements = fs.readFileSync(path.join(__dirname, './queries.sql'), {
        encoding: 'utf-8',
    });

    pool.query(dbStatements)
        .then(() => {
            console.log('Executed queries.sql');
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });
};

module.exports = {
    connect: () => {
        pool.connect((err) => {
            if (err) {
                console.error('connection error', err.stack);
            } else {
                console.log('connected to database!');
                executeQueries();
            }
        });
        redisClient.connect();
    },
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    redisClient
};