const express = require('express');
const cipher = require('cipher')(process.env.CIPHER_SECRET);
const db = require('../db');
const router = express.Router();

const { verifyCounsellors } = require('../middleware/verify');

router.post('/generate', verifyCounsellors, async (req, res) => {
    const counsellor = req.user;

    const counsellorId = counsellor.id.toString();
    const uuid = Date.now().toString();

    try {
        const uniqueKey = counsellorId + '@' + uuid;

        const encryptedId = cipher.encrypt(uniqueKey);
        const encodedURI = encodeURIComponent(encryptedId);

        const generatedLink = `http://localhost:8000/api/link/register/${encodedURI}`;

        await db.redisClient.SETEX(uniqueKey, 60 * 60, counsellorId);

        res.status(200).send({ link: generatedLink });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }

});


router.get('/register/:id', async (req, res) => {
    const encryptedId = req.params.id;

    try {
        const decodedURI = decodeURIComponent(encryptedId);
        const uniqueKey = cipher.decrypt(decodedURI);
        const counsellorId = uniqueKey.split('@')[0];

        const result = await db.redisClient.GET(uniqueKey);
        const isValid = counsellorId === result;

        if (isValid) {
            res.status(200).send('Signup!');
        } else {
            res.status(400).send({ error: 'Invaild link!' });
        }
    } catch (err) {
        res.status(400).send({ error: 'Invaild link!' });
    }
});

module.exports = router;