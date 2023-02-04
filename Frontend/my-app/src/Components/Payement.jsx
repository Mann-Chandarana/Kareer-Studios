import React, { useState } from 'react'

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


function Payement() {
  const [amount, setamount] = useState('');
  async function displayRazorpay() {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const data = await fetch('http://localhost:8000/api/payement/razorpay',
      {
        method: 'POST',
        body: JSON.stringify({
          amount: amount
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }

    ).then((t) =>
      t.json()
    )

    console.log(data)

    const options = {
      key: 'rzp_test_bqKQhG9gQE5YIr',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Kareer Studios',
      description: 'Thank you for nothing. Please give us some money',
      image: '',
      handler: function (response) {
        alert(response.razorpay_payment_id)
        alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
      },
      prefill: {
        name: '',
        email: '',
        phone_number: '9899999999',
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <>
      <input type='text' value={amount} placeholder='Enter the amount' onChange={(e)=>{setamount(e.target.value)}}  />
      <a
        className="App-link"
        onClick={displayRazorpay}
        rel="noopener noreferrer"
        target="_blank" type="button" class="btn btn-primary my-5 mx-5">Pay Now
      </a>
    </>
  )
};

export default Payement;