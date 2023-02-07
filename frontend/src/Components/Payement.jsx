import React, { useState } from 'react';
import useRazorpay from 'react-razorpay';

function Payement() {
    const Razorpay = useRazorpay();
    const [amount, setAmount] = useState('');
    const [email, setEmail] = useState('');

    const handlePayment = async () => {
        const data = JSON.stringify({ amount, email });

        const order = await fetch('http://localhost:8000/api/payment/razorpay', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((t) => t.json());

        if (order.error) {
            return console.error(order.error);
        }

        console.log(order);

        const options = {
            key: 'rzp_test_bqKQhG9gQE5YIr',
            currency: order.currency,
            amount: order.amount.toString(),
            order_id: order.id,
            name: 'Kareer Studios',
            description: 'Thank you for nothing. Please give us some money',
            image: '',
            handler: function (response) {
                alert(response.razorpay_payment_id);
                alert(response.razorpay_order_id);
                alert(response.razorpay_signature);
            },
            prefill: {
                email,
            },
            readonly: {
                email: true,
            },
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
    };

    return (
        <>
            <h1>Enter your registered email</h1>
            <input
                type="text"
                value={amount}
                placeholder="Enter the amount"
                onChange={(e) => {
                    setAmount(e.target.value);
                }}
            />
            <input
                type="text"
                value={email}
                placeholder="Enter the email"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <button
                onClick={handlePayment}
                rel="noopener noreferrer"
                target="_blank"
                type="button"
                className="App-link btn btn-primary my-5 mx-5"
            >
                Pay Now
            </button>
        </>
    );
}

export default Payement;
