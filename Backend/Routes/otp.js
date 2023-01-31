const express = require('express');
const router = express.router();
const db = require('../db');
const studentHandler = require('../handlers/student');

// Route-1 /api/auth/verification/:email --- for signup and OTP verification

router.post('/verification', async (req, res) => {
    const { name, email, phone, mobileOTP, emailOTP } = req.body;

    const OTP_1 = redish_mobile(email);
    const OTP_2 = redish_email(email);

    if (OTP_1 != mobileOTP || OTP_2 != emailOTP) {
        res.status(400).send({ error: 'Invalid link!' });
    }
    else {
        try {
            const { rowCount } = await studentHandler.getStudentByEmail(email);

            if (rowCount > 0) {
                return res.status(409).json({ error: 'User already exists' });
            }
            
            /// Creating new student entry into the database

            password = "";
            // We will generate the password randomly
            await studentHandler.addStudent(name, email, phone, password);
            // Adding user to the database

        } catch (err) {
            console.log(err.message);
            res.status(500).send({ error: err.message });
        }
    }
})