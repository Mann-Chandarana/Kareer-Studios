const shortid = require('shortid');
const Razorpay = require('razorpay');
const express = require('express');


const router = express.Router();
const { setValidStudent } = require('../handlers/student');
const { generateReceiptBuffer } = require('../utils/receipt');
const receiptHandler = require('../handlers/receipt');
const studentHandler = require('../handlers/student');
const { sendEmail } = require('../services/nodemailer');

const razorpay = new Razorpay({
    key_id: 'rzp_test_bqKQhG9gQE5YIr',
    key_secret: 'UlTz2u7X4AKDAu0Hp4F5Y7l7'
});


router.post('/verification', async (req, res) => {

    try {
        // do a validation
        const secret = '12345678';

        const crypto = require('crypto');

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        console.log(digest, req.headers['x-razorpay-signature']);

        if (digest === req.headers['x-razorpay-signature']) {
            console.log('request is legit');
            // process it

            const email = req.body.payload.payment.entity.email;
            const amount = 1000;

            const { rows, rowCount } = await studentHandler.getStudentByEmail(email);
            if (rowCount <= 0) {
                return res.status(400).send({ error: 'Account don\'t exists' });
            }

            const { id, name, phone } = rows[0];

            const buffer = await generateReceiptBuffer({ name, email, phone, amount });

            await setValidStudent(email);
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
    const payment_capture = 1;
    const amount = req.body.amount;
    const currency = 'INR';

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    };

    try {
        const response = await razorpay.orders.create(options);
        console.log(response);
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