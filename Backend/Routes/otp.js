const express = require('express');
const router = express.Router();
const db = require('../db');
const studentHandler = require('../handlers/student');
const emailService = require('../services/nodemailer');
const smsService = require('../services/twilio');

router.post('/send', async (req, res) => {
    const { email, phoneNumber } = req.body;
    try {
        const emailOtp = emailService.sendOtp(email);
        const smsOtp = smsService.sendOtp(phoneNumber);

        await db.redisClient.SETEX(email, 60, emailOtp);
        await db.redisClient.SETEX(phoneNumber, 60, smsOtp);

        res.status(200).send({ message: 'OTP sent on phone and email.' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;