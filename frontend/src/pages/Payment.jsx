import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SmallSpinner from '../components/SmallSpinner';
import client from '../api';
import { toast } from 'react-toastify';

const amount = 5000;
let toastId = null;

export const Payment = ({ user, renewUser, logout }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const verifyPayment = async (payment_id, payment_request_id) => {
        setLoading(true);
        try {
            await client.post('/payment/verify', {
                payment_id,
                payment_request_id,
            });
            await renewUser();
            navigate('/profile');

            toast.update(toastId, {
                render: 'Payment successful!',
                isLoading: false,
                type: 'success',
                autoClose: 2000,
            });
        } catch (err) {
            console.error(err);
            toast.update(toastId, {
                render: 'Payment failed!',
                isLoading: false,
                type: 'error',
                autoClose: 2000,
            });
        }
        setLoading(false);
    };

    useEffect(() => {
        const payment_id = searchParams.get('payment_id');
        const payment_request_id = searchParams.get('payment_request_id');
        if (payment_id) {
            verifyPayment(payment_id, payment_request_id);
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async () => {
        toastId = toast.loading('Redirecting...');

        try {
            setLoading(true);
            const res = await client.post('/payment/create', {
                amount,
                student_id: user.id,
                redirect_url: window.location.origin + '/',
                purpose: 'Registration Fees',
            });

            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
            toast.update(toastId, {
                render: 'Payment failed!',
                isLoading: false,
                type: 'error',
                autoClose: 2000,
            });
            setLoading(false);
        }
    };
    return (
        <main style={{ minHeight: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div
                style={{
                    maxWidth: '600px',
                    width: '100%',
                    boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    background: 'white',
                    borderRadius: 4,
                    padding: '2rem',
                }}
                className='d-flex flex-column justify-content-center'
            >
                <div className='KareerLogo text-center'>
                    <img src='/assets/img/logo.png' alt='img' style={{ maxWidth: '150px', display: 'inline' }} />
                </div>
                <h2 className='my-4 text-center' style={{ color: '#2B3467' }}>
                    PAY REGISTRATION FEES
                </h2>
                <form className='d-flex flex-column justify-content-center align-items-center'>
                    <fieldset style={{ width: '70%' }} disabled>
                        <div className='form-outline mb-3'>
                            <label htmlFor='name'>Name:</label>
                            <input type='text' id='name' value={user.name} className='form-control' required />
                        </div>
                        <div className='form-outline mb-3'>
                            <label htmlFor='email'>Email:</label>
                            <input type='email' id='email' value={user.email} className='form-control' required />
                        </div>

                        <div className='form-outline mb-3'>
                            <label htmlFor='phone'>Phone No:</label>
                            <input type='tel' id='phone' value={user.phone} className='form-control' required />
                        </div>

                        <div className='form-outline mb-4'>
                            <label htmlFor='amount'>Amount:</label>
                            <input type='number' id='amount' value={amount} className='form-control' required />
                        </div>
                    </fieldset>
                    <center>
                        {loading ? (
                            <SmallSpinner />
                        ) : (
                            <>
                                <button rel='noopener noreferrer' type='button' className='App-link btn btn-primary mx-1' onClick={handleSubmit} disabled={loading}>
                                    Make Payment
                                </button>

                                <button rel='noopener noreferrer' type='button' className='App-link btn btn-danger mx-1' onClick={logout} disabled={loading}>
                                    Logout
                                </button>
                            </>
                        )}
                    </center>
                </form>
            </div>
        </main>
    );
};
