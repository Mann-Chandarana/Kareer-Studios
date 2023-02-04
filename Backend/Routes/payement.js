const db = require('../db');
const shortid = require('shortid');
const Razorpay = require('razorpay');
// const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();
const {setvalidStudent} = require('../handlers/student')

const razorpay = new Razorpay({
	key_id: process.env.razor_key,
	key_secret: process.env.razor_secret
})


router.post('/verification', (req, res) => {
	// do a validation
	console.log("Hello");
	const secret = '12345678'

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		console.log((req.body).payload.payment.entity.email);
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

router.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = req.body.amount;
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

module.exports = router;