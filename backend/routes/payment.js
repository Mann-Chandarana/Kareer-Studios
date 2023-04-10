const express = require('express');
const Instamojo = require('instamojo-nodejs');


const { generateReceiptBuffer } = require('../utils/receipt');
const receiptHandler = require('../handlers/receipt');
const studentHandler = require('../handlers/student');
const { sendEmail } = require('../services/nodemailer');

const router = express.Router();

Instamojo.setKeys(process.env.instamojo_key, process.env.instamojo_secret);
Instamojo.isSandboxMode(true);

router.post('/verify', async (req, res) => {
    try {
        const { payment_id, payment_request_id, student_id } = req.body;
        Instamojo.getPaymentDetails(payment_request_id, payment_id, async (err, response) => {
            if (err) {
                throw err;
            }
            if (response.success && response.payment_request.status === 'Completed') {
                try {
                    const { buyer_email, buyer_phone, buyer_name, amount, fees } = response.payment_request.payment;
                    const id = response.payment_request.payment.payment_id;

                    const buffer = await generateReceiptBuffer(id, amount, fees, buyer_name, buyer_email, buyer_phone);

                    await studentHandler.setValidStudent(buyer_email);
                    await receiptHandler.addReceipt(id, student_id, Number(amount), buffer);

                    const attachments = [
                        {
                            filename: 'receipt.pdf',
                            content: buffer
                        }
                    ];

                    await sendEmail(buyer_email, 'Payment receipt', 'hello', attachments);
                    res.status(202).send({ status: 'ok' });
                } catch (err) {
                    res.status(500).send({ error: err.message });
                }
            } else {
                return res.status(400).send({ error: "request not legit" });
            }
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/create', async (req, res) => {
    try {
        const { email, phone, name, amount, redirect_url, purpose } = req.body;

        const { rows, rowCount } = await studentHandler.getStudentByEmail(email);
        if (rowCount <= 0) {
            return res.status(400).send({ error: 'Account don\'t exists' });
        }

        if (rows[0].paid) {
            return res.status(400).send({ error: 'Fees already paid!' });
        }

        const data = new Instamojo.PaymentData();
        data.purpose = purpose;
        data.amount = amount;
        data.email = email;
        data.phone = phone;
        data.buyer_name = name;
        data.allow_repeated_payments = 'False';
        data.setRedirectUrl(redirect_url);
        Instamojo.createPayment(data, (err, response) => {
            if (err) {
                throw err;
            }
            response = JSON.parse(response);
            if (!response.success) {
                return res.status(500).send({ error: response.message });
            }
            res.status(202).json({ url: response.payment_request.longurl });
        });

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;