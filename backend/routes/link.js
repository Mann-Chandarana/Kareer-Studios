const express = require('express');
const cipher = require('cipher')(process.env.CIPHER_SECRET);
const db = require('../db');
const router = express.Router();

const { verifyCounsellors } = require('../middleware/verify');
const encryptPassword = require('../utils/encryptPass');
const generatePassword = require('../utils/passwordGen');

const studentHandler = require('../handlers/student');
const emailService = require('../services/nodemailer');

router.get('/generate', verifyCounsellors, async (req, res) => {
    const counsellor = req.user;

    const counsellorId = counsellor.id.toString();
    const uuid = Date.now().toString();

    try {
        const uniqueKey = counsellorId + '@' + uuid;

        // const encryptedId = cipher.encrypt(uniqueKey);
        const encodedURI = encodeURIComponent(uniqueKey);

        const generatedLink = `http://localhost:3000/link/register/${encodedURI}`;

        await db.redisClient.SETEX(uniqueKey, 60 * 60, counsellorId);

        res.status(200).send({ link: generatedLink });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/register/:id', async (req, res) => {
    const { name, email, phone, mobileOtp, emailOtp } = req.body;
    const encryptedId = req.params.id;

    try {
        const uniqueKey = decodeURIComponent(encryptedId);
        // const uniqueKey = cipher.decrypt(decodedURI);
        const counsellorId = uniqueKey.split('@')[0];

        const result = await db.redisClient.GET(uniqueKey);
        const isValid = counsellorId === result;

        if (isValid) {
            const _emailOtp = await db.redisClient.GET(email);
            const _mobileOtp = await db.redisClient.GET(phone);

            if (emailOtp != _emailOtp || mobileOtp != _mobileOtp) {
                return res.status(400).send({ error: 'Invaild OTP' });
            }

            const { rowCount } = await studentHandler.getStudentByEmail(email);
            if (rowCount > 0) {
                return res.status(409).send({ error: 'User already exists' });
            }

            // generate password
            const password = generatePassword({
                length: 8,
                lowercase: true,
                uppercase: true,
                numbers: true,
                symbols: false,
            });
            const encryptedPass = encryptPassword(password);

            // create student
            await studentHandler.addStudent(name, email, phone, encryptedPass, counsellorId);

            // clear redis
            await db.redisClient.DEL(email);
            await db.redisClient.DEL(phone);
            await db.redisClient.DEL(uniqueKey);

            // send email and password to email
            emailService.sendEmail(email, 'Email and Passwords', JSON.stringify({ email, password }));
            res.status(202).send({ message: 'Student regsitered!' });
        } else {
            res.status(400).send({ error: 'Invaild link!' });
        }
    } catch (err) {
        console.error(err);
        res.status(400).send({ error: 'Invaild link!' });
    }
});

module.exports = router;
