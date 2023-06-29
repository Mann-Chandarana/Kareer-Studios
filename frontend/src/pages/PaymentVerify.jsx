import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import client from '../api';
import SmallSpinner from '../components/SmallSpinner';

function PaymentVerify() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentId, setPaymentId] = useState();

  const verifyPayment = async (payment_id, payment_request_id) => {
    setLoading(true);
    try {
      await client.post('/payment/verify', {
        payment_id,
        payment_request_id,
      });

      setPaymentVerified(true);
    } catch (err) {
      console.error(err);
      setPaymentVerified(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const payment_id = searchParams.get('payment_id');
    const payment_request_id = searchParams.get('payment_request_id');
    if (payment_id) {
      setPaymentId(payment_id);
      verifyPayment(payment_id, payment_request_id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <main
      style={{ minHeight: '100vh' }}
      className="d-flex justify-content-center align-items-center"
    >
      <div
        style={{
          maxWidth: '600px',
          width: '100%',
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
          background: 'white',
          borderRadius: 4,
          padding: '2rem',
        }}
        className="d-flex flex-column justify-content-center"
      >
        <div className="KareerLogo text-center">
          <img
            src="/assets/img/logo.png"
            alt="img"
            style={{ maxWidth: '150px', display: 'inline' }}
          />
        </div>
        <h2 className="my-4 text-center" style={{ color: '#2B3467' }}>
          PAYMENT STATUS
        </h2>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {loading ? (
            <SmallSpinner />
          ) : (
            <div className="text-center">
              <p>
                <b>Payment ID:</b>{' '}
                <code className="text-secondary">
                  {paymentId ? paymentId : 'NULL'}
                </code>
              </p>
              {paymentVerified ? (
                <div className="text-success" style={{ fontSize: 24 }}>
                  Verified <i class="fa-solid fa-circle-check"></i>
                </div>
              ) : (
                <div className="text-danger" style={{ fontSize: 24 }}>
                  {paymentId ? 'Already Paid ' : 'Invaild '}
                  <i class="fa-solid fa-circle-xmark"></i>
                </div>
              )}
            </div>
          )}

          <button
            className="btn btn-primary mt-4"
            onClick={() => (window.location.href = '/')}
          >
            GO HOME
          </button>
        </div>
      </div>
    </main>
  );
}

export default PaymentVerify;
