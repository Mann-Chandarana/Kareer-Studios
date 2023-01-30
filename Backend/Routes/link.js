const express = require('express');
const cipher = require('cipher')(process.env.CIPHER_SECRET);
const router = express.Router();

const { verifyCounsellors } = require('../middleware/verify');

router.post('/generate', verifyCounsellors, (req, res) => {
    const counsellor = req.user;

    const encryptedId = cipher.encrypt(counsellor.id.toString());
    const encodedURI = encodeURIComponent(encryptedId);

    const generatedLink = `http://localhost:8000/api/link/register/${encodedURI}`;



    res.status(200).send({ link: generatedLink });
});


router.get('/register/:id', (req, res) => {
    const encryptedId = req.params.id;

    const decodedURI = decodeURIComponent(encryptedId);
    const id = cipher.decrypt(decodedURI);

    console.log(id);
});

module.exports = router;