const shortid = require('shortid');
const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const express = require('express');
const crypto = require('crypto');


const router = express.Router();
const { generateReceiptBuffer } = require('../utils/receipt');
const receiptHandler = require('../handlers/receipt');
const studentHandler = require('../handlers/student');
const { sendEmail } = require('../services/nodemailer');

const razorpay = new Razorpay({
    key_id: process.env.razor_key,
    key_secret: process.env.razor_secret
});


router.post('/verification', async (req, res) => {
    const secret = process.env.razor_secret;
    const { order_id, payment_id, signautre } = req.body;

    try {
        const isValid = validatePaymentVerification({ order_id, payment_id }, signautre, secret);
        if (isValid) {
            // process it
            const orderData = await razorpay.orders.fetchPayments(order_id);
            let { amount, email, fee, tax } = orderData.items[0];
            amount = (amount / 100);

            const { rows, rowCount } = await studentHandler.getStudentByEmail(email);
            if (rowCount <= 0) {
                return res.status(400).send({ error: "Account dosen't exists" });
            }

            const { id: student_id, name, phone, paid } = rows[0];

            const buffer = await generateReceiptBuffer({ name, email, phone, amount, order_id, fee, tax });

            await studentHandler.setValidStudent(email);
            await receiptHandler.addReceipt(order_id, student_id, buffer);

            const attachments = [
                {
                    filename: 'receipt.pdf',
                    content: buffer
                }
            ];

            await sendEmail(email, 'Payment receipt', 'hello', attachments);
            res.status(202).send({ status: 'ok' });
        } else {
            // fail it
            return res.status(400).send({ error: "request not legit" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

router.post('/razorpay', async (req, res) => {
    try {
        const { email, amount } = req.body;
        const payment_capture = 1;
        const currency = 'INR';

        const { rows, rowCount } = await studentHandler.getStudentByEmail(email);
        if (rowCount <= 0) {
            return res.status(400).send({ error: 'Account don\'t exists' });
        }

        if (rows[0].paid) {
            return res.status(400).send({ error: 'Fees already paid!' });
        }

        const options = {
            amount: amount * 100,
            currency,
            receipt: shortid.generate(),
            payment_capture
        };
        const response = await razorpay.orders.create(options);
        // console.log(response);
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;