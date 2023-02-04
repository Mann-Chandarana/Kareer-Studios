const { createClient } = require('redis');
const { REDIS_URL } = process.env;

if (!REDIS_URL) {
    console.error('Please set `REDIS_URL` in env');
    process.exit(1);
}

const client = createClient({ url: REDIS_URL });

client.on('ready', () => {
    console.log('connected to redis database!');
});
client.on('error', (err) => {
    console.error('redis connection error', err.stack);
});

module.exports = client;
