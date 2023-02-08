const shortid = require('shortid');
const Razorpay = require('razorpay');
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

    try {
        // do a validation
        const secret = '12345678';

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        if (digest === req.headers['x-razorpay-signature']) {
            // process it
            let { email, amount, order_id } = req.body.payload.payment.entity;
            amount = amount / (100);
            order_id = order_id.split('_')[1];

            const { rows, rowCount } = await studentHandler.getStudentByEmail(email);
            if (rowCount <= 0) {
                return res.status(400).send({ error: 'Account don\'t exists' });
            }

            const { id, name, phone } = rows[0];

            const buffer = await generateReceiptBuffer({ name, email, phone, amount, order_id });

            await studentHandler.setValidStudent(email);
            await receiptHandler.addReceipt(id, buffer);

            const attachments = [
                {
                    filename: 'receipt.pdf',
                    content: buffer
                }
            ];

            await sendEmail(email, 'Payment receipt', 'hello', attachments);
            res.status(202).send({ message: 'Payment done' });
        } else {
            // pass it
            console.log('request is not legit');
            throw new Error('request is not legit');
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