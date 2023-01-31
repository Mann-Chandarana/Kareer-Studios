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


// Route-1 /api/auth/verification/:email --- for signup and OTP verification
router.post('/verify', async (req, res) => {
    const { name, email, phone, mobileOtp, emailOtp } = req.body;

    try {
        const _emailOtp = await db.redisClient.GET(emailOtp);
        const _mobileOtp = await db.redisClient.GET(mobileOtp);

        if (emailOtp != _emailOtp || mobileOtp != _mobileOtp) {
            return res.status(400).send({ error: 'Invaild OTP' });
        }

        const { rowCount } = await studentHandler.getStudentByEmail(email);
        if (rowCount > 0) {
            return res.status(409).send({ error: 'User already exists' });
        }

        //generate password
        const password = email.split('@')[0] + '@123';

        await studentHandler.addStudent(name, email, phone, password);

        // send email and password to email
        emailService.sendEmail(email, 'Email and Passwords', JSON.stringify({ email, password }));
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;