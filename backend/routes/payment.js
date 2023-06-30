const express = require('express');
const Instamojo = require('instamojo-nodejs');

const { generateReceiptBuffer } = require('../utils/receipt');
const receiptHandler = require('../handlers/receipt');
const studentHandler = require('../handlers/student');
const { sendEmail } = require('../services/nodemailer');
const { sendSMS } = require('../services/twilio');

const router = express.Router();

Instamojo.setKeys(process.env.instamojo_key, process.env.instamojo_secret);
Instamojo.isSandboxMode(process.env.ENV === 'development' ? true : false);

// http://localhost:8000/api/payment/create -- Payment create route
router.post('/create', async (req, res) => {
    try {
        const { amount, redirect_url, purpose, student_id, sendWhatsApp } = req.body;

        const { rows, rowCount } = await studentHandler.getStudent(student_id);
        if (rowCount <= 0) {
            return res.status(400).send({ error: "Account don't exists" });
        }

        const student = rows[0];
        // if (user.paid) {
        //   return res.status(400).send({ error: 'Fees already paid!' });
        // }

        const data = new Instamojo.PaymentData();
        data.purpose = purpose;
        data.amount = amount;
        data.email = student.email;
        data.phone = student.phone;
        data.buyer_name = student_id;

        data.allow_repeated_payments = 'False';
        data.setRedirectUrl(redirect_url);
        Instamojo.createPayment(data, async (err, response) => {
            if (err) {
                throw err;
            }
            response = JSON.parse(response);
            if (!response.success) {
                return res.status(500).send({ error: response.message });
            }

            const url = response.payment_request.longurl;
            if (sendWhatsApp) {
                try {
                    await sendSMS(student.phone, 'Please pay: ' + url);
                } catch (err) {
                    return res.status(500).send({ error: err.message });
                }
            }
            res.status(202).json({ url });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// http://localhost:8000/api/payment/verify -- Payment verify route
router.post('/verify', async (req, res) => {
    try {
        let { payment_id, payment_request_id } = req.body;
        Instamojo.getPaymentDetails(payment_request_id, payment_id, async (err, response) => {
            if (err) {
                throw err;
            }
            if (response.success && response.payment_request.status === 'Completed') {
                try {
                    const { buyer_email, buyer_phone, buyer_name, amount, fees } = response.payment_request.payment;
                    const purpose = response.payment_request.purpose;

                    const id = response.payment_request.payment.payment_id;

                    const buffer = await generateReceiptBuffer(id, amount, buyer_name, buyer_email, buyer_phone, purpose);

                    await studentHandler.setValidStudent(buyer_email);

                    const student_id = buyer_name;
                    await receiptHandler.addReceipt(id, student_id, Number(amount), buffer);

                    const attachments = [
                        {
                            filename: 'receipt.pdf',
                            content: buffer,
                        },
                    ];

                    await sendEmail(buyer_email, 'Payment receipt', 'hello', attachments);
                    res.status(202).send({ buyer_email, buyer_name, buyer_phone });
                } catch (err) {
                    res.status(500).send({ error: err.message });
                }
            } else {
                return res.status(400).send({ error: 'request not legit' });
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
