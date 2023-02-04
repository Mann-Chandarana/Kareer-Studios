const db = require('../db');
const shortid = require('shortid');
const Razorpay = require('razorpay');
// const bodyParser = require('body-parser')
const express = require('express');
const router = express.Router();

const razorpay = new Razorpay({
	key_id: 'rzp_test_bqKQhG9gQE5YIr',
	key_secret: 'UlTz2u7X4AKDAu0Hp4F5Y7l7'
})


router.post('/verification', (req, res) => {
	// do a validation
	const secret = '12345678'

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
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